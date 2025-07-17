// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import vue from "@astrojs/vue";
import starlightThemeNova from "starlight-theme-nova";

export default defineConfig({
  site: "https://hmpl-lang.dev",
  integrations: [
    vue(),
    starlight({
      title: "HMPL Documentation",
      description:
        "Server-oriented customizable templating for JavaScript. Alternative to HTMX and Alpine.js.",
      customCss: ["./src/styles/main.css"],
      logo: {
        src: "./src/assets/logo.svg"
      },
      expressiveCode: {
        themes: ["min-light", "min-light"],
        shiki: {
          langAlias: {
            hmpl: "html"
          }
        }
      },
      editLink: {
        baseUrl: "https://github.com/hmpl-language/hmpl/edit/main/www/app"
      },
      favicon: "favicon.ico",
      social: [
        {
          icon: "x.com",
          label: "Twitter",
          href: "https://x.com/hmpljs"
        },
        {
          icon: "discord",
          label: "Discord",
          href: "https://discord.com/invite/KFunMep36n"
        },
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/hmpl-language/hmpl"
        }
      ],
      sidebar: [
        {
          label: "Start Here",
          items: [
            { label: "Introduction", link: "/introduction" },
            { label: "Getting Started", link: "/getting-started" },
            { label: "Installation", link: "/installation" }
          ]
        },
        {
          label: "Syntax",
          items: [
            { label: "Block helper", link: "/syntax/block-helper" },
            { label: "Attribute", link: "/syntax/attribute" }
          ]
        },
        {
          label: "Objects",
          items: [{ label: "hmpl", link: "/objects/hmpl" }]
        },
        {
          label: "Block helpers",
          items: [
            { label: "request (r)", link: "/block-helpers/request" },
            { label: "indicator", link: "/block-helpers/indicator" }
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
              badge: { text: "new", variant: "note" },
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
          items: [
            {
              label: "Blog",
              link: "https://blog.hmpl-lang.dev"
            },
            {
              label: "Changelog",
              link: "/changelog"
            }
          ]
        }
      ],
      plugins: [
        starlightThemeNova({
          nav: [
            {
              label: "Home",
              href: "/"
            },
            {
              label: "Docs",
              href: "/introduction"
            },
            {
              label: "Examples",
              href: "/examples"
            },
            {
              label: "Blog",
              href: "https://blog.hmpl-lang.dev"
            }
          ]
        })
      ]
    })
  ]
});
