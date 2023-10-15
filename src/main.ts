import path from "node:path";
import { deleteAsync } from "del";
import type { PluginOption } from "vite";
import type { ConfigOptions } from "./typing";

const cleanBuildPlugin = (_opt: ConfigOptions): PluginOption => {
  const options = Object.assign(
    {
      outputDir: "dist",
      patterns: [],
      verbose: false,
    },
    _opt
  );
  return {
    name: "vite-plugin-clean-build",
    enforce: "post",
    apply: "build",
    closeBundle: async () => {
      try {
        const outputDir = path.resolve(options.outputDir);
        const deletedPaths = await deleteAsync(options.patterns, { cwd: outputDir, dot: true, ignore: [] });
        if (options.verbose) {
          console.log("delete files success:", deletedPaths.join("\n"));
        }
      } catch (error) {
        console.error("delete files success fail:", error);
      }
    },
  };
};

export default cleanBuildPlugin;
