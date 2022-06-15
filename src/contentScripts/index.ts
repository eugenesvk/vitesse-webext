/* eslint-disable no-console */
import { onMessage }	from 'webext-bridge'
import App          	from './views/App'

(() => { // Firefox `browser.tabs.executeScript()` requires scripts return a primitive value
  console.info('[vitesse-webext] Hello world from content script')

  onMessage('tab-prev', ({ data }) => { // comm example: send previous tab title from background page
    console.log(`[vitesse-webext] Navigate from page "${data.title}"`)
  })

  // mount component to context window
  const container	= document.createElement('div')
  const root     	= document.createElement('div')
  const styleEl  	= document.createElement('link')
  const shadowDOM	= container.attachShadow?.({ mode: __DEV__ ? 'open' : 'closed' }) || container
  styleEl.setAttribute('rel', 'stylesheet')
  styleEl.setAttribute('href', browser.runtime.getURL('dist/contentScripts/style.css'))
  shadowDOM.appendChild(styleEl)
  shadowDOM.appendChild(root)
  document.body.appendChild(container)
  render(App, root);
})()
