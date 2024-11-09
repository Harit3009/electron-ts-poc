const esbuild = require("esbuild");
const esbuildPluginTsc = require("esbuild-plugin-tsc");

(async () => {
  await esbuild.build({
    entryPoints: ["dist/frontend/index.ts"],
    bundle: true,
    outfile: "dist/frontend/index.js",
    plugins: [
      esbuildPluginTsc({
        // force: true,
      }),
    ],
  });
})();
