// @ts-check
import starlight from "@astrojs/starlight";

import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import vercelStatic from "@astrojs/vercel";

import { defineConfig } from "astro/config";

const SITE = "https://github.com/dream-sports-labs/";

// https://astro.build/config
export default defineConfig({
  site: SITE,
  integrations: [
    starlight({
      title: "Marco",
      // head: meta(SITE),
      pagination: true,
      titleDelimiter: "/",
      description:
        "Simple, composable, and effective state management for JavaScript.",
      logo: {
        dark: "./src/assets/logo-dark.svg",
        light: "./src/assets/logo-light.svg",
        alt: "Marco Logo",
        replacesTitle: true,
      },
      social: {
        github:
          "https://github.com/dream-sports-labs/react-native-performance-tracker",
      },
      sidebar: [
        {
          label: "Project",
          autogenerate: { directory: "project" },
        },
        {
          label: "API Reference",
          items: [
            "api/tracking-screen",
            "api/sending-markers",
            "api/performance-log",
            "api/resetting-logs",
            "api/retrieving-logs",
            "api/log-file-paths",
            {
              label: "CLI",
              items: [
                "api/cli/overview",
                "api/cli/generate-report",
                "api/cli/visualization",
              ],
            },
          ],
        },
        {
          label: "Sample usage",
          link: "/sample-usage",
        },
      ],
      customCss: ["./src/tailwind.css", "@fontsource-variable/inter"],
      components: {
        Head: "./src/overrides/head.astro",
      },
    }),
    tailwind({ applyBaseStyles: false }),
    react(),
  ],
});
