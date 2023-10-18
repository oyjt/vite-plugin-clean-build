import path from "node:path";
import del from "del";
import type { Plugin } from "vite";
import type { ConfigOptions } from "./typing";

const cleanBuildPlugin = (_opt: ConfigOptions): Plugin => {
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
        const deletedPaths = await del(options.patterns, { cwd: outputDir, dot: true, ignore: [] });
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
