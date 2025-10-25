<template>
  <div class="comparison-table-wrapper">
    <div class="comparison-header">
      <h2 class="comparison-title gradient_text_bottom">What makes it different from others?</h2>
      <p class="comparison-subtitle">See how HMPL.js compares to similar projects</p>
    </div>
    
    <div class="table-container">
      <table class="comparison-table">
        <thead>
          <tr>
            <th class="feature-column">Feature</th>
            <th class="framework-column hmpl-column">
              <div class="framework-header">
                <div class="framework-logo">
                  <img src="/images/logo_new.svg" alt="HMPL" />
                </div>
                <span>HMPL.js</span>
              </div>
            </th>
            <th class="framework-column alpine-column">
              <div class="framework-header">
                <div class="framework-logo">
                  <img src="https://avatars.githubusercontent.com/u/59030169?s=200&v=4" alt="Alpine.js" />
                </div>
                <span>Alpine.js</span>
              </div>
            </th>
            <th class="framework-column htmx-column">
              <div class="framework-header">
                <div class="framework-logo">
                  <img src="https://raw.githubusercontent.com/bigskysoftware/htmx/master/www/static/img/htmx_logo.1.png" alt="HTMX" />
                </div>
                <span>HTMX</span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="feature in features" :key="feature.name" class="feature-row">
            <td class="feature-name">{{ feature.name }}</td>
            <td class="feature-value hmpl-value" :class="getValueClass(feature.hmpl)">
              <span v-if="typeof feature.hmpl === 'boolean'">
                <i :class="feature.hmpl ? 'fas fa-check' : 'fas fa-times'"></i>
              </span>
              <span v-else>{{ feature.hmpl }}</span>
            </td>
            <td class="feature-value alpine-value" :class="getValueClass(feature.alpine)">
              <span v-if="typeof feature.alpine === 'boolean'">
                <i :class="feature.alpine ? 'fas fa-check' : 'fas fa-times'"></i>
              </span>
              <span v-else>{{ feature.alpine }}</span>
            </td>
            <td class="feature-value htmx-value" :class="getValueClass(feature.htmx)">
              <span v-if="typeof feature.htmx === 'boolean'">
                <i :class="feature.htmx ? 'fas fa-check' : 'fas fa-times'"></i>
              </span>
              <span v-else>{{ feature.htmx }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <div class="comparison-footer">
      <p class="comparison-note">
        <i class="fas fa-question-circle"></i>
        These comparisons are based on two articles. For more details, see<a href="https://blog.hmpl-lang.dev/2025/05/03/best-alpinejs-alternative/" class="metrics-link">about alpine</a>,<a href="https://blog.hmpl-lang.dev/2024/08/10/differences-between-hmpl-and-htmx/" class="metrics-link">about htmx</a>.
      </p>
      <p class="comparison-note">
        <i class="fas fa-chart-line"></i>
        The project also has a comparison of the original sizes of applications.
        <a href="#comparisonChart" class="metrics-link">See detailed metrics below</a>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ComparisonTable',
  data() {
    return {
      features: [
        {
          name: 'Bundle Size (gzipped)',
          hmpl: '~24KB',
          alpine: '~19KB',
          htmx: '~14KB'
        },
        {
          name: 'Fetch API support',
          hmpl: true,
          alpine: true,
          htmx: false
        },
        {
          name: 'Support for modern ECMAScript features (related to Fetch)',
          hmpl: "Fully",
          alpine: "Partially",
          htmx: "Partially",
        },
        {
          name: 'Support for HTTP methods OPTIONS and TRACE',
          hmpl: true,
          alpine: true,
          htmx: false
        },
        {
          name: 'RequestInit Customization',
          hmpl: "Fully",
          alpine: "Partially",
          htmx: "Partially",
        },
        {
          name: 'XSS Protection',
          hmpl: "Fully",
          alpine: "Partially",
          htmx: "Partially",
        },
        {
          name: 'EventListener support on attributes',
          hmpl: true,
          alpine: true,
          htmx: true
        },
        {
          name: 'Interacting with the server',
          hmpl: "Fully",
          alpine: "Partially",
          htmx: "Fully",
        }
      ]
    }
  },
  methods: {
    getValueClass(value) {
      if (typeof value === 'boolean') {
        return value ? 'check' : 'cross'
      }
      if (typeof value === 'string') {
        if (value.includes('KB') || value.includes('Fully') || value.includes('true')) {
          return 'positive'
        }
        if (value.includes('Partially') || value.includes('Server-side')) {
          return 'neutral'
        }
      }
      return 'neutral'
    }
  }
}
</script>

<style scoped>
.comparison-table-wrapper {
  background: #fff;
  padding: 20px 0;
  margin: 60px 0;
  position: relative;
}

.comparison-header {
  text-align: center;
  margin-bottom: 20px;
}

.comparison-title {
  font-size: 1.8rem;
  font-weight: 700;
  color: #111827;
}

.comparison-subtitle {
  font-size: 1rem;
  color: #6b7280;
  margin-top: 4px;
}

/* Table container */
.table-container {
  overflow-x: auto;
  margin: 0 auto;
  width: 100%;
  border-radius: 12px;
}

/* Clean minimalist table look */
.comparison-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.95rem;
  color: #111827;
  background: #fff;
}

/* Header styling */
.comparison-table th {
  text-align: left;
  padding: 12px 16px;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  font-size: 0.8rem;
  border-bottom: 1px solid #e5e7eb;
  background: #f9fafb;
}

/* Data cells */
.comparison-table td {
  padding: 14px 16px;
  border-bottom: 1px solid #f1f5f9;
  color: #1f2937;
  vertical-align: middle;
}

/* Hover effect like the first screenshot */
.comparison-table tbody tr:hover {
  background-color: #f9fafb;
}

/* Column widths */
.feature-column {
  width: 250px;
  font-weight: 500;
}

.framework-column {
  text-align: left;
  width: 200px;
}

/* Framework name + logo layout */
.framework-header {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 600;
  color: #111827;
}

.framework-logo {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.framework-logo img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/* Icons and text colors */
.feature-value.check i {
  color: #16a34a;
}

.feature-value.cross i {
  color: #dc2626;
}

.feature-value.positive {
  color: #16a34a;
  font-weight: 500;
}

.feature-value.neutral {
  color: #6b7280;
}

/* Footer */
.comparison-footer {
  margin-top: 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.comparison-note {
  color: #6b7280;
  font-size: 0.85rem;
}

.comparison-note i {
  color: #3b82f6;
  margin-right: 4px;
}

.metrics-link {
  color: #2563eb;
  text-decoration: underline;
  margin-left: 4px;
}

.metrics-link:hover {
  text-decoration: none;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .comparison-title {
    font-size: 1.5rem;
  }
  .comparison-table th,
  .comparison-table td {
    padding: 10px 8px;
    font-size: 0.85rem;
  }
}
</style>
