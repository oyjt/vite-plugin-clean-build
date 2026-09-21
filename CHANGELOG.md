# Changelog

## 2.0.0 (Unreleased / 未发布)

### Breaking changes

- Requires Node.js 18 or later.
- ESM only; the CommonJS entry has been removed. Use an ESM Vite config to import the plugin.
- Without `outputDir`, cleanup now uses Vite's `build.outDir` relative to Vite's `root`, rather than `dist` relative to `process.cwd()`. Set `outputDir: 'dist'` to retain the previous directory selection.

### Other changes

- Upgraded `del` from 6 to 8.
- Added Vite 8 compatibility while retaining support for Vite 3 and later.
- Explicit relative `outputDir` paths still resolve from `process.cwd()`; absolute paths are unchanged.
- Empty patterns skip cleanup.
- Simplified verbose output with a plugin prefix, correct singular/plural labels, and one message for removed paths.

### 中文迁移说明

- 要求 Node.js 18 或更高版本。
- 仅发布 ESM，移除 CommonJS 入口，请在 ESM 格式的 Vite 配置中导入插件。
- 未传 `outputDir` 时，改为按 Vite 的 `root` 和 `build.outDir` 确定清理目录，不再固定使用当前工作目录下的 `dist`。设置 `outputDir: 'dist'` 可保留旧版目录选择行为。
- 显式相对 `outputDir` 仍以 `process.cwd()` 为基准，绝对路径不变。
- `del` 从 6 升级至 8。
- 新增 Vite 8 兼容，同时继续支持 Vite 3 及更高版本。
- 空规则跳过清理。
- 简化详细日志，增加插件前缀、正确的单复数，并合并输出已删除路径。
