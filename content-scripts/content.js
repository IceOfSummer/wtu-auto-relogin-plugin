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
    if (mask) {
      // 删除蒙层
      mask.remove()
      createToast('登录已过期，是否需要重新登录?', () => {
        window.open(RE_LOGIN_URL)
        createToast('正在重新登录，请等待新打开的窗口加载完毕！')
      }, () => {
        window.close()
      })
    }
  })

  observer.observe(document.body, {
    childList: true
  })
}


/**
 * 创建对话框
 * @param msg {string} 对话框信息
 * @param confirmCallback {function} 确认后的回调
 * @param cancelCallback {function} 取消后的回调
 */
function createToast(msg, confirmCallback = undefined, cancelCallback = undefined) {
  const TOAST_ID = "wtu-relogin-plugin-toast"
  const CONFIRM_BUTTON_ID = "wtu-relogin-plugin-btn-confirm"
  const CANCEL_BUTTON_ID = "wtu-relogin-plugin-btn-cancel"

  const TOAST_HTML = `
  <div class="wtu-relogin-plugin-toast" id="${TOAST_ID}">
    <div class="wtu-relogin-plugin-toast-block">
      <div class="wtu-relogin-plugin-toast-title">
        <span>提示</span>
      </div>
      <div class="wtu-relogin-plugin-toast-content">
        <span>${msg}</span>
      </div>
      <div class="wtu-relogin-plugin-toast-btn-area">
        <button class="wtu-relogin-plugin-btn-confirm" id="${CONFIRM_BUTTON_ID}">确定</button>
        <button class="wtu-relogin-plugin-btn" id="${CANCEL_BUTTON_ID}">取消</button>
      </div>
    </div>
  </div>
  `
  $(document.body).append(TOAST_HTML)

  document.getElementById(CONFIRM_BUTTON_ID).onclick = () => {
    closeToast()
    executeIfExist(confirmCallback)
  }
  document.getElementById(CANCEL_BUTTON_ID).onclick = () => {
    closeToast()
    executeIfExist(cancelCallback)
  }

  const closeToast = () => {
    document.getElementById(TOAST_ID).remove()
  }
}

/**
 * 如果存在则执行该函数
 * @param callback {Function}
 */
function executeIfExist(callback = undefined) {
  callback ? callback() : ''
}
