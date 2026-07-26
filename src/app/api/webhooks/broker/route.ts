import { NextRequest, NextResponse } from 'next/server'

/**
 * Placeholder webhook endpoint for future DB Investing / broker integrations.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // TODO: Validate broker API key / HMAC signature
    // TODO: Route events to copy-trading engine
    // TODO: Sync strategy provider performance metrics

    console.log('[Broker Webhook] Received event:', body?.type ?? 'unknown')

    return NextResponse.json({
      status: 'received',
      message: 'Broker webhook placeholder — integration pending',
      timestamp: new Date().toISOString(),
    })
  } catch {
    return NextResponse.json(
      { error: 'Invalid payload' },
      { status: 400 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    endpoint: '/api/webhooks/broker',
    status: 'ready',
    description: 'Placeholder for DB Investing broker webhook integration',
  })
}
