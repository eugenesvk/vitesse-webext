import { resolve } from 'path'
import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  darkMode: 'class',
  attributify: true, // windicss.org/posts/v30.html#attributify-mode
  extract: {
    include: [
      resolve(__dirname, 'src/**/*.{tsx,html}'),
    ],
  },
})
