<template>
  <div id="wrapper">
    <div>
      <div>
        <div class="form-example">
          <button id="btn" @click="handleClick">Get HTML!</button>
        </div>
        <div class="form-example">
          <template v-if="status === 'pending'">
            <p>Loading...</p>
          </template>
          <template v-else-if="status === 403">
            <p>Access error!</p>
          </template>
          <template v-else-if="status === 200">
            <p>HTML from server</p>
          </template>
        </div>
      </div>
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
