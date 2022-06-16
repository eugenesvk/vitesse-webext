import browser from 'webextension-polyfill'
import { isFirefox, isForbiddenUrl } from '../env'

// Firefox fetch files from cache instead of reloading changes from disk, hmr will not work as Chromium based browser
browser.webNavigation.onCommitted.addListener(({ tabId, frameId, url }) => {
  if (frameId !== 0)      	{ return } // Filter out non main window events
  if (isForbiddenUrl(url))	{ return }

  browser.scripting
    .executeScript({ // inject the latest scripts
      target	: { tabId },
      files 	: [`${isFirefox ? '' : '.'}/dist/contentScripts/index.global.js`],
    })
    .catch(error => console.error(error))
})
