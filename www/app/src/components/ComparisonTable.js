export default {
  name: "ComparisonTable",
  data() {
    return {
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
    }
  }
};
