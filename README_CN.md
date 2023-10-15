# vite-plugin-clean-build

[![npm](https://d25lcipzij17d.cloudfront.net/badge.svg?id=js&r=r&type=6e&v=0.0.3&x2=0)](https://github.com/oyjt/vite-plugin-clean-build)
![license](https://img.shields.io/npm/l/vite-plugin-clean-build)

一个用于删除/清理构建后的文件的vite插件。

## 内容目录

1.  [安装](#installation)
2.  [使用](#usage)
3.  [问题](#issues)
4.  [使用许可](#license)

### 安装

<a name="installation"></a>

```bash
  # npm
  npm i vite-plugin-clean-build -D

  # yarn
  yarn add vite-plugin-clean-build -D

  # pnpm
  pnpm add vite-plugin-clean-build -D
```

### 使用

<a name="usage"></a>

这是一个 vite 配置示例，说明了如何使用此插件

**vite.config.js**
```js
import CleanBuild from 'vite-plugin-clean-build';
export default {
  plugins: [CleanBuild()],
}
```
<h2 align="center">配置项</h2>

您可以将配置选项值传给`vite-plugin-clean-build`。
允许的值如下：

|名称|类型|默认值|描述|
|:--:|:--:|:-----:|:----------|
|**`outputDir`**|`{string}`|`'dist'`|删除该目录内的文件|
|**`patterns`**|`{Array<string>}`|`[]`|在每次构建后删除与此模式匹配的文件|
|**`verbose`**|`{boolean}`|`false`|将日志写入控制台|

这是一个示例 vite 配置，说明了如何使用这些选项

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

### 问题

<a name="issues"></a>

如果您在使用过程中遇到问题，请点击这里 [问题反馈](https://github.com/oyjt/vite-plugin-clean-build/issues)

### 使用许可

<a name="license"></a>

[MIT License](https://github.com/oyjt/vite-plugin-clean-build/blob/master/LICENSE)

Copyright (c) 2023-present cnpath