<template>
  <div class="stats-wrapper">
    <div class="stats-container">
      <div class="stat-item">
        <img
          src="/images/NPM.svg"
          class="item-image test"
          alt="npm downloads"
        />
        <div class="info">
          <div class="value">{{ npmDownloads }}</div>
          <div class="label">NPM Downloads (18 months)</div>
        </div>
      </div>
      <div class="stat-item">
        <img
          src="/images/contributor.svg"
          class="item-image"
          alt="contributors"
        />
        <div class="info">
          <div class="value">{{ contributors }}</div>
          <div class="label">Contributors on GitHub</div>
        </div>
      </div>
      <div class="stat-item">
        <img
          src="/images/black-open-box.png"
          class="item-image"
          alt="dependents"
        />
        <div class="info">
          <div class="value">{{ dependents }}</div>
          <div class="label">Dependents on GitHub</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
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
</script>

<style scoped>
.stats-wrapper {
  width: 100%;
  margin: 5rem 0;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.test {
  margin-top: 6px;
}
.info {
  margin-top: 6px;
}
.stats-container {
  width: 100%;
  max-width: 1100px;
  padding: 0.8rem 1.25rem 1.5rem;
  background: #f7f7f7;
  border-radius: 20px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.06);
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  align-items: center;
  text-align: left;
  min-height: 120px;
}

.stat-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 0 !important;
}

.item-image {
  width: 60px;
  height: 60px;
  opacity: 0.75;
  filter: grayscale(1);
}

.value {
  font-size: 1.5rem;
  font-weight: 600;
  color: #2b2b2b;
}

.label {
  font-size: 0.95rem;
  opacity: 0.7;
  margin-top: 0;
  color: #5c5c5c;
}

@media (max-width: 900px) {
  .stats-wrapper {
    height: auto;
    padding: 1rem 0;
    margin: 4rem 0;
  }

  .stats-container {
    grid-template-columns: repeat(2, 1fr);
    padding: 1rem;
    gap: 1rem;
  }

  .stat-item {
    justify-content: flex-start;
  }

  .item-image {
    width: 56px;
    height: 56px;
  }

  .value {
    font-size: 1.35rem;
  }
}

@media (max-width: 540px) {
  .stats-wrapper {
    margin: 4rem 0 2rem;
  }

  .stats-container {
    grid-template-columns: 1fr;
    padding: 0.85rem 1rem 1rem;
  }

  .stat-item {
    gap: 0.75rem;
  }

  .item-image {
    width: 48px;
    height: 48px;
  }

  .value {
    font-size: 1.25rem;
  }

  .label {
    font-size: 0.9rem;
  }
}
</style>
