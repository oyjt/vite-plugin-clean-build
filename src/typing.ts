export interface ConfigOptions {
  /**
   * Remove files inside the directory
   * 
   * Defaults to Vite's build.outDir, resolved relative to Vite's root.
   * Explicit relative paths remain relative to process.cwd().
   * 
   */
  outputDir?: string;
  /**
   * Glob patterns for files and directories to remove after build,
   * relative to the cleanup directory.
   *
   * Use !negative patterns to exclude files
   *
   * default: []
   */
  patterns?: string[];
  /**
   * Log cleanup results and deleted paths. Errors are always logged.
   *
   * default: false
   */
  verbose?: boolean;
  /**
   * Disable all plugin logs, including errors.
   * Useful when another plugin manages logging.
   *
   * default: false
   */
  silent?: boolean;
}
