import { defineConfig } from "tsup";

export default defineConfig([
  {
    entry: ["src/main.ts"],
    format: ["cjs"],
    dts: { entry: "src/types.ts" }, // Generates a types file
    minify: false, // Ensure this is false for non-minified output
    sourcemap: false,
    outDir: "package", // Change output directory to build
    outExtension: () => ({ js: ".runtime.js" }) // CommonJS runtime file
  },
  {
    entry: ["src/main.ts"],
    format: ["esm"],
    minify: true, // Keep minification for ESM
    sourcemap: false,
    outDir: "package", // Change output directory to build
    outExtension: () => ({ js: ".min.js" }) // ESM minified file
  },
  {
    entry: ["src/main.ts"],
    format: ["esm"],
    minify: false, // Ensure this is false for non-minified output
    sourcemap: false,
    outDir: "package", // Change output directory to build
    outExtension: () => ({ js: ".js" }) // Unminified hmpl.js
  },
  {
    entry: ["src/index.ts"],
    format: ["cjs", "esm"],
    dts: true,
    outDir: "dist",
    clean: false
  }
]);
