<template>
  <div id="wrapper">
    <div>
      <form @submit.prevent="switchComponent1" id="form">
        <div class="form-example">
          <label for="login">Login: </label>
          <input
            v-model="login"
            type="text"
            name="login"
            id="login"
            required
          /><br />
          <label for="password">Password: </label>
          <input
            v-model="password"
            type="password"
            name="password"
            id="password"
            required
          />
        </div>
        <div class="form-example">
          <input type="submit" value="Register!" />
        </div>
      </form>
      <p><component :is="currentComponent1"></component></p>
    </div>
  </div>
</template>

<script setup>
import { createCommentVNode, h, ref } from "vue";
const login = ref("");
const password = ref("");
const els1 = [createCommentVNode("hmpl1"), h("div", "Loading...")];
const Comment1 = (_, ctx) => els1[0];
const Loading1 = (_, ctx) => els1[1];
const currentComponent1 = ref(Comment1);
const switchComponent1 = () => {
  const isComment = currentComponent1.value === Comment1;
  if (isComment) {
    currentComponent1.value = Loading1;
    setTimeout(() => {
      currentComponent1.value = h("span", `Hello, ${login.value}!`);
      login.value = "";
      password.value = "";
    }, 300);
  }
};
</script>
