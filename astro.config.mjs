// @ts-check
import { defineConfig } from "astro/config";
import sitemap from '@astrojs/sitemap';
import starlight from "@astrojs/starlight";
import vue from "@astrojs/vue";
import starlightThemeNova from "starlight-theme-nova";

export default defineConfig({
  site: "https://hmpl-lang.dev",
  integrations: [
    vue(),
    sitemap({
      lastmod: new Date()
    }),
    starlight({
      title: "HMPL Documentation",
      description:
        "HMPL.js is a lightweight server-oriented template language for JavaScript. Fetch HTML, render it safely, and keep apps dynamic, modern, and small. Alternative to HTMX and Alpine.js.",
      customCss: ["./src/styles/main.css"],
      head: [
        {
          tag: 'meta',
          attrs: {
            name: "keywords",
            content: "hmpl, hmpl templates, fast template engine, html templating, server side rendering, express template engine"
          }
        }
      ],
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
      components: {
        Search: "./src/components/Stars.astro"
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
          items: [
            {
              label: "hmpl",
              items: [
                { label: "compile", link: "/objects/hmpl#compile" },
                { label: "stringify", link: "/objects/hmpl#stringify" }
              ]
            },
            {
              label: "instance",
              link: "/objects/instance"
            }
          ]
        },
        {
          label: "Functions",
          items: [
            {
              label: "template",
              link: "/functions/template"
            }
          ]
        },
        {
          label: "Block helpers",
          items: [
            {
              label: "request",
              items: [
                {
                  label: "src",
                  link: "/block-helpers/request#src"
                },
                {
                  label: "method",
                  link: "/block-helpers/request#method"
                },
                {
                  label: "after",
                  link: "/block-helpers/request#after"
                },
                {
                  label: "repeat",
                  link: "/block-helpers/request#repeat"
                },
                {
                  label: "interval",
                  link: "/block-helpers/request#interval"
                },
                {
                  label: "indicators",
                  link: "/block-helpers/request#indicators"
                },
                {
                  label: "autoBody",
                  link: "/block-helpers/request#autobody"
                },
                {
                  label: "memo",
                  link: "/block-helpers/request#memo"
                },
                {
                  label: "initId",
                  link: "/block-helpers/request#iniid"
                },
                {
                  label: "allowedContentTypes",
                  link: "/block-helpers/request#allowedcontenttypes"
                },
                {
                  label: "disallowedTags",
                  link: "/block-helpers/request#disallowedtags"
                },
                {
                  label: "sanitize",
                  link: "/block-helpers/request#sanitize"
                }
              ]
            },
            {
              label: "indicator",
              badge: { text: "new", variant: "note" },
              items: [
                {
                  label: "trigger",
                  link: "/block-helpers/indicator#trigger"
                }
              ]
            }
          ]
        },
        {
          label: "Context",
          items: [{ label: "request", link: "/context/request" }]
        },
        {
          label: "Types",
          collapsed: true,
          items: [
            { label: "HMPLRequestInit", link: "/types#hmplrequestinit" },
            { label: "HMPLInstance", link: "/types#hmplinstance" },
            {
              label: "HMPLInstanceContext",
              link: "/types#hmplinstancecontext"
            },
            { label: "HMPLRequest", link: "/types#hmplrequest" },
            { label: "HMPLRequestGet", link: "/types#hmplrequestget" },
            { label: "HMPLRequestInfo", link: "/types#hmplrequestinfo" },
            { label: "HMPLCompile", link: "/types#hmplcompile" },
            { label: "HMPLCompileOptions", link: "/types#hmplcompileoptions" },
            {
              label: "HMPLTemplateFunction",
              link: "/types#hmpltemplatefunction"
            },
            { label: "HMPLClearInterval", link: "/types#hmplclearinterval" },
            {
              label: "HMPLAutoBodyOptions",
              link: "/types#hmplautobodyoptions"
            },
            { label: "HMPLInitalStatus", link: "/types#hmplinitalstatus" },
            {
              label: "HMPLIndicatorTrigger",
              link: "/types#hmplindicatortrigger"
            },
            { label: "HMPLRequestStatus", link: "/types#hmplrequeststatus" },
            { label: "HMPLContentTypes", link: "/types#hmplcontenttypes" },
            { label: "HMPLDisallowedTag", link: "/types#hmpldisallowedtag" },
            { label: "HMPLDisallowedTags", link: "/types#hmpldisallowedtags" },
            { label: "HMPLSanitize", link: "/types#hmplsanitize" },
            { label: "HMPLIndicator", link: "/types#hmplindicator" },
            { label: "HMPLHeadersInit", link: "/types#hmplheadersinit" },
            {
              label: "HMPLIdentificationRequestInit",
              link: "/types#hmplidentificationrequestinit"
            },
            {
              label: "HMPLRequestInitFunction",
              link: "/types#hmplrequestinitfunction"
            }
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
