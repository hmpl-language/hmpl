import SocialLink from "./components/SocialLink.js";
import GitHubStars from "./components/GitHubStars.js";
import { defineClientConfig } from "vuepress/client";

export default defineClientConfig({
  enhance: ({ app }) => {
    app.component("SocialLink", SocialLink);
    app.component("GitHubStars", GitHubStars);
  },
});
