# vite-plugin-clean-build

![npm](https://img.shields.io/npm/v/vite-plugin-clean-build) ![license](https://img.shields.io/npm/l/vite-plugin-clean-build)

A vite plugin for remove/clean files after build.

[English](README.md) | [中文](README_CN.md)

## Table of Contents

1.  [Installation](#installation)
2.  [Usage](#usage)
3.  [Issues](#issues)
4.  [License](#license)

### Installation

<a name="installation"></a>

```bash
  # npm
  npm i vite-plugin-clean-build -D

  # yarn
  yarn add vite-plugin-clean-build -D

  # pnpm
  pnpm add vite-plugin-clean-build -D
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
|**`outputDir`**|`{string}`|`'dist'`|Removes files in the directory|
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

[MIT License](https://github.com/oyjt/vite-plugin-clean-build/blob/master/LICENSE)

Copyright (c) 2023-present cnpath