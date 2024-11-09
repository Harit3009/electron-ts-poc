const esbuildPluginTsc = require("esbuild-plugin-tsc");

function createBuildSettings(options) {
  return {
    entryPoints: ["dist/_preload.ts"],
    outfile: "dist/_preload.js",
    bundle: true,
    plugins: [
      esbuildPluginTsc({
        // force: true,
      }),
    ],
    ...options,
  };
}

module.exports.createBuildSettings = createBuildSettings;
