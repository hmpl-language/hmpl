<template>
  <div id="wrapper">
    <div>
      <div>
        <div class="form-example">
          <button id="btn" @click="handleClick">Click!</button>
        </div>
        <div class="form-example">
          <span v-if="requestSent">Request sent!</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const requestSent = ref(false);

const handleClick = () => {
  if (!requestSent.value) {
    requestSent.value = true;
  }
};
</script>
