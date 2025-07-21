<template>
  <div id="wrapper">
    <div>
      <div>
        <form @submit.prevent="switchComponent" id="form">
          <div class="form-example">
            <label for="login">User name: </label>
            <input
              v-model="login"
              type="text"
              name="login"
              id="login"
              required
            />
          </div>
          <div class="form-example">
            <input type="submit" value="Register!" />
          </div>
        </form>
        <p><component :is="currentComponent"></component></p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { createCommentVNode, h, ref } from "vue";
const login = ref("");
const els = [createCommentVNode("hmpl0"), h("div", "Loading...")];
const Comment = (_, ctx) => els[0];
const Loading = (_, ctx) => els[1];
const currentComponent = ref(Comment);
const switchComponent = () => {
  if (currentComponent.value === Comment) {
    currentComponent.value = Loading;
    setTimeout(() => {
      currentComponent.value = h("span", `Hello, ${login.value}!`);
      login.value = "";
    }, 300);
  }
};
</script>
