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
  background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
  padding: 40px;
  margin: 120px 0;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
}

.comparison-header {
  text-align: center;
  margin-bottom: 40px;
}

.comparison-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 10px;
}

.comparison-subtitle {
  font-size: 1.1rem;
  color: #6b7280;
  margin: 0;
}

.table-container {
  overflow-x: auto;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  margin: 0 auto;
  max-width: 100%;
  width: fit-content;
}

.comparison-table {
  border-collapse: separate;
  border-spacing: 0;
  background: white;
  border-radius: 12px;
  overflow: hidden;
}

.comparison-table th,
.comparison-table td {
  padding: 16px 20px;
  text-align: left;
  border-bottom: 1px solid #e5e7eb;
}

/* Rounded corners for table */
.comparison-table thead tr:first-child th:first-child {
  border-top-left-radius: 12px;
}

.comparison-table thead tr:first-child th:last-child {
  border-top-right-radius: 12px;
}

.comparison-table tbody tr:last-child td:first-child {
  border-bottom-left-radius: 12px;
}

.comparison-table tbody tr:last-child td:last-child {
  border-bottom-right-radius: 12px;
}

.comparison-table th {
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  font-weight: 600;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #374151;
}

.feature-column {
  width: 200px;
  font-weight: 600;
  color: #1f2937;
}

.framework-column {
  width: 190px;
  text-align: center;
}

.framework-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-weight: 600;
  color: #1f2937;
}

.framework-logo {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  padding: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.framework-logo img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/* Логотипы теперь имеют белый фон с изображениями */

.feature-row:hover {
  background-color: #f9fafb;
}

.feature-name {
  font-weight: 500;
  color: #374151;
}

.feature-value {
  text-align: center;
  font-weight: 500;
}

.feature-value.check {
  color: #059669;
}

.feature-value.cross {
  color: #dc2626;
}

.feature-value.positive {
  color: #059669;
  font-weight: 600;
}

.feature-value.neutral {
  color: #6b7280;
}

.comparison-footer {
  margin-top: 30px;
  text-align: center;
  display: flex;
  flex-direction: column;
}

.comparison-note {
  color: #6b7280;
  font-size: 0.9rem;
  margin: 0;
  display: inline-block;
  align-items: center;
  justify-content: center;
}

.comparison-note i {
  color: #3b82f6;
}

.metrics-link {
  color: #3b82f6;
  text-decoration: underline;
  margin-left: 4px;
}

.metrics-link:hover {
  text-decoration: none;
}

.comparison-note i{
  margin-right: 4px;
}

/* Responsive Design */
@media (max-width: 768px) {
  .comparison-table-wrapper {
    padding: 20px;
    margin: 40px 0;
  }
  
  .comparison-title {
    font-size: 2rem;
  }
  
  .comparison-table th,
  .comparison-table td {
    padding: 12px 8px;
    font-size: 0.85rem;
  }
  
  .feature-column {
    width: 120px;
  }
  
  .framework-column {
    width: 100px;
  }
  
  .framework-header {
    flex-direction: column;
    gap: 4px;
  }
  
  .framework-logo {
    width: 24px;
    height: 24px;
  }
}

@media (max-width: 480px) {
  .comparison-table-wrapper {
    padding: 15px;
  }
  
  .comparison-title {
    font-size: 1.5rem;
  }
  
  .comparison-subtitle {
    font-size: 1rem;
  }
  
  .comparison-table th,
  .comparison-table td {
    padding: 8px 4px;
    font-size: 0.8rem;
  }
  
  .feature-column {
    width: 100px;
  }
  
  .framework-column {
    width: 80px;
  }
}
</style>
