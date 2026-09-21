# vite-plugin-clean-build

![npm](https://img.shields.io/npm/v/vite-plugin-clean-build) ![license](https://img.shields.io/npm/l/vite-plugin-clean-build)

一个在 Vite 构建完成后，按规则清理文件和目录的插件。

[English](README.md) | [中文](README_CN.md)

## 安装

支持 Vite 3 至 Vite 8，要求 Node.js 18 或更高版本，仅支持 ESM。使用 Vite 8 时，还需满足 Vite 自身的 Node.js 版本要求。

```bash
# npm
npm i vite-plugin-clean-build -D

# yarn
yarn add vite-plugin-clean-build -D

# pnpm
pnpm add vite-plugin-clean-build -D
```

## 使用

在 ESM 格式的 Vite 配置中添加插件，例如 `vite.config.mjs` 或 `vite.config.mts`。设置了 `"type": "module"` 的项目也可以使用 `vite.config.js`。

例如，在构建完成后删除 source map 文件：

```js
import { defineConfig } from 'vite';
import CleanBuild from 'vite-plugin-clean-build';

export default defineConfig({
  plugins: [CleanBuild({ patterns: ['**/*.map'] })],
});
```

## 配置项

| 名称 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| `outputDir` | `string` | Vite `build.outDir` | 清理目录；显式相对路径以 `process.cwd()` 为基准 |
| `patterns` | `string[]` | `[]` | 要删除的文件和目录的 glob 规则，相对清理目录匹配 |
| `verbose` | `boolean` | `false` | 输出清理摘要和已删除路径；错误始终输出 |

默认使用 Vite 的 `build.outDir`，相对 Vite 的 `root` 解析。显式传入的相对 `outputDir` 以当前工作目录（`process.cwd()`）为基准；绝对路径直接使用。

使用自定义打包输出或多环境构建时，请通过 `outputDir` 指定需要清理的目标目录，不支持自动按环境选择目录。

例如，删除图片但保留 `logo.png`：

```js
import CleanBuild from 'vite-plugin-clean-build';

export default {
  plugins: [
    CleanBuild({
      patterns: ['images/**', '!images', '!images/logo.png'],
      verbose: true,
    }),
  ],
};
```

## 清理行为

Glob 规则使用正斜杠，包括 Windows 环境。`images/**` 也会匹配父目录，因此要保留 `images/logo.png`，还需排除 `images` 目录本身。清理包含隐藏文件，不允许删除所选目录之外的文件。

空规则不执行清理。清理失败会记录错误，但不会中断构建。插件仅在构建时执行，开发服务器中不执行清理。

## 更新日志

版本变更和迁移说明见 [CHANGELOG.md](https://github.com/oyjt/vite-plugin-clean-build/blob/main/CHANGELOG.md)。

## 问题反馈

遇到问题或有功能建议，请提交 [GitHub Issue](https://github.com/oyjt/vite-plugin-clean-build/issues)。

## 使用许可

[MIT License](https://github.com/oyjt/vite-plugin-clean-build/blob/main/LICENSE)

Copyright (c) 2023-present cnpath
