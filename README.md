Quickpack
======
A CLI with a simple webpack config that bundles and compiles ES2018 and CSS with SCSS-like syntax into bundles that browsers understand.


Installation
------
Add the package as a dev dependency:
```bash
npm i -D github:cbodin/quickpack#v2.0.0
```

Create a [`.browserslistrc`](https://github.com/browserslist/browserslist) file in the root of your project. A common config is:
```text
IE 11
last 3 firefox versions
last 3 chrome versions
last 3 safari versions
last 3 edge versions
last 3 chromeandroid versions
last 3 ios versions
```

#### IDE support
Some IDE's provide integration with webpack to provide better code hints and module resolving.
A `webpack.ide.js` file is included to provide a fully valid webpack config for IDE's.
This is tested with IntelliJ based editors. Point the webpack plugin to `node_modules/@cbodin/quickpack/webpack.ide.js`.


Usage
------
The default behavior is to use `src/index.js` as an entry point. Output for JS and CSS bundles defaults to `dist/`.

Run `npx quickpack -h` for a list of all options.

A common scenario is to include a build and a dev script in your `package.json` file:
```json
{
  "scripts": {
    "build": "quickpack",
    "dev": "quickpack -d"
  }
}
```


NPM modules
------
Modules inside the `node_modules` folder is not transformed by Babel to improve compilation time.
This is normally not an issue as most npm modules are pre-compiled to ES5 and will work just fine.
However, some modules are shipped with code written in ES2015 or newer and will require Babel transformations.
To make Babel transform a specific module, use the `--modules` argument to include it.
Multiple modules can be separated by a comma.

Some common modules that needs to be transformed are
- [whatwg-fetch](https://github.com/github/fetch#readme) (`--modules whatwg-fetch`)
- [swiper](https://idangero.us/swiper/get-started/) (`--modules swiper,dom7,ssr-window`)


Fetch polyfill
------
A common scenario for sites supporting IE11 is to include a fetch polyfill.
The most used one is the [whatwg-fetch](https://github.com/github/fetch#readme) created by github.

To install the polyfill, add the `whatwg-fetch` library as a dependency:
```bash
npm i -S whatwg-fetch
```

Import the polyfill in your entry file:
```js
import 'whatwg-fetch'
```

As the fetch module use Promises and does not include a polyfill, the module needs to be processed by Babel so remember
to add it to the modules argument: `--modules whatwg-fetch`.


Features
------
**Vue**
- Vue [single file components](https://vuejs.org/v2/guide/single-file-components.html) using [vue-loader](https://vue-loader.vuejs.org/)

**Babel**
- [@babel/plugin-transform-runtime](https://babeljs.io/docs/en/babel-plugin-transform-runtime)
- [@babel/preset-env](https://babeljs.io/docs/en/babel-preset-env)
- [@babel/runtime-corejs2](https://babeljs.io/docs/en/babel-runtime-corejs2)

**PostCSS**
- [autoprefixer](https://github.com/postcss/autoprefixer)
- [cssnano](https://cssnano.co/)
- [postcss-custom-media](https://github.com/postcss/postcss-custom-media)
- [postcss-custom-properties](https://github.com/postcss/postcss-custom-properties)
- [postcss-import](https://github.com/postcss/postcss-import)
- [postcss-nested](https://github.com/postcss/postcss-nested)
