declare interface Window {
  handleText?: (text: string) => void
  appOnResume?: () => void
  hqapp: any
  _AMapSecurityConfig: any
  wx: any
}

declare module '*.scss' {
  const content: { [className: string]: string }
  export default content
}
