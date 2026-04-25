import { NextRequest, NextResponse } from 'next/server'

async function getMpesaToken(): Promise<string> {
  const consumerKey = process.env.MPESA_CONSUMER_KEY!
  const consumerSecret = process.env.MPESA_CONSUMER_SECRET!
  const credentials = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64')

  const res = await fetch(
    'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
    { headers: { Authorization: `Basic ${credentials}` } }
  )
  const data = await res.json()
  return data.access_token
}

export async function POST(req: NextRequest) {
  try {
    const { phone, amount, userId, plan } = await req.json()

    if (!phone || !amount || !userId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const token = await getMpesaToken()
    const shortcode = process.env.MPESA_SHORTCODE!
    const passkey = process.env.MPESA_PASSKEY!
    const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, 14)
    const password = Buffer.from(`${shortcode}${passkey}${timestamp}`).toString('base64')

    // Format phone: 0712345678 → 254712345678
    const formattedPhone = phone.startsWith('0')
      ? `254${phone.slice(1)}`
      : phone.startsWith('+')
      ? phone.slice(1)
      : phone

    const stkRes = await fetch(
      'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          BusinessShortCode: shortcode,
          Password: password,
          Timestamp: timestamp,
          TransactionType: 'CustomerPayBillOnline',
          Amount: amount,
          PartyA: formattedPhone,
          PartyB: shortcode,
          PhoneNumber: formattedPhone,
          CallBackURL: process.env.MPESA_CALLBACK_URL,
          AccountReference: `PDP-${userId.slice(0, 8).toUpperCase()}`,
          TransactionDesc: `Pips Dollar Printer ${plan} Plan`,
        }),
      }
    )

    const stkData = await stkRes.json()

    if (stkData.ResponseCode === '0') {
      return NextResponse.json({
        success: true,
        checkoutRequestId: stkData.CheckoutRequestID,
        message: 'STK push sent. Check your phone.',
      })
    }

    return NextResponse.json({ error: stkData.errorMessage || 'STK push failed' }, { status: 400 })
  } catch (error) {
    console.error('M-Pesa STK error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
