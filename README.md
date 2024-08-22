# postcss-shadowdom

A PostCSS plugin that converts `:root` selectors to `:host` selectors for use in Shadow DOM.

[![npm version](https://badge.fury.io/js/postcss-shadowdom.svg)](https://badge.fury.io/js/postcss-shadowdom)
[![codecov](https://codecov.io/gh/jadamita/postcss-shadowdom/branch/main/graph/badge.svg)](https://codecov.io/gh/jadamita/postcss-shadowdom)
[![CI](https://github.com/jadamita/postcss-shadowdom/actions/workflows/ci.yml/badge.svg)](https://github.com/jadamita/postcss-shadowdom/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Installation

```bash
npm install --save-dev postcss-shadowdom
```

## Usage

```js
const postcss = require("postcss");
const postcssShadowdom = require("postcss-shadowdom");

postcss([postcssShadowdom()]).process(your_css /*, processOptions */);
```

## Options

The plugin accepts an options object with the following property:

- **customHostSelector** (optional): A string to use as the host selector instead of the default :host. Default value is :host.

Example:

```js
postcss([postcssShadowdom({ customHostSelector: ":shadow-root" })]).process(
  your_css,
);
```

## Usage with PostCSS CLI

Add to your postcss.config.js:

```js
jsCopymodule.exports = {
  plugins: [require("postcss-shadowdom")],
};
```

## Usage with webpack

Add to your webpack.config.js:

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [require("postcss-shadowdom")],
              },
            },
          },
        ],
      },
    ],
  },
};
```

## What it does

This plugin converts CSS rules that use the :root selector to use the :host selector instead, making them compatible with Shadow DOM.

For example, this CSS:

```css
:root {
  --primary-color: blue;
}

:root.dark-theme {
  --primary-color: navy;
}
```

Will be transformed to:

```css
:host {
  --primary-color: blue;
}

:host(.dark-theme) {
  --primary-color: navy;
}
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
