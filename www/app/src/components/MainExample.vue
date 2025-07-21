<template>
  <div id="wrapper">
    <div>
      <button @click="switchComponent" class="getHTML">Get HTML!</button>
      <component :is="currentComponent"></component>
    </div>
  </div>
</template>

<script setup>
import { createCommentVNode, h, ref } from "vue";
const els = [
  createCommentVNode("hmpl0"),
  h("div", "Loading..."),
  h("div", "HTML from server")
];
const Comment = (_, ctx) => els[0];
const Loading = (_, ctx) => els[1];
const HTMLFromServer = (_, ctx) => els[2];
const currentComponent = ref(Comment);
const switchComponent = () => {
  const isComment = currentComponent.value === Comment;
  if (isComment) {
    currentComponent.value = Loading;
    setTimeout(() => {
      currentComponent.value = HTMLFromServer;
    }, 300);
  }
};
</script>
