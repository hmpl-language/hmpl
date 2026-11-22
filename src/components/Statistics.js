import { ref, onMounted } from "vue";

export default {
  name: "Statistics",
  setup() {
    const npmDownloads = ref("...");
    const contributors = ref("...");
    const dependents = ref("...");

    const fetchDownloads = async () => {
      try {
        const end = new Date();
        const start = new Date();
        start.setMonth(start.getMonth() - 18);

        const range = `${start.toISOString().slice(0, 10)}:${end
          .toISOString()
          .slice(0, 10)}`;

        const response = await fetch(
          `https://api.npmjs.org/downloads/range/${range}/hmpl-js`
        );

        const data = await response.json();

        const total = data.downloads?.reduce(
          (sum, d) => sum + (d.downloads || 0),
          0
        );

        npmDownloads.value = total?.toLocaleString() ?? "NaN";
      } catch (error) {
        console.error("Error fetching NPM downloads data:", error);
        npmDownloads.value = "NaN";
      }
    };

    const fetchGitStats = async () => {
      try {
        const contributorsResponse = await fetch(
          "https://api.github.com/repos/hmpl-language/hmpl/contributors?per_page=1"
        );
        const contributorsLink = contributorsResponse.headers.get("link");
        if (contributorsLink) {
          const match = contributorsLink.match(/&page=(\d+)>; rel="last"/);
          if (match) {
            contributors.value = match[1] - 1;
          }
        } else {
          const contributorsData = await contributorsResponse.json();
          contributors.value = contributorsData.length
            ? (contributorsData.length - 1).toString()
            : "NaN";
        }
        const repoResponse = await fetch(
          "https://api.github.com/repos/hmpl-language/hmpl"
        );
        const repoData = await repoResponse.json();
        dependents.value = repoData.forks_count?.toLocaleString() || "NaN";
      } catch (error) {
        console.error("Error fetching GitHub stats:", error);
        contributors.value = "NaN";
        dependents.value = "NaN";
      }
    };

    onMounted(async () => {
      await Promise.all([fetchDownloads(), fetchGitStats()]);
    });

    return {
      npmDownloads,
      contributors,
      dependents
    };
  }
};
