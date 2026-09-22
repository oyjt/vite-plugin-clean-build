# Changelog

## Unreleased / 未发布

- Clean only after successful builds and support cleanup after each build in watch mode.
- Export the `CleanBuildOptions` type.
- Added compatibility testing for Vite 3 through Vite 8.
- 仅在构建成功后清理，并支持在构建监听模式的每次构建后清理。
- 导出 `CleanBuildOptions` 类型。
- 新增 Vite 3 至 Vite 8 的兼容性测试。

## 2.0.0 (2026-09-21)

### Breaking changes

- Requires Node.js 18 or later.
- ESM only; the CommonJS entry has been removed. Use an ESM Vite config to import the plugin.
- Without `outputDir`, cleanup now uses Vite's `build.outDir` relative to Vite's `root`, rather than `dist` relative to `process.cwd()`. Set `outputDir: 'dist'` to retain the previous directory selection.

### Other changes

- Upgraded `del` from 6 to 8.
- Explicit relative `outputDir` paths still resolve from `process.cwd()`; absolute paths are unchanged.
- Empty patterns skip cleanup.
- Improved log formatting and added a `silent` option for suppressing all plugin logs.

### 中文迁移说明

- 要求 Node.js 18 或更高版本。
- 仅发布 ESM，移除 CommonJS 入口，请在 ESM 格式的 Vite 配置中导入插件。
- 未传 `outputDir` 时，改为按 Vite 的 `root` 和 `build.outDir` 确定清理目录，不再固定使用当前工作目录下的 `dist`。设置 `outputDir: 'dist'` 可保留旧版目录选择行为。
- 显式相对 `outputDir` 仍以 `process.cwd()` 为基准，绝对路径不变。
- `del` 从 6 升级至 8。
- 空规则跳过清理。
- 优化日志格式，并新增 `silent` 选项用于关闭插件的全部日志。
