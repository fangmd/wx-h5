import { getWxConfig } from '@/api/wx'
import { useEffect } from 'react'

export const Demo = () => {
  useEffect(() => {
    getWxConfig().then((res) => {
      window.wx.config({
        debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: res.data.appId, // 必填，公众号的唯一标识
        timestamp: res.data.timestamp, // 必填，生成签名的时间戳
        nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
        signature: res.data.signature, // 必填，签名
        jsApiList: ['updateAppMessageShareData'], // 必填，需要使用的JS接口列表
      })
    })

    return () => {}
  }, [])

  const share = () => {
    window.wx.ready(function () {
      console.log('window.wx.ready')
      //需在用户可能点击分享按钮前就先调用
      window.wx.updateAppMessageShareData({
        title: '分享标题1', // 分享标题
        desc: '分享描述2', // 分享描述
        link: 'https://wx.fangmingdong.com', // 分享链接，该链接域名或路径必须与当前页面对应的服务号JS安全域名一致
        imgUrl: '', // 分享图标
        success: function () {
          // 设置成功
        },
      })
    })
  }

  return (
    <div>
      <h2 className="text-2xl font-bold">Demo Page</h2>
      <div className="w-375 bg-red-500 text-lg">w 50%</div>

      <div className="size-80 bg-green-500 text-center leading-80" onClick={share}>
        分享
      </div>
    </div>
  )
}
