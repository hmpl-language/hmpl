<template>
  <button
    class="scroll-to-top"
    v-show="showScroll"
    @click="scrollToTop"
    aria-label="Scroll to top"
  >
    <i class="fas fa-arrow-up" aria-hidden="true"></i>
  </button>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const showScroll = ref(false);
let faLink = null;

const scrollToTop = () => {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  window.scrollTo(
    prefersReducedMotion ? { top: 0 } : { top: 0, behavior: "smooth" }
  );
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

  transition: transform 0.15s ease;
}

.scroll-to-top i {
  font-size: 18px;
}

.scroll-to-top:active {
  transform: scale(0.95);
}

@media (min-width: 768px) {
  .scroll-to-top {
    display: none;
  }
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
