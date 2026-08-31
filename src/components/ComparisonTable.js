export default {
  name: "ComparisonTable",
  data() {
    return {
      currentSlide: 0,
      totalSlides: 3, // Slides: 0-1, 1-2, 2-3 (showing 2 columns at a time)
      features: [
        {
          name: "Bundle Size (gzipped)",
          hmpl: "~24KB",
          alpine: "~19KB",
          htmx: "~14KB"
        },
        {
          name: "Fetch API support",
          hmpl: true,
          alpine: true,
          htmx: false
        },
        {
          name: "Support for modern ECMAScript features (related to Fetch)",
          hmpl: "Fully",
          alpine: "Partially",
          htmx: "Partially"
        },
        {
          name: "Support for HTTP methods OPTIONS and TRACE",
          hmpl: true,
          alpine: true,
          htmx: false
        },
        {
          name: "RequestInit Customization",
          hmpl: "Fully",
          alpine: "Partially",
          htmx: "Partially"
        },
        {
          name: "XSS Protection",
          hmpl: "Fully",
          alpine: "Partially",
          htmx: "Partially"
        },
        {
          name: "EventListener support on attributes",
          hmpl: true,
          alpine: true,
          htmx: true
        },
        {
          name: "Interacting with the server",
          hmpl: "Fully",
          alpine: "Partially",
          htmx: "Fully"
        }
      ]
    };
  },
  methods: {
    getValueClass(value) {
      if (typeof value === "boolean") {
        return value ? "check" : "cross";
      }
      if (typeof value === "string") {
        if (
          value.includes("KB") ||
          value.includes("Fully") ||
          value.includes("true")
        ) {
          return "highlighted";
        }
        if (value.includes("Partially") || value.includes("Server-side")) {
          return "neutral";
        }
      }
      return "neutral";
    },

    scrollToSlide() {
      const container = this.$refs.tableContainer;
      if (!container) return;

      const grid = container.querySelector(".columns-grid");
      if (!grid) return;

      const columnWidth = grid.children[0].offsetWidth;
      const gap = parseInt(getComputedStyle(grid).gap) || 0;

      const step = columnWidth + gap;

      container.scrollTo({
        left: step * this.currentSlide,
        behavior: "smooth"
      });
    },

    nextSlide() {
      if (this.currentSlide < this.totalSlides - 1) {
        this.currentSlide++;
        this.scrollToSlide();
      }
    },

    prevSlide() {
      if (this.currentSlide > 0) {
        this.currentSlide--;
        this.scrollToSlide();
      }
    },

    goToSlide(index) {
      if (index >= 0 && index < this.totalSlides) {
        this.currentSlide = index;
        this.scrollToSlide();
      }
    },

    isFirstSlide() {
      return this.currentSlide === 0;
    },

    isLastSlide() {
      return this.currentSlide === this.totalSlides - 1;
    }
  }
};
