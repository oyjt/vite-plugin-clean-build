export interface ConfigOptions {
  /**
   * Remove files inside the directory
   * 
   * default: dist
   * 
   */
  outputDir?: string;
  /**
   * Removes files after every build that match this pattern
   *
   * Use !negative patterns to exclude files
   *
   * default: []
   */
  patterns?: string[];
  /**
   * Write logs to console
   *
   * default: false
   */
  verbose?: boolean;
}