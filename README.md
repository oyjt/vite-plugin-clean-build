# vite-plugin-clean-build

![npm](https://img.shields.io/npm/v/vite-plugin-clean-build) ![license](https://img.shields.io/npm/l/vite-plugin-clean-build)

A Vite plugin that removes matching files and directories after a build.

[English](README.md) | [中文](README_CN.md)

## Installation

Supports Vite 3 through 8. Requires Node.js 18 or later. This package is ESM only.

```bash
# npm
npm i vite-plugin-clean-build -D

# yarn
yarn add vite-plugin-clean-build -D

# pnpm
pnpm add vite-plugin-clean-build -D
```

## Usage

Add the plugin to an ESM Vite config, such as `vite.config.mjs` or `vite.config.mts`. You can also use `vite.config.js` in a project with `"type": "module"`.

For example, remove source maps after building:

```js
import { defineConfig } from 'vite';
import CleanBuild from 'vite-plugin-clean-build';

export default defineConfig({
  plugins: [CleanBuild({ patterns: ['**/*.map'] })],
});
```

## Options

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `outputDir` | `string` | Vite `build.outDir` | Cleanup directory; explicit relative paths resolve from `process.cwd()` |
| `patterns` | `string[]` | `[]` | Glob patterns for files and directories to remove, relative to the cleanup directory |
| `verbose` | `boolean` | `false` | Log a cleanup summary and the removed paths; errors are always logged |
| `silent` | `boolean` | `false` | Disable all plugin logs, including errors |

By default, cleanup uses Vite's `build.outDir`, resolved relative to Vite's `root`. An explicit relative `outputDir` resolves from the current working directory (`process.cwd()`); an absolute path is used as provided.

For custom bundler outputs or multi-environment builds, configure `outputDir` for the intended cleanup target. Automatic per-environment directory selection is not supported.

To remove images while keeping `logo.png`:

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

## Cleanup behavior

Glob patterns use forward slashes, including on Windows. A pattern such as `images/**` also matches the parent directory; exclude `images` itself as well as `images/logo.png` to preserve that file. Cleanup includes dotfiles and does not allow deleting outside the selected directory.

Empty patterns do nothing. Cleanup errors are logged without failing the build. Cleanup runs after each successful build, including build watch mode, but not in the development server.

Set `silent: true` when another plugin manages logging. It takes precedence over `verbose` and also hides cleanup errors.

This plugin is Vite-specific because it uses Vite's resolved `root`, `build.outDir`, and logger.

## Changelog

See [CHANGELOG.md](https://github.com/oyjt/vite-plugin-clean-build/blob/main/CHANGELOG.md) for release changes and migration notes.

## Issues

Report bugs or request features in [GitHub Issues](https://github.com/oyjt/vite-plugin-clean-build/issues).

## License

[MIT License](https://github.com/oyjt/vite-plugin-clean-build/blob/main/LICENSE)

Copyright (c) 2023-present cnpath
