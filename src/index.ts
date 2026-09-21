import path from "node:path";
import { deleteAsync } from "del";
import type { Plugin } from "vite";
import type { ConfigOptions } from "./typing";

const cleanBuildPlugin = ({
  outputDir,
  patterns = [],
  verbose = false,
}: ConfigOptions = {}): Plugin => {
  let resolvedOutputDir: string;

  return {
    name: "vite-plugin-clean-build",
    enforce: "post",
    apply: "build",
    configResolved(config) {
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

        if (!verbose) return;

        if (deletedPaths.length === 0) {
          console.log("✓ Cleanup completed: No files were deleted");
          return;
        }

        console.log(`✓ Cleanup completed: Deleted paths (${deletedPaths.length}):`);
        for (const filePath of deletedPaths) {
          console.log(`  - ${filePath}`);
        }
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.error(`❌ Failed to delete files: ${errorMessage}`);
      }
    },
  };
};

export default cleanBuildPlugin;
