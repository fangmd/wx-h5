export const Demo = () => {
  const share = () => {
    window.wx.ready(function () {
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
