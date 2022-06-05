import { resolve } from 'path'
// import { bgCyan, black } from 'kolorist' // breaks with "moduleResolution": "nodenext", PR https://github.com/marvinhagemeister/kolorist/pull/14

export const port = parseInt(process.env.PORT || '') || 3303
export const r = (...args: string[]) => resolve(__dirname, '..', ...args)
export const isDev = process.env.NODE_ENV !== 'production'

export function log(name: string, message: string) {
  // eslint-disable-next-line no-console
  // console.log(black(bgCyan(` ${name} `)), message)
  console.log(` ${name} `, message)
}
