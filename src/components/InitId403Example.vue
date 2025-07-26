<template>
  <div>
    <button id="btn" @click="handleClick">Take a component with an API!</button>
    <div v-if="status === 'pending'">
      <p>Loading...</p>
    </div>
    <div v-else-if="status === 403">
      <p>Access error!</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const status = ref(null);
const handleClick = () => {
  status.value = "pending";
  setTimeout(() => {
    status.value = 403;
  }, 1000);
};
</script>
