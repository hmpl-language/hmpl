<template>
  <div class="stats-wrapper">
    <div class="stats-container">
      <div class="stat-item">
        <img src="/images/NPM.svg" class="svg-icon test" alt="npm downloads" />
        <div class="info">
          <div class="value">100</div>
          <div class="label">NPM Downloads</div>
        </div>
      </div>
      <div class="stat-item">
        <img src="/images/people-community.svg" class="svg-icon" alt="contributors" />
        <div class="info">
          <div class="value">54</div>
          <div class="label">Contributors on GitHub</div>
        </div>
      </div>
      <div class="stat-item">
        <img src="/images/black-open-box.png" class="svg-icon" alt="dependents" />
        <div class="info">
          <div class="value">1,204</div>
          <div class="label">Dependents on GitHub</div>
        </div>
      </div>

    </div>
  </div>
</template>

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
