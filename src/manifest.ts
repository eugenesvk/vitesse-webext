import fs                	from 'fs-extra'
import type { Manifest } 	from 'webextension-polyfill'
import type PkgType      	from '../package.json'
import { isDev, port, r }	from '../scripts/utils'

export async function getManifest() {
  const pkg = await fs.readJSON(r('package.json')) as typeof PkgType

  const manifest: Manifest.WebExtensionManifest = { // update this file to update manifest.json, can be conditional
    manifest_version        	: 3,
    name                    	: pkg.displayName || pkg.name,
    version                 	: pkg.version,
    description             	: pkg.description,
    action                  	: {
      default_icon          	: './assets/icon-512.png',
      default_popup         	: './dist/popup/index.html',
    }                       	,
    options_ui              	: {
      page                  	: './dist/options/index.html',
      open_in_tab           	: true,
    }                       	,
    background              	: {
      service_worker        	: './dist/background/index.mjs',
    }                       	,
    icons                   	: {
       16                   	: './assets/icon-512.png',
       48                   	: './assets/icon-512.png',
      128                   	: './assets/icon-512.png',
    }                       	,
    permissions             	: ['tabs','storage','activeTab',],
    host_permissions        	: ['*://*/*'],
    content_scripts         	: [{
      matches               	: ['http://*/*', 'https://*/*'],
      js                    	: ['./dist/contentScripts/index.global.js'],
    },]                     	,
    web_accessible_resources	: [{
      resources             	: ['dist/contentScripts/style.css'],
      matches               	: ['<all_urls>'],
    },]                     	,
    content_security_policy 	: {
      extension_pages       	: isDev // ↓ is required on dev for Vite script to load
        ? `script-src 'self' http://localhost:${port}; object-src 'self' http://localhost:${port}`
        : 'script-src \'self\'; object-src \'self\'',
    },
  }

  if (isDev) { // for content script, as browsers will cache them for each reload, we use a background script to always inject the latest version, see src/background/contentScriptHMR.ts
    delete manifest.content_scripts
    manifest.permissions?.push('scripting', 'webNavigation')
  }

  return manifest
}
