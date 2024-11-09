const fs = require("fs");
const path = require("path");
const { createBuildSettings } = require("./settings.js");
const esbuild = require("esbuild");

const text = fs.readFileSync(path.join("dist", "preload.ts"));
const textContent = text.toString().split('from "electron"');

const firstImport = /{(.*?)}/
  .exec(textContent.shift().replaceAll("\r", "").replaceAll("\n", ""))[1]
  .split(",")
  .filter((e) => !!e)
  .map((e) => e.trim());

const newImports = firstImport.map(
  (mod) => `const ${mod}:any = {}; // added programatically`
);

textContent.unshift(...newImports);
const newText = textContent.join("\n");

fs.writeFileSync(path.join("dist", "_preload.ts"), newText);

const settings = createBuildSettings({ minify: false });

esbuild.build({ ...settings }).then(() => {
  const intermittentJsText = fs
    .readFileSync(path.join("dist", "_preload.js"))
    .toString()
    .split("\n")
    .map((e) => {
      const mod = /(?<=var )(.*)(?= = {})/.exec(e)?.[1]?.trim();
      if (firstImport.includes(mod)) {
        return `var { ${mod} } = require('electron');`;
      }
      return e;
    })
    .join("\n");

  fs.writeFileSync(path.join("dist", "preload.js"), intermittentJsText);
  fs.unlink(path.join("dist", "_preload.ts"), (err) => {
    if (err) console.log("errored while deleting intermediate ts file");
  });
  fs.unlink(path.join("dist", "_preload.js"), (err) => {
    if (err) console.log("errored while deleting intermediate js file");
  });
});
