import { defineUserConfig } from "vuepress/cli";
import { viteBundler } from "@vuepress/bundler-vite";
import { hopeTheme } from "vuepress-theme-hope";
import { getDirname, path } from "vuepress/utils";

const __dirname = getDirname(import.meta.url);

export default defineUserConfig({
  lang: "en-US",
  title: "HMPL.js",
  description: "Server-oriented customizable templating for JavaScript",
  port: 3000,

  theme: hopeTheme(
    {
      logo: "/images/logo.svg",
      darkmode: "disable",
      repo: "hmpl-language/hmpl",
      repoLabel: "GitHub",
      repoDisplay: true,
      docsBranch: "dev",
      docsDir: "docs",
      docsRepo: "https://github.com/hmpl-language/hmpl-site",
      navbarLayout: {
        start: ["Brand"],
        center: ["Links"],
        end: [
          "Language",
          "SocialLink",
          "Repo",
          "GitHubStars",
          "Outlook",
          "Search"
        ]
      },
      navbar: [
        // NavbarLink
        {
          text: "Home",
          link: "/"
        },
        {
          text: "Docs",
          link: "introduction.md"
        },
        {
          text: "Examples",
          link: "examples.md"
        },
        {
          text: "Blog",
          link: "https://blog.hmpl-lang.dev"
        }
      ],

      iconAssets: [""],

      sidebar: [
        {
          text: "Introduction",
          link: "introduction.md"
        },
        {
          text: "Installation",
          link: "installation.md"
        },
        {
          text: "Getting started",
          link: "getting-started.md"
        },
        {
          text: "Server Configuration",
          link: "server-configuration.md"
        },
        {
          text: "hmpl",
          link: "hmpl.md",
          children: [
            {
              text: "compile",
              link: "hmpl.md#compile",
              children: [
                {
                  text: "RequestInit",
                  link: "hmpl.md#requestinit",
                  children: [
                    {
                      text: "get",
                      link: "hmpl.md#get"
                    }
                  ]
                }
              ]
            },
            {
              text: "stringify",
              link: "hmpl.md#stringify"
            },
            {
              text: "Concept of context",
              link: "hmpl.md#concept-of-context"
            }
          ]
        },
        {
          text: "Request",
          link: "request.md",
          children: [
            {
              text: "src",
              link: "request.md#src"
            },
            {
              text: "method",
              link: "request.md#method"
            },
            {
              text: "after",
              link: "request.md#after"
            },
            {
              text: "repeat",
              link: "request.md#repeat"
            },
            {
              text: "indicators",
              link: "request.md#indicators"
            },
            {
              text: "autoBody",
              link: "request.md#autobody"
            },
            {
              text: "memo",
              link: "request.md#memo"
            },
            {
              text: "initId",
              link: "request.md#initid"
            },
            {
              text: "allowedContentTypes",
              link: "request.md#allowedcontenttypes"
            }
          ]
        },
        {
          text: "Types",
          link: "types.md"
        },
        {
          text: "Webpack Loader",
          link: "webpack.md"
        },
        {
          text: "VS Code Extension",
          link: "vs-code-extension.md"
        },
        {
          text: "Examples",
          link: "examples.md"
        },
        {
          text: "About",
          collapsible: false,
          expanded: true,
          prefix: "/about/",
          children: [
            {
              text: "Discussion and development of an open-source project",
              link: "discussion-and-development-of-an-open-source-project.md"
            },
            {
              text: "GitHub repository with examples",
              link: "github-repository-with-examples.md"
            },
            {
              text: "Server-side rendering",
              link: "server-side-rendering.md"
            }
          ]
        },
        {
          text: "Changelog",
          link: "changelog.md"
        }
      ],
      plugins: {
        // search: true,

        // Algolia
        docsearch: {
          apiKey: "1e7fa1bed6efc9725261bdc9991fab11",
          appId: "WBEF1LVBSZ",
          indexName: "hmpl-lang"
        },

        sitemap: {
          hostname: "hmpl-lang.dev"
        } as any,
        git: {
          createdTime: false,
          updatedTime: false,
          contributors: false
        },
        shiki: {
          langAlias: {
            hmpl: "html"
          },
          theme: "min-light"
        }
      }
    },
    {
      custom: true
    }
  ),
  alias: {
    // You can override or add aliases here
    // For example, here we change the vuepress-theme-hope HomePage component to components/HomePage.vue under our own theme
    "@theme-hope/components/HomePage": path.resolve(
      __dirname,
      "./layouts/HomePage.vue"
    )
  },
  head: [
    ["link", { rel: "icon", href: "/images/favicon.ico" }],
  ],
  bundler: viteBundler()
});
