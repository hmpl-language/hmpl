<template>
  <button
    class="scroll-to-top"
    :class="{ 'is-visible': showScroll }"
    :tabindex="showScroll ? 0 : -1"
    :aria-hidden="!showScroll"
    @click="scrollToTop"
    aria-label="Scroll to top"
    type="button"
  >
    <i class="fas fa-arrow-up" aria-hidden="true"></i>
  </button>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const showScroll = ref(false);
let faLink = null;

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
};

const handleScroll = () => {
  showScroll.value = window.scrollY > 300;
};

onMounted(() => {
  if (typeof window === "undefined") return;
  if (!document.querySelector("#fa-scroll-top")) {
    faLink = document.createElement("link");
    faLink.id = "fa-scroll-top";
    faLink.rel = "stylesheet";
    faLink.href =
      "https://unpkg.com/@fortawesome/fontawesome-free@5.15.4/css/all.min.css";
    faLink.integrity =
      "sha384-DyZ88mC6Up2uqS4h/KRgHuoeGwBcD4Ng9SiP4dIRy0EXTlnuz47vAwmeGwVChigm";
    faLink.crossOrigin = "anonymous";
    document.head.appendChild(faLink);
  }

  window.addEventListener("scroll", handleScroll);
  handleScroll();
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);

  if (faLink) {
    document.head.removeChild(faLink);
  }
});
</script>

<style scoped>
.scroll-to-top {
  position: fixed;
  right: 20px;
  bottom: 35px;

  width: 48px;
  height: 48px;

  border-radius: 50%;
  background: #0183ff;
  color: #ffffff;

  border: none;
  display: flex;
  align-items: center;
  justify-content: center;

  box-shadow: 0 6px 18px rgba(1, 131, 255, 0.22);
  cursor: pointer;
  z-index: 1200;

  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transform: translateY(12px);
  transition:
    opacity 0.25s ease,
    transform 0.25s ease,
    visibility 0s linear 0.25s !important;
}

.scroll-to-top.is-visible {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
  transform: translateY(0);
  transition:
    opacity 0.25s ease,
    transform 0.25s ease,
    visibility 0s linear 0s !important;
}

.scroll-to-top i {
  font-size: 18px;
}

.scroll-to-top.is-visible:hover {
  transform: translateY(-4px);
}

.scroll-to-top.is-visible:active {
  transform: scale(0.95);
}

@media (max-width: 600px) {
  .scroll-to-top {
    right: 14px;
    bottom: 30px;
    width: 44px;
    height: 44px;
  }
}
</style>
