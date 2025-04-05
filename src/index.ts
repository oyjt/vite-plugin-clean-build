import path from "node:path";
import del from "del";
import type { Plugin } from "vite";
import type { ConfigOptions } from "./typing";

const cleanBuildPlugin = (_opt: ConfigOptions = {}): Plugin => {
  const options = {
    outputDir: "dist",
    patterns: [],
    verbose: false,
    ..._opt
  };

  return {
    name: "vite-plugin-clean-build",
    enforce: "post",
    apply: "build",
    closeBundle: async () => {
      try {
        const outputDir = path.resolve(options.outputDir);
        const deletedPaths = await del(options.patterns, { 
          cwd: outputDir, 
          dot: true, 
          ignore: [],
          dryRun: false,
          force: false 
        });
        
        if (options.verbose) {
          if (deletedPaths.length === 0) {
            console.log("✓ Cleanup completed: No files were deleted");
          } else {
            console.log(`✓ Cleanup completed: Successfully deleted ${deletedPaths.length} files:`);
            deletedPaths.forEach(filePath => console.log(`  - ${filePath}`));
          }
        }
      } catch (error: unknown) {
        // More specific error handling
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.error(`❌ Failed to delete files: ${errorMessage}`);
      }
    },
  };
};

export default cleanBuildPlugin;
