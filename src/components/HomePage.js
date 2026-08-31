import axios from "axios";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import ComparisonTable from "./ComparisonTable.vue";
import Statistics from "./Statistics.vue";
import { codeToHtml } from "shiki";

export default {
  name: "HomePage",
  components: {
    ComparisonTable,
    Statistics
  },

  data() {
    return {
      showScroll: false,
      // Shiki-highlighted code snippets for the comparison cards
      highlightedCode: "",
      alpineHighlightedCode: "",
      hmplHighlightedCode: ""
    };
  },

  methods: {
    copyText(text) {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard
          .writeText(text)
          .then(() => {
            toastr.success("Successfully copied!", "Success", {
              positionClass: "toast-bottom-center",
              timeOut: 2000,
              progressBar: true
            });
          })
          .catch(() => {
            this.fallbackCopyText(text);
          });
      } else {
        this.fallbackCopyText(text);
      }
    },

    fallbackCopyText(text) {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.left = "-9999px";
      document.body.appendChild(textArea);
      textArea.select();

      try {
        document.execCommand("copy");
        toastr.success("Successfully copied!", "Success", {
          positionClass: "toast-bottom-center",
          timeOut: 2000,
          progressBar: true
        });
      } catch (err) {
        toastr.error("Error copying text", "Try again", {
          positionClass: "toast-bottom-center"
        });
      } finally {
        document.body.removeChild(textArea);
      }
    },

    scrollToTop() {
      try {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch {
        window.scrollTo(0, 0);
      }
    },

    async initShiki() {
      const [htmxHtml, alpineHtml, hmplHtml] = await Promise.all([
        codeToHtml(
          `<button
  hx-get="/api/profile"
  hx-target="#out"
  hx-indicator="#load"
  hx-on="htmx:responseError: 
    if(event.detail.xhr.status===401) err.hidden=false">
  Load
</button>

<span id="load" hidden>Loading…</span>
<div id="err" hidden>401 Unauthorized</div>
<div id="out"></div>
`,
          {
            lang: "html",
            theme: "min-light"
          }
        ),
        codeToHtml(
          `<div x-data="{l:false,e:false,r:null}">
  <button @click="
    l=true; e=false;
    fetch('/api/profile').then(x=>{
      if(x.status===401) e=true; else return x.json()
    }).then(j=>r=j).finally(()=>l=false)
  ">Load</button>

  <span x-show="l">Loading…</span>
  <div x-show="e">401 Unauthorized</div>
  <div x-text="r?.name"></div>
</div>
`,
          {
            lang: "html",
            theme: "min-light"
          }
        ),
        codeToHtml(
          `<template data-hmpl>
  <div>
    <button id="btn">Load</button>

    {{#request src="/api/profile" after="click:#btn"}}
      {{#indicator trigger="pending"}}
        <span>Loading...</span>
      {{/indicator}}

      {{#indicator trigger="401"}}
        <span>401 Unauthorized</span>
      {{/indicator}}
    {{/request}}
  </div>
</template>
`,
          {
            lang: "html",
            theme: "min-light"
          }
        )
      ]);

      this.highlightedCode = htmxHtml;
      this.alpineHighlightedCode = alpineHtml;
      this.hmplHighlightedCode = hmplHtml;
    }
  },

  mounted() {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://unpkg.com/@fortawesome/fontawesome-free@5.15.4/css/all.min.css";
    link.integrity =
      "sha384-DyZ88mC6Up2uqS4h/KRgHuoeGwBcD4Ng9SiP4dIRy0EXTlnuz47vAwmeGwVChigm";
    link.crossOrigin = "anonymous";
    document.head.appendChild(link);

    const chart = document.getElementById("comparisonChart");
    const progressBars = chart?.querySelectorAll(".progress-bar") || [];

    const animateProgressBars = () => {
      progressBars.forEach((bar) => {
        const wrapper = bar.closest(".progress-bar-wrapper");
        const width = parseInt(bar.dataset.width, 10);

        bar.style.width = width + "%";

        setTimeout(() => {
          if (width >= 50) {
            wrapper?.classList.add("full");
          }
        }, 1500);
      });
    };

    if (chart) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              animateProgressBars();
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );
      observer.observe(chart);
    }

    const contributorsGrid = document.querySelector(".contributors-grid");

    // Function to fetch all contributors with pagination
    const fetchAllContributors = async () => {
      const allContributors = [];
      let page = 1;
      let hasMore = true;

      while (hasMore) {
        try {
          const url = `https://api.github.com/repos/hmpl-language/hmpl/contributors?page=${page}&per_page=100`;
          const response = await axios.get(url);

          if (response.data.length === 0) {
            hasMore = false;
          } else {
            allContributors.push(...response.data);
            page++;
          }
        } catch (error) {
          console.error(`Error fetching contributors page ${page}:`, error);
          hasMore = false;
        }
      }

      return allContributors;
    };

    // Fetch and display all contributors
    fetchAllContributors()
      .then((contributors) => {
        contributors.forEach((contributor) => {
          const contributorDiv = document.createElement("div");
          contributorDiv.className = "contributor";
          contributorDiv.innerHTML = `
        <a class="contribution-block" href="${contributor.html_url}" target="_blank">
            <img
              src="/images/ellipse_5.png"
              alt="Background circle 1"
              class="contribution-ellipse"
            />
            <img
              class="contributor-avatar"
              src="${contributor.avatar_url}"
              alt="User avatar"
            />
            <span class="contributor-name">${contributor.login}</span>
        </a>`;
          contributorsGrid.appendChild(contributorDiv);
        });

        const oldContributors = document.createElement("div");
        oldContributors.className = "contributor";
        oldContributors.innerHTML = `
          <a class="contribution-block" href="https://github.com/hmpl-language/hmpl/discussions/2" target="_blank">
            <img
              src="/images/ellipse_5.png"
              alt="Background circle 1"
              class="contribution-ellipse"
            />
            <img
              class="contributor-avatar"
              src="./images/old-contributors.png"
              alt="Your avatar"
            />
        <span class="contributor-name">Old contributors</span></a>`;
        contributorsGrid.appendChild(oldContributors);

        const additionalContributor = document.createElement("div");
        additionalContributor.className = "contributor";
        additionalContributor.innerHTML = `
        <div class="contribution-block">
          <img
            src="/images/ellipse_5.png"
            alt="Background circle 1"
            class="contribution-ellipse"
          />
          <img
            class="contributor-avatar"
            src="./images/you_contributor.png"
            alt="Your avatar"
          />
          <span class="contributor-name">And you</span>
        </div>`;
        contributorsGrid.appendChild(additionalContributor);
      })
      .catch((error) => {
        console.error("Error fetching contributors:", error);
      });

    this.initShiki();

    this._handleScroll = () => {
      this.showScroll = window.pageYOffset > 300;
    };
    this._handleScroll();
    window.addEventListener("scroll", this._handleScroll);
  },

  beforeDestroy() {
    window.removeEventListener("scroll", this._handleScroll);
  },

  beforeUnmount() {
    window.removeEventListener("scroll", this._handleScroll);
  }
};
