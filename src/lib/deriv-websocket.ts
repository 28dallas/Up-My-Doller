import { DERIV_APP_ID } from '@/lib/constants'

/** Minimal browser-only Deriv API client. Never send an account token to this app's server. */
export class DerivWebSocket {
  private socket: WebSocket | null = null
  private sequence = 0
  private pending = new Map<number, { resolve: (value: any) => void; reject: (error: Error) => void }>()

  connect() {
    if (!DERIV_APP_ID) throw new Error('Set NEXT_PUBLIC_DERIV_APP_ID before connecting to Deriv.')
    this.socket = new WebSocket(`wss://ws.derivws.com/websockets/v3?app_id=${encodeURIComponent(DERIV_APP_ID)}`)
    this.socket.onmessage = ({ data }) => {
      const response = JSON.parse(data)
      const request = this.pending.get(response.req_id)
      if (!request) return
      this.pending.delete(response.req_id)
      response.error ? request.reject(new Error(response.error.message)) : request.resolve(response)
    }
    this.socket.onclose = () => this.pending.forEach(({ reject }) => reject(new Error('Deriv connection closed.')))
    return new Promise<void>((resolve, reject) => { this.socket!.onopen = () => resolve(); this.socket!.onerror = () => reject(new Error('Unable to connect to Deriv.')) })
  }

  request<T = unknown>(payload: Record<string, unknown>): Promise<T> {
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) return Promise.reject(new Error('Deriv connection is not open.'))
    const req_id = ++this.sequence
    this.socket.send(JSON.stringify({ ...payload, req_id }))
    return new Promise((resolve, reject) => this.pending.set(req_id, { resolve: resolve as (value: any) => void, reject }))
  }
  authorize(token: string) { return this.request({ authorize: token }) }
  balance() { return this.request({ balance: 1, subscribe: 1 }) }
  disconnect() { this.socket?.close(); this.socket = null }
}
