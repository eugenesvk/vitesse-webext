/// <reference types="vitest" />
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
  }                      	,
  define                 	: {
    __DEV__              	: isDev,
  },
  plugins	: [
    solidPlugin(),
    Icon({compiler:'solid',}), // github.com/antfu/unplugin-icons
    AutoImport({
      imports: [
        'solid-js', // preset
        {'webextension-polyfill': [['*','browser'],],},
      ],
      dts: r('src/auto-imports.d.ts'),
      resolvers: [IconRes({componentPrefix:'Icon',}),],
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
  base    	: command === 'serve' ? `http	://localhost	:${port}/`	: '/dist/',
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
      },
    },
    // target               	: 'esnext', // from vite-solid-ts-windicss
    // polyfillDynamicImport	: false, // from vite-solid-ts-windicss
  },
  plugins	: [
    ...sharedConfig.plugins!,
    WindiCSS({config:windiConfig,}), // github.com/antfu/vite-plugin-windicss
    MV3Hmr(),
  ],
  test         	: {
    globals    	: true,
    environment	: 'jsdom',
  },
}))
