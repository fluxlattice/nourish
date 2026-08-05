import { build } from "esbuild";
import { cpSync, mkdirSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { createRequire } from "node:module";

mkdirSync("dist", { recursive: true });

await build({
  entryPoints: ["src/index.ts"],
  bundle: true,
  format: "esm",
  outfile: "dist/index.js",
  jsx: "automatic",
  target: ["es2020"],
  external: ["react", "react-dom", "react/jsx-runtime"],
  logLevel: "info",
});

// Stylesheets ship unflattened so the @import closure stays intact: consumers
// import styles.css, while tooling can bind tokens.css and components.css apart.
cpSync("src/tokens.css", "dist/tokens.css");
cpSync("src/components.css", "dist/components.css");
cpSync("src/styles.css", "dist/styles.css");

// Resolve tsc rather than hardcoding a path: installing from the repo root
// hoists this package's devDependencies up to the root node_modules.
const tsc = createRequire(import.meta.url).resolve("typescript/bin/tsc");
execFileSync(process.execPath, [tsc, "-p", "tsconfig.json"], { stdio: "inherit" });

console.log("built @nourish/ui → dist/");
