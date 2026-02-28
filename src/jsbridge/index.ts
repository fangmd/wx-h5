export class HQBridge {
  static closeApp() {
    HQBridge.logI({ tag: 'HQBridge', message: 'closeApp' })
    ;(window.hqapp as any)?.closeApp?.()
  }
  static handleResponse(data: { sessionId?: string; content: string; ttsid: string }) {
    HQBridge.logI({ tag: 'HQBridge', message: `handleResponse ${JSON.stringify(data)}` })
    ;(window.hqapp as any)?.handleResponse?.(JSON.stringify(data))
  }

  static logI(data: { tag: string; message: string }) {
    console.log('HQBridge', JSON.stringify(data))
    ;(window.hqapp as any)?.logI?.('HQBridge', JSON.stringify(data))
  }
}
