<template>
  <div id="wrapper">
    <div>
      <div>
        <div class="form-example">
          <button id="btn" @click="startTimer">Start timer</button>
        </div>
        <div class="form-example">
          Seconds: <span v-if="seconds > 0">{{ seconds }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const seconds = ref(0);
const timerActive = ref(false);
let intervalId = null;

const startTimer = () => {
  if (timerActive.value || seconds.value >= 10) return;
  timerActive.value = true;
  intervalId = setInterval(() => {
    seconds.value++;
    if (seconds.value >= 10) {
      clearInterval(intervalId);
      timerActive.value = false;
    }
  }, 1000);
};
</script>
