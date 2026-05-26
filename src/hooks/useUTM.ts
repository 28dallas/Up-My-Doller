// ============================================================
// useUTM
// Captures UTM params from URL on mount, persists in
// sessionStorage, and exposes a getter for the entire session.
// ============================================================

'use client'

import { useEffect, useCallback } from 'react'
import {
  captureUTMParams,
  getUTMParams,
  type UTMParams,
} from '@/lib/utm'

interface UseUTMReturn {
  getUTMParams: () => UTMParams
}

export function useUTM(): UseUTMReturn {
  useEffect(() => {
    // Capture on every mount — captureUTMParams only writes
    // when UTM params are present in the URL, so safe to call repeatedly
    captureUTMParams()
  }, [])

  const get = useCallback((): UTMParams => {
    return getUTMParams()
  }, [])

  return { getUTMParams: get }
}
