import { defineConfig }	from 'tsup'
import { isDev }       	from './scripts/utils'
import { pnpPlugin }   	from '@yarnpkg/esbuild-plugin-pnp';

export default defineConfig(() => ({
  entry               	: {
    'background/index'	: './src/background/index.ts',
    ...(isDev         	? {mv3client:'./scripts/client.ts'} : {}),
  }                   	,
  outDir              	: 'extension/dist',
  format              	: ['esm'], // cjs|esm|iife
  target              	: 'esnext',
  ignoreWatch         	: ['**/extension/**'],
  splitting           	: false,
  sourcemap           	: isDev ? 'inline' : false,
  define              	: {
    __DEV__           	: JSON.stringify(isDev),
  }                   	,
  esbuildPlugins      	: [pnpPlugin()],
  minifyWhitespace    	: !isDev,
  minifySyntax        	: !isDev,
}))
