import { computed, defineComponent, h } from "vue";

export default defineComponent({
  name: "GitHubStars",

  setup() {
    return () =>
      h(
        "div",
        { class: "vp-nav-item vp-action" },
        h(
          "a",
          {
            class: "vp-action-link",
            href: "https://github.com/hmpl-language/hmpl/stargazers",
            target: "_blank",
            rel: "noopener noreferrer",
            "aria-label": "Stars",
          },
          [
            h("img", {
              alt: "GitHub Repo stars",
              style: "height:1.25rem;vertical-align:middle",
              src: "https://img.shields.io/github/stars/hmpl-language/hmpl?style=flat&label=Stars&color=ffffff&labelColor=ffffff",
            }),
          ]
        )
      );
  },
});
