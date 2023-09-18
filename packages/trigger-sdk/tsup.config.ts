import { defineConfig } from "tsup";
import { Plugin } from "esbuild";

/**
 * We're adding the `node:` protocol back to the `async_hooks` module to fix this issue: https://github.com/egoist/tsup/issues/1003
 */
export const restoreNodeProtocolPlugin = (): Plugin => {
  return {
    name: "node-protocol-plugin-restorer",
    setup({ onResolve }) {
      onResolve(
        {
          filter: /async_hooks/,
        },
        ({ path }) => {
          return {
            path: "node:async_hooks",
            external: true,
          };
        }
      );
    },
  };
};

export default defineConfig([
  {
    name: "main",
    entry: ["./src/index.ts"],
    outDir: "./dist",
    platform: "node",
    format: ["cjs"],
    legacyOutput: true,
    sourcemap: true,
    clean: true,
    bundle: true,
    splitting: false,
    dts: true,
    external: ["http", "https", "util", "events", "tty", "os", "timers"],
    esbuildPlugins: [restoreNodeProtocolPlugin()],
  },
]);
