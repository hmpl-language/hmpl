import { defineUserConfig } from "vuepress/cli";
import { viteBundler } from "@vuepress/bundler-vite";
import { hopeTheme } from "vuepress-theme-hope";
import { getDirname, path } from "vuepress/utils";

const __dirname = getDirname(import.meta.url);

export default defineUserConfig({
  lang: "en-US",
  title: "HMPL.js",
  description:
    "Server-oriented customizable templating for JavaScript. Apply SSR, SSG, ISG without robot indexing on any sites without Next.js, Remix, Nuxt.js! Also, HMPL can be a great alternative to popular tools such as HTMX and Alpine.js.",
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
          text: "Spec",
          link: "https://spec.hmpl-lang.dev/"
        },
        {
          text: "Overview",
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
          text: "Specification",
          link: "https://spec.hmpl-lang.dev/"
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
          text: "Vite Plugin",
          link: "vite-plugin.md"
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
              text: "Security",
              link: "security.md"
            },
            {
              text: "GitHub repository with examples",
              link: "github-repository-with-examples.md"
            },
            {
              text: "Server-side rendering",
              link: "server-side-rendering.md"
            },
            {
              text: "Migration from v2 to v3 version",
              link: "migration-from-v2-to-v3-version.md"
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
    [
      "meta",
      {
        property: "og:description",
        content:
          "Server-oriented customizable templating for JavaScript. Apply SSR, SSG, ISG without robot indexing on any sites without Next.js, Remix, Nuxt.js! Also, HMPL can be a great alternative to popular tools such as HTMX and Alpine.js."
      }
    ],
    [
      "meta",
      {
        property: "og:image",
        content: "/images/og-image.png"
      }
    ],
    [
      "meta",
      {
        name: "keywords",
        content:
          "javascript, fetch, html, template-engine, rest, ssr, templates, templating, template-language, server-side-rendering, static-site-generation, template-engines, fetch-api, server-side, typescipt, ssg, template-engine-html, isg, hmpl, incremental-static-generation, language, template"
      }
    ]
  ],
  bundler: viteBundler()
});
