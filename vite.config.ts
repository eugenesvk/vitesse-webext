/// <reference types="vitest" />
import { dirname, relative }	from 'path'
import type { UserConfig }  	from 'vite'
import { defineConfig }     	from 'vite'
import Vue                  	from '@vitejs/plugin-vue'
import Icons                	from 'unplugin-icons/vite'
import IconsResolver        	from 'unplugin-icons/resolver'
import Components           	from 'unplugin-vue-components/vite'
import AutoImport           	from 'unplugin-auto-import/vite'
import WindiCSS             	from 'vite-plugin-windicss'
import windiConfig          	from './windi.config'
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
    Vue(),
    AutoImport({
      imports: [
        'vue',
        {'webextension-polyfill': [['*','browser'],],},
      ],
      dts: r('src/auto-imports.d.ts'),
    }),
    Components({ //github.com/antfu/unplugin-vue-components
      dirs     	: [r('src/components')],
      dts      	: r('src/components.d.ts'), // generate `components.d.ts` for ts support with Volar
      resolvers	: [
        IconsResolver({componentPrefix:'',}),// auto import icons
      ],
    }),
    Icons(), // github.com/antfu/unplugin-icons
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
      'vue',
      '@vueuse/core',
      'webextension-polyfill',
    ],
    exclude	: ['vue-demi',],
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
