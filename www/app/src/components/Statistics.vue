<template>
  <div class="stats-wrapper">
    <div class="stats-container">
      <div class="stat-item">
        <img src="/images/NPM.svg" class="svg-icon test" alt="npm downloads" />
        <div class="info">
          <div class="value">{{ npmDownloads }}</div>
          <div class="label">NPM Downloads</div>
        </div>
      </div>
      <div class="stat-item">
        <img src="/images/people-community.svg" class="svg-icon" alt="contributors" />
        <div class="info">
          <div class="value">{{ contributors }}</div>
          <div class="label">Contributors on GitHub</div>
        </div>
      </div>
      <div class="stat-item">
        <img src="/images/black-open-box.png" class="svg-icon" alt="dependents" />
        <div class="info">
          <div class="value">{{ dependents }}</div>
          <div class="label">Dependents on GitHub</div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
const npmDownloads = ref('Fetching');
const contributors = ref('Fetching');
const dependents = ref('Fetching');
//for npm downloads
const fetchDownloads= async()=>{
  try {
    const response= await fetch('https://api.npmjs.org/downloads/point/last-week/hmpl-js');
    const data= await response.json();
    npmDownloads.value=data.downloads.toLocaleString();
  } catch(error){
    console.error('Error fetching NPM downlaods data:', error);
    npmDownloads.value='N/A';
  }
};

//for github cortributors and dependents
const fetchGitStats= async()=>{
  try {
    const contributorsResponse= await fetch('https://api.github.com/repos/hmpl-language/hmpl/contributors?per_page=1');
    const contributorsLink= contributorsResponse.headers.get('link');
    if (contributorsLink) {
      const match= contributorsLink.match(/&page=(\d+)>; rel="last"/);
      if (match) {
        contributors.value= match[1];
      }
    } else {
      const contributorsData= await contributorsResponse.json();
      contributors.value= contributorsData.length?.toString() || 'N/A';
    }
    const repoResponse= await fetch('https://api.github.com/repos/hmpl-language/hmpl');
    const repoData= await repoResponse.json();
    dependents.value= repoData.forks_count?.toLocaleString() || 'N/A';
  } catch (error) {
    console.error('Error fetching GitHub stats:', error);
    contributors.value= 'N/A';
    dependents.value= 'N/A';
  }
};
onMounted(async() => {
  await Promise.all([fetchDownloads(), fetchGitStats()]);
});
</script>

<style scoped>
.stats-wrapper {
  width: 100%;
  margin-top: 2.5rem;
}
.test{
    margin-top: 14px;
}
.info{
    margin-top:15px;
}
.stats-container {
  width: 100%;
  max-width: 1100px;
  padding: 2rem;
  background: #ffffff;
  border-radius: 20px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(0, 0, 0, 0.05);
  background: linear-gradient(13deg, #89b0ff 0%, #e4d8f3 60%);
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  align-items: center;
  text-align: center;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
}

.svg-icon {
  width: 90px;
  height: 90px;
  opacity: 0.9;
}

.value {
  font-size: 2rem;
  font-weight: 600;
}

.label {
  font-size: 1.2rem;
  opacity: 0.75;
  margin-top: 1px;
}
</style>
