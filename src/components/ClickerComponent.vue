<template>
  <div id="wrapper">
    <div>
      <div>
        <div class="form-example">
          <button data-action="increment" id="btn" @click="handleClick">
            Click!
          </button>
        </div>
        <div class="form-example">
          Clicks: <span v-if="clicks > 0" v-html="clicksHtml"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const clicks = ref(0);
const clicksHtml = ref(`${clicks.value}`);

const handleClick = () => {
  clicks.value++;
  clicksHtml.value = `${clicks.value}`;
};
</script>
