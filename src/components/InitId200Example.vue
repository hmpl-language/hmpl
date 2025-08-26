<template>
  <div>
    <button id="btn" @click="handleClick">Take a component with an API!</button>
    <div v-if="status === 'pending'">
      <p>Loading...</p>
    </div>
    <div v-else-if="status === 200">
      <p>HTML from server</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const status = ref(null);
const handleClick = () => {
  status.value = "pending";
  setTimeout(() => {
    status.value = 200;
  }, 1000);
};
</script>
