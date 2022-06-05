import { defineConfig }	from 'vite'
import WindiCSS        	from 'vite-plugin-windicss'
import { sharedConfig }	from './vite.config'
import { isDev, r }    	from './scripts/utils'
import windiConfig     	from './windi.config'
import packageJson     	from './package.json'

export default defineConfig({ // bundling the content script using Vite
  ...sharedConfig,
  build         	: {
    // watch    	: isDev ? {} : undefined, // crashes on Windows
    outDir      	: r('extension/dist/contentScripts'),
    cssCodeSplit	: false,
    emptyOutDir 	: false,
    sourcemap   	: isDev ? 'inline' : false,
    lib         	: {
      entry     	: r('src/contentScripts/index.ts'),
      name      	: packageJson.name,
      formats   	: ['iife'],
    },
    rollupOptions     	: {
      output          	: {
        entryFileNames	: 'index.global.js',
        extend        	: true,
      },
    },
    target               	: 'esnext',
    polyfillDynamicImport	: false,
  },
  plugins	: [
    ...sharedConfig.plugins!,
    WindiCSS({config:{ // github.com/antfu/vite-plugin-windicss
        ...windiConfig,
        preflight	: false, // disable preflight to avoid css population
      },}),
  ],
})
