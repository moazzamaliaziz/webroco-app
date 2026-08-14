import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  // Override nitro preset for Vercel deployment
  // @ts-expect-error - nitro preset override
  nitro: {
    preset: "vercel",
  },
});
