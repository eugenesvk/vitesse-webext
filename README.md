# WebExtension Vite Starter

A [Vite](https://vitejs.dev/) powered WebExtension ([Chrome](https://developer.chrome.com/docs/extensions/reference/), [FireFox](https://addons.mozilla.org/en-US/developers/), etc.) starter template.

<p align="center">
<sub>Popup</sub><br/>
<img width="655" src="https://user-images.githubusercontent.com/11247099/126741643-813b3773-17ff-4281-9737-f319e00feddc.png"><br/>
<sub>Options Page</sub><br/>
<img width="655" src="https://user-images.githubusercontent.com/11247099/126741653-43125b62-6578-4452-83a7-bee19be2eaa2.png"><br/>
<sub>Inject App into the Content Script</sub><br/>
<img src="https://user-images.githubusercontent.com/11247099/130695439-52418cf0-e186-4085-8e19-23fe808a274e.png">
</p>

## Features

- ⚡️ **Instant HMR** - use **Vite** on dev (no more refresh!)
- 💧 [SolidJS](https://www.solidjs.com) - simple and performant reactivity for building user interfaces
- 💬 Effortless communications - powered by [`webext-bridge`](https://github.com/antfu/webext-bridge) and [Solid Primitives](https://github.com/solidjs-community/solid-primitives) storage
- 🍃 [Windi CSS](https://windicss.org/) - on-demand CSS utilities
- 🦾 [TypeScript](https://www.typescriptlang.org/) - type safe
- 📦 [Components auto importing](./src/components)
- 🌟 [Icons](./src/components) - Access to icons from any iconset directly
- 🖥 Content Script - Use Solid even in content script
- 🌍 WebExtension - isomorphic extension for Chrome, Firefox, and others
- 📃 Dynamic `manifest.json` (Manifest V3) with full type support

## Pre-packed

### WebExtension Libraries

- [`webextension-polyfill`](https://github.com/mozilla/webextension-polyfill) - WebExtension browser API Polyfill with types
- [`webext-bridge`](https://github.com/antfu/webext-bridge) - effortlessly communication between contexts

### Vite Plugins

- [`unplugin-auto-import`](https://github.com/antfu/unplugin-auto-import) - Directly use `browser` and Solid Composition API without importing
- [`unplugin-icons`](https://github.com/antfu/unplugin-icons) - icons as components
  - [Iconify](https://iconify.design) - use icons from any icon sets [🔍Icônes](https://icones.netlify.app/)
- [`vite-plugin-windicss`](https://github.com/antfu/vite-plugin-windicss) - WindiCSS support

### Solid Plugins

- [Solid Primitives](https://github.com/solidjs-community/solid-primitives) — collection of useful composition APIs

### UI Frameworks

- [Windi CSS](https://github.com/windicss/windicss) - next generation utility-first CSS framework

### Coding Style

- [ESLint](https://eslint.org/) with [@antfu/eslint-config](https://github.com/antfu/eslint-config), single quotes, no semi

### Dev tools

- [TypeScript](https://www.typescriptlang.org/)
- [yarn with Plug'n'Play](https://yarnpkg.com/features/pnp) - fast, disk space efficient package manager that culls the gargantuan amounts of node_modules files
- [esno](https://github.com/antfu/esno) - TypeScript / ESNext node runtime powered by esbuild (disabled due to the limitation of the Node loader API not working with yarn PnP)
- [npm-run-all](https://github.com/mysticatea/npm-run-all) - Run multiple npm-scripts in parallel or sequential
- [web-ext](https://github.com/mozilla/web-ext) - Streamlined experience for developing web extensions

## Use the Template

### GitHub Template

[Create a repo from this template on GitHub](https://github.com/antfu/vitesse-webext/generate).

### Clone to local

If you prefer to do it manually with the cleaner git history

```bash
npx degit antfu/vitesse-webext my-webext
cd my-webext
yarn install
```

## Usage

### Folders

- `src` - main source.
  - `contentScript` - scripts and components to be injected as `content_script`
  - `background` - scripts for background.
  - `components` - auto-imported Solid components that are shared in popup and options page.
  - `styles` - styles shared in popup and options page
  - `assets` - assets used in Solid components
  - `manifest.ts` - manifest for the extension.
- `assets` - static assets (mainly for `manifest.json`).
- `extension` - extension package root.
- `scripts` - development and bundling helper scripts.

### Development

```bash
yarn dev
```

Then **load extension in browser with the `extension/` folder**.

For Firefox developers, you can run the following command instead:

```bash
yarn start:firefox
```

`web-ext` auto reload the extension when `extension/` files changed.

> While Vite handles HMR automatically in the most of the case, [Extensions Reloader](https://chrome.google.com/webstore/detail/fimgfedafeadlieiabdeeaodndnlbhid) is still recommanded for cleaner hard reloading.

### Build

To build the extension, run

```bash
yarn build
```

And then pack files under `extension`, you can upload `extension.crx` or `extension.xpi` to appropriate extension store.

## Credits

![](https://user-images.githubusercontent.com/11247099/127029137-6b5ad5db-76c4-4061-86ff-489911a8adfb.png)

This template is originally made for the [volta.net](https://volta.net) browser extension.

## Variations

This is a variant of [Vitesse](https://github.com/antfu/vitesse), check out the [full variations list](https://github.com/antfu/vitesse#variations).
