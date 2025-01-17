/// <reference types="vitest" />
/// <reference types="vite/client" />
import { dirname, relative }	from 'path'
import type { UserConfig }  	from 'vite'
import { defineConfig }     	from 'vite'
import Icon                 	from 'unplugin-icons/vite'
import IconRes              	from 'unplugin-icons/resolver'
import AutoImport           	from 'unplugin-auto-import/vite'
import WindiCSS             	from 'vite-plugin-windicss'
import windiConfig          	from './windi.config'
import solidPlugin          	from 'vite-plugin-solid'
import { isDev, port, r }   	from './scripts/utils'
import { MV3Hmr }           	from './vite-mv3-hmr'

export const sharedConfig	: UserConfig = {
  root                   	: r('src'),
  resolve                	: {
    alias                	: {
      '~/'               	: `${r('src')}/`,
    }                    	,
    conditions           	: ['development', 'browser'],
  }                      	,
  define                 	: {
    __DEV__              	: isDev,
  },
  plugins	: [
    solidPlugin(),
    Icon({compiler:'solid',}), // github.com/antfu/unplugin-icons
    AutoImport({
      imports                    	: [                	  // global imports to register
        'solid-js'               	                   	, // preset
        {                        	                   	  // custom imports
          'webextension-polyfill'	: [['*','browser']]	,	// default: import {* as browser} from 'w-p'
      }],
      dts        	: r('src/auto-imports.d.ts')	, // path to generate corresponding .d.ts file
      resolvers  	: [IconRes({
        prefix   	: 'Icon'          	,
        extension	: 'jsx'        })]	, // custom resolvers compatible with unplugin-vue-components
    }),
    { name   	: 'assets-rewrite', // rewrite assets to use relative path
      enforce	: 'post',
      apply  	: 'build',
      transformIndexHtml(html, { path }) {
        return html.replace(/"\/assets\//g, `"${relative(dirname(path), '/assets')}/`)
      },
    },
  ],
  optimizeDeps	: {
    include   	: [
      'webextension-polyfill',
    ],
    exclude	: [],
  },
}

export default defineConfig(({ command }) => ({
  ...sharedConfig,
  base    	: command === 'serve' ? `http://localhost:${port}/` : '/dist/',
  server  	: {
    port  	,
    hmr   	: {
      host	: 'localhost',
    }     	,
  },
  build          	: {
    outDir       	: r('extension/dist'),
    emptyOutDir  	: false,
    sourcemap    	: isDev ? 'inline' : false,
    rollupOptions	: { // developer.chrome.com/docs/webstore/program_policies/#:~:text=Code%20Readability%20Requirements
      input      	: {
        options  	: r('src/options/index.html'),
        popup    	: r('src/popup/index.html'),
      }          	,
    }            	,
    target       	: 'esnext'
  },
  plugins	: [
    ...sharedConfig.plugins!,
    WindiCSS({config:windiConfig,}), // github.com/antfu/vite-plugin-windicss
    MV3Hmr(),
  ],
  test           	: {
    globals      	: true,
    environment  	: 'jsdom',
    transformMode	: {
      web        	: [/.[jt]sx?/],
    }            	,
    deps         	: {
      inline     	: [/solid-js/,/solid-testing-library/], // fix vitest resolution issue
    }            	,
    threads      	: false, // try commenting one or both out to improve performance
    isolate      	: false,
  },
}))
