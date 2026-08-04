import { defineConfig } from "tsup";

export default defineConfig({
  // ⚠️ UNBUNDLED on purpose (v0.4.3). The single-file bundle made tree-shaking all-or-nothing:
  // a consumer importing only WarmTable still executed react-resizable-panels' module-scope
  // code — which constructs an AbortController at global scope and is FATAL on Cloudflare
  // workerd ("Disallowed operation called within global scope", took the returns station's SSR
  // down on 2026-08-04). Per-file output + sideEffects:false in package.json lets bundlers keep
  // only the modules a consumer actually imports.
  entry: ["src/**/*.ts", "src/**/*.tsx"],
  bundle: false,
  format: ["esm"],
  dts: true,
  sourcemap: true,
  clean: true,
});
