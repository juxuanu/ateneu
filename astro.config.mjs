import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  output: "server",
  devToolbar: { enabled: false },
  experimental: {
    actions: true,
  },
  integrations: [tailwind()],
});
