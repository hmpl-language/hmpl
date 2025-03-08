import { defineComponent, ref, onMounted, h } from "vue";
import axios from "axios";

export default defineComponent({
  name: "GitHubStars",

  setup() {
    const starsCount = ref(null);

    const fetchStars = async () => {
      try {
        const response = await axios.get(
          "https://api.github.com/repos/hmpl-language/hmpl"
        );
        starsCount.value = response.data.stargazers_count;
      } catch (error) {
        console.error("Failed to fetch GitHub stars:", error);
      }
    };

    onMounted(() => {
      fetchStars();
    });

    return () =>
      h(
        "a",
        {
          class: "github-stars",
          target: "_blank",
          rel: "nooferer noopener",
          href: "https://github.com/hmpl-language/hmpl/graphs/contributors"
        },
        [
          h(
            "svg",
            {
              class: "star",
              width: "36",
              height: "35",
              viewBox: "0 0 36 35",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg"
            },
            [
              h("path", {
                d: "M17.0772 1.21105C17.4193 0.391279 18.5807 0.391279 18.9228 1.21105L23.0672 11.1406C23.2113 11.4858 23.536 11.7217 23.9089 11.7521L34.6331 12.6252C35.5185 12.6973 35.8774 13.8019 35.2035 14.3806L27.0406 21.3905C26.7568 21.6342 26.6328 22.016 26.7191 22.38L29.2027 32.8491C29.4077 33.7135 28.4681 34.3961 27.7095 33.934L18.5202 28.3368C18.2007 28.1422 17.7993 28.1422 17.4798 28.3368L8.29051 33.934C7.53186 34.3961 6.59228 33.7135 6.79732 32.8491L9.28088 22.38C9.36723 22.016 9.24319 21.6342 8.95938 21.3905L0.796525 14.3806C0.122612 13.8019 0.481499 12.6973 1.36687 12.6252L12.0911 11.7521C12.464 11.7217 12.7887 11.4858 12.9328 11.1406L17.0772 1.21105Z",
                fill: "#3c3c43c7"
              })
            ]
          ),
          h(
            "a",
            {
              class: "number-of-stars",
              href: "https://github.com/hmpl-language/hmpl/stargazers",
              target: "_blank",
              rel: "noopener noreferrer",
              "aria-label": "Stars"
            },
            starsCount.value !== null ? starsCount.value : "..."
          )
        ]
      );
  }
});
