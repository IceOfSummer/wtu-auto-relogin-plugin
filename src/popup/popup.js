window.onload = () => {
  const btn = document.getElementById("btn")
  btn.onclick = () => {
    console.log('click')
    chrome.tabs.create({
      url: 'https://github.com/HuPeng333/wtu-auto-relogin-plugin'
    })
  }
}
