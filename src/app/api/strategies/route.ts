import { NextResponse } from 'next/server'
import { generateLiveSnapshot, getBaseStrategies } from '@/lib/mock-engine'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const live = searchParams.get('live') === 'true'

  const strategies = live
    ? generateLiveSnapshot().strategies
    : getBaseStrategies()

  return NextResponse.json({
    strategies,
    count: strategies.length,
    updated_at: new Date().toISOString(),
  })
}
