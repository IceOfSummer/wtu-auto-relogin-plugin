window.addEventListener('load', () => {
  preCheck()
  startObserver()
})

function preCheck() {
  const LOGIN_URL_REGX = /jwglxt.wtu.edu.cn\/xtgl\/login_slogin.html/
  // 关闭内置的重新登录页面
  const url = window.location.href
  if (LOGIN_URL_REGX.exec(url)) {
    window.close()
  }
}

function startObserver () {
  const RE_LOGIN_URL = 'http://ehall.wtu.edu.cn/appShow?appId=5271578965812781'
  const MASK_ID = 'statusModal'

  const observer = new MutationObserver(() => {
    const mask = document.getElementById(MASK_ID)
    console.log(mask)
    if (mask) {
      // 删除蒙层
      mask.remove()
      window.open(RE_LOGIN_URL)
    }
  })

  observer.observe(document.body, {
    childList: true
  })
}
