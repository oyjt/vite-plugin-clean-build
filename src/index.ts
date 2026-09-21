import path from "node:path";
import { deleteAsync } from "del";
import type { Logger, Plugin } from "vite";
import type { ConfigOptions } from "./typing";

const pluginName = "vite-plugin-clean-build";

const cleanBuildPlugin = ({
  outputDir,
  patterns = [],
  verbose = false,
  silent = false,
}: ConfigOptions = {}): Plugin => {
  let resolvedOutputDir: string;
  let logger: Logger;

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
    async closeBundle() {
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
    },
  };
};

export default cleanBuildPlugin;
