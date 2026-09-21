# Changelog

## 2.0.0 (Unreleased / 未发布)

### Breaking changes

- Requires Vite 8 and Node.js `^20.19.0 || >=22.12.0`.
- ESM only; the CommonJS entry has been removed. Use an ESM Vite config to import the plugin.
- Without `outputDir`, cleanup now uses Vite's `build.outDir` relative to Vite's `root`, rather than `dist` relative to `process.cwd()`. Set `outputDir: 'dist'` to retain the previous directory selection.

### Other changes

- Upgraded `del` from 6 to 8.
- Explicit relative `outputDir` paths still resolve from `process.cwd()`; absolute paths are unchanged.
- Empty patterns skip cleanup.
- Verbose cleanup counts are labeled as paths because results can include both files and directories.

### 中文迁移说明

- 要求 Vite 8 和 Node.js `^20.19.0 || >=22.12.0`。
- 仅发布 ESM，移除 CommonJS 入口，请在 ESM 格式的 Vite 配置中导入插件。
- 未传 `outputDir` 时，改为按 Vite 的 `root` 和 `build.outDir` 确定清理目录，不再固定使用当前工作目录下的 `dist`。设置 `outputDir: 'dist'` 可保留旧版目录选择行为。
- 显式相对 `outputDir` 仍以 `process.cwd()` 为基准，绝对路径不变。
- `del` 从 6 升级至 8。
- 空规则跳过清理。
- 详细日志中的删除数量改为按路径描述，因为结果可能包含文件和目录。
