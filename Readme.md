# SpiralQuery
A simple utility-first SCSS framework. (Includes precompiled files.)

## Instalation: 
Simply install the NPM package using:
`yarn add spiralquery
#or
npm install spiralquery
#or
pnpm install spiralquery
`.
Then, import it on your JS file using:
```js
import 'spiralquery' // You do not have to import $() or timeout() functions, they put themselves on the window object.
```
Or, use the CDN version, with `<link rel="stylesheet" href="https://cdn.skypack.dev/spiralquery">`.

https://cdn.jsdelivr.net/gh/L1ghtingBolt/SpiralCSS@latest/dist/style.css

## Compiling: 
This project does not compile, it's just a JS file. To pack it so you can use it as a package, you can do:
`yarn pack
#or
npm pack
#or
pnpm pack`.

To publish it as a package, change the project name under package.json, and do: 
`yarn publish
#or
npm publish
#or
pnpm publish`.
