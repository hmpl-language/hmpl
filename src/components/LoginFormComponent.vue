<template>
  <div>
    <form @submit.prevent="handleSubmit" id="form">
      <div class="form-example">
        <label for="login">Enter example login:</label>
        <input type="text" name="login" id="login" v-model="login" required />
      </div>
      <div class="form-example">
        <input type="submit" value="Submit!" />
      </div>
    </form>
    <div v-if="status === 'pending'">
      <p>Loading...</p>
    </div>
    <div v-else-if="status === 'subscribed'">
      <p>Submitted!</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const login = ref("");
const status = ref(null);

const handleSubmit = () => {
  status.value = "pending";
  setTimeout(() => {
    status.value = "subscribed";
    login.value = "";
  }, 1000);
};
</script>
