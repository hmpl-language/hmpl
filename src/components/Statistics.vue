<template>
  <div class="stats-wrapper">
    <div class="stats-container">
      <div class="stat-item">
        <div class="stat-bar bar-downloads"></div>
        <div class="info">
          <div class="value">{{ npmDownloads }}</div>
          <div class="label">NPM Downloads (18 months)</div>
        </div>
      </div>
      <div class="stat-item">
        <div class="stat-bar bar-contributors"></div>
        <div class="info">
          <div class="value">{{ contributors }}</div>
          <div class="label">Contributors on GitHub</div>
        </div>
      </div>
      <div class="stat-item">
        <div class="stat-bar bar-dependents"></div>
        <div class="info">
          <div class="value">{{ dependents }}</div>
          <div class="label">Dependents on GitHub</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "./Statistics.css";
import StatisticsScript from "./Statistics.js";

export default StatisticsScript;
</script>

<style scoped></style>
