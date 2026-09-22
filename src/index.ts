import path from "node:path";
import { deleteAsync } from "del";
import type { Logger, Plugin } from "vite";
import type { CleanBuildOptions } from "./typing";

export type { CleanBuildOptions } from "./typing";

const pluginName = "vite-plugin-clean-build";

const cleanBuildPlugin = ({
  outputDir,
  patterns = [],
  verbose = false,
  silent = false,
}: CleanBuildOptions = {}): Plugin => {
  let resolvedOutputDir: string;
  let logger: Logger;
  let bundleWritten = false;

  const cleanup = async () => {
    if (patterns.length === 0) return;

    try {
      const deletedPaths = await deleteAsync(patterns, {
        cwd: resolvedOutputDir,
        dot: true,
        force: false,
      });

      if (!verbose || silent) return;

      if (deletedPaths.length === 0) {
        logger.info(`[${pluginName}] No matching paths found.`);
        return;
      }

      const pathLabel = deletedPaths.length === 1 ? "path" : "paths";
      const paths = deletedPaths.map(filePath => `  - ${filePath}`).join("\n");
      logger.info(`[${pluginName}] Removed ${deletedPaths.length} ${pathLabel}:\n${paths}`);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      if (!silent) logger.error(`[${pluginName}] Cleanup failed: ${errorMessage}`);
    }
  };

  return {
    name: pluginName,
    enforce: "post",
    apply: "build",
    configResolved(config) {
      logger = config.logger;
      resolvedOutputDir = outputDir === undefined
        ? path.resolve(config.root, config.build.outDir)
        : path.resolve(outputDir);
    },
    buildStart() {
      bundleWritten = false;
    },
    writeBundle() {
      bundleWritten = true;
      if (this.meta.watchMode) return cleanup();
    },
    closeBundle() {
      if (!this.meta.watchMode && bundleWritten) return cleanup();
    },
  };
};

export default cleanBuildPlugin;
