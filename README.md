# vite-plugin-clean-build

[![npm](https://d25lcipzij17d.cloudfront.net/badge.svg?id=js&r=r&type=6e&v=1.0.0&x2=0)](https://github.com/oyjt/vite-plugin-clean-build)

A vite plugin to remove/clean your build folder(s).

## Table of Contents

1.  [Installation](#installation)
2.  [Usage](#usage)
3.  [Issues](#issues)
4.  [License](#license)

### Installation

<a name="installation"></a>

```bash
  npm i --save-dev vite-plugin-clean-build
```

```bash
  yarn add --dev vite-plugin-clean-build
```

```bash
  pnpm add --dev vite-plugin-clean-build
```

### Usage

<a name="usage"></a>

Here's an example vite config illustrating how to use this plugin

**vite.config.js**
```js
import CleanBuild from 'vite-plugin-clean-build';
export default {
  plugins: [CleanBuild()],
}
```
<h2 align="center">Options</h2>

You can pass a hash of configuration options to `vite-plugin-clean-build`.
Allowed values are as follows:

|Name|Type|Default|Description|
|:--:|:--:|:-----:|:----------|
|**`outputDir`**|`{string}`|`'dist'`|Removes files inside the directory|
|**`patterns`**|`{Array<string>}`|`[]`|Removes files after every build that match this pattern|
|**`verbose`**|`{boolean}`|`false`|Write logs to console|

Here's an example vite config illustrating how to use these options

**vite.config.js**
```js
import CleanBuild from 'vite-plugin-clean-build';
export default {
  plugins: [CleanBuild(
    {
      outputDir: 'dist',
      patterns: [
        'images/**',
        '!images/logo.png'
      ],
      verbose: true,
    }
  )],
}
```

### Issues

<a name="issues"></a>

If you encounter some problems during use, please click here [Issue Report](https://github.com/oyjt/vite-plugin-clean-build/issues)

### License

<a name="license"></a>

[MIT](https://github.com/oyjt/vite-plugin-clean-build/blob/master/LICENSE)

Copyright (c) 2023-present oyjt