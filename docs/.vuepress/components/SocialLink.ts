import { computed, defineComponent, h } from "vue";

export default defineComponent({
  name: "SocialLink",

  setup() {
    const link = computed(() => "https://x.com/hmpljs");
    const icon = computed(
      () =>
        `<svg width="35" height="32" viewBox="0 0 35 32" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:1.25rem;height:1.25rem;vertical-align:middle"> <path d="M26.897 0H32.3288L20.4026 13.5793L34.3362 32H23.4018L14.841 20.8059L5.04022 32H-0.391519L12.2432 17.476L-1.10001 0H10.1059L17.8402 10.2258L26.897 0ZM24.9959 28.8118H28.007L8.52361 3.07011H5.28819L24.9959 28.8118Z" fill="currentColor"></path> </svg>`
    );

    return () =>
      h(
        "div",
        { class: "vp-nav-item vp-action" },
        h("a", {
          class: "vp-action-link",
          href: link.value,
          target: "_blank",
          rel: "noopener noreferrer",
          "aria-label": "twitter",
          innerHTML: icon.value,
        })
      );
  },
});
