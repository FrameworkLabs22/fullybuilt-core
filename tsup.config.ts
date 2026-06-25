import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  dts: true,
  sourcemap: true,
  clean: true,
  treeshake: true,
  // React + router are provided by the host app (peer deps); everything else in
  // `dependencies` is externalized automatically by tsup so the consumer dedupes.
  external: ["react", "react-dom", "react/jsx-runtime", "react-router-dom"],
});
