// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import vue from "@astrojs/vue";

export default defineConfig({
  integrations: [
    vue(),
    starlight({
      title: "HMPL Documentation",
      description: "Documentation for HMPL - HTML Markup Programming Language",
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/hmpl-language/hmpl"
        }
      ],
      sidebar: [
        {
          label: "Getting Started",
          items: [
            { label: "Introduction", link: "/introduction" },
            { label: "Installation", link: "/installation" },
            { label: "Getting Started", link: "/getting-started" }
          ]
        },
        {
          label: "Essentials",
          items: [
            { label: "DOM", link: "/dom" },
            { label: "Examples", link: "/examples" },
            {
              label: "Server Configuration",
              link: "/server-configuration"
            },
            { label: "Vite Plugin", link: "/vite-plugin" },
            { label: "Webpack", link: "/webpack" },
            { label: "VS Code Extension", link: "/vs-code-extension" }
          ]
        },
        {
          label: "About",
          items: [
            {
              label: "Migration from v2 to v3",
              link: "/about/migration-from-v2-to-v3-version"
            },
            { label: "Security", link: "/about/security" },
            {
              label: "Server Side Rendering",
              link: "/about/server-side-rendering"
            },
            {
              label: "Discussion and Development",
              link: "/about/discussion-and-development-of-an-open-source-project"
            },
            {
              label: "GitHub Repository with Examples",
              link: "/about/github-repository-with-examples"
            }
          ]
        },
        {
          label: "Reference",
          items: [{ label: "Changelog", link: "/changelog" }]
        }
      ]
    })
  ]
});
