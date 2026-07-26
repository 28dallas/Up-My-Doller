import { NextResponse } from 'next/server'
import { generateLiveSnapshot } from '@/lib/mock-engine'

export const dynamic = 'force-dynamic'

export async function GET() {
  const snapshot = generateLiveSnapshot()
  return NextResponse.json(snapshot, {
    headers: {
      'Cache-Control': 'no-store, max-age=0',
    },
  })
}
