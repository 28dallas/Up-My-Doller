import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { Body } = body

    if (!Body?.stkCallback) {
      return NextResponse.json({ ResultCode: 1, ResultDesc: 'Invalid callback' })
    }

    const { ResultCode, ResultDesc, CallbackMetadata, CheckoutRequestID } = Body.stkCallback

    if (ResultCode !== 0) {
      // Payment failed or cancelled
      await supabase
        .from('payments')
        .update({ status: 'failed' })
        .eq('mpesa_checkout_id', CheckoutRequestID)

      return NextResponse.json({ ResultCode: 0, ResultDesc: 'Accepted' })
    }

    // Extract metadata
    const items = CallbackMetadata?.Item || []
    const getMeta = (name: string) => items.find((i: any) => i.Name === name)?.Value

    const mpesaRef = getMeta('MpesaReceiptNumber')
    const amount = getMeta('Amount')
    const phone = getMeta('PhoneNumber')

    // Update payment record
    await supabase
      .from('payments')
      .update({
        status: 'completed',
        mpesa_ref: mpesaRef,
      })
      .eq('mpesa_checkout_id', CheckoutRequestID)

    // Activate subscription (find payment to get user_id and plan)
    const { data: payment } = await supabase
      .from('payments')
      .select('user_id, plan')
      .eq('mpesa_checkout_id', CheckoutRequestID)
      .single()

    if (payment) {
      const now = new Date()
      const endsAt = new Date(now)
      endsAt.setMonth(endsAt.getMonth() + 1)

      await supabase.from('subscriptions').upsert({
        user_id: payment.user_id,
        plan: payment.plan,
        status: 'active',
        starts_at: now.toISOString(),
        ends_at: endsAt.toISOString(),
      })

      await supabase
        .from('profiles')
        .update({ plan: payment.plan })
        .eq('id', payment.user_id)
    }

    return NextResponse.json({ ResultCode: 0, ResultDesc: 'Accepted' })
  } catch (error) {
    console.error('M-Pesa callback error:', error)
    return NextResponse.json({ ResultCode: 0, ResultDesc: 'Accepted' })
  }
}
