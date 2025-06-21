import { computed, defineComponent, h } from "vue";

export default defineComponent({
  name: "SocialLink",

  setup() {
    const twitterLink = computed(() => "https://x.com/hmpljs");
    const discordLink = computed(() => "https://discord.com/invite/KFunMep36n");

    const twitterIcon = computed(
      () =>
        `<svg width="35" height="32" viewBox="0 0 35 32" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:1.25rem;height:1.25rem;vertical-align:middle"> <path d="M26.897 0H32.3288L20.4026 13.5793L34.3362 32H23.4018L14.841 20.8059L5.04022 32H-0.391519L12.2432 17.476L-1.10001 0H10.1059L17.8402 10.2258L26.897 0ZM24.9959 28.8118H28.007L8.52361 3.07011H5.28819L24.9959 28.8118Z" fill="currentColor"></path> </svg>`
    );
    const discordIcon = computed(
      () =>
        `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:1.25rem;height:1.25rem;vertical-align:middle;"><path fill="currentColor" d="M13.545 2.907a13.2 13.2 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.2 12.2 0 0 0-3.658 0 8 8 0 0 0-.412-.833.05.05 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.04.04 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032q.003.022.021.037a13.3 13.3 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019q.463-.63.818-1.329a.05.05 0 0 0-.01-.059l-.018-.011a9 9 0 0 1-1.248-.595.05.05 0 0 1-.02-.066l.015-.019q.127-.095.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.05.05 0 0 1 .053.007q.121.1.248.195a.05.05 0 0 1-.004.085 8 8 0 0 1-1.249.594.05.05 0 0 0-.03.03.05.05 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.2 13.2 0 0 0 4.001-2.02.05.05 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.03.03 0 0 0-.02-.019m-8.198 7.307c-.789 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612m5.316 0c-.788 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612"/></svg>`
    );

    return () =>
      h(
        "div",
        { class: "vp-nav-item vp-action" },
        [
          h("a", {
            class: "vp-action-link",
            href: twitterLink.value,
            target: "_blank",
            rel: "noopener noreferrer",
            "aria-label": "Twitter",
            innerHTML: twitterIcon.value
          }),
          h("a", {
            class: "vp-action-link",
            href: discordLink.value,
            target: "_blank",
            rel: "noopener noreferrer",
            "aria-label": "Discord",
            innerHTML: discordIcon.value
          })
        ]
      );
  },
});
