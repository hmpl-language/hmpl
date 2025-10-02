<template>
  <div class="comparison-table-wrapper">
    <div class="comparison-header">
      <h2 class="comparison-title gradient_text_bottom">Framework Comparison</h2>
      <p class="comparison-subtitle">See how HMPL compares to other popular frameworks</p>
    </div>
    
    <div class="table-container">
      <table class="comparison-table">
        <thead>
          <tr>
            <th class="feature-column">Feature</th>
            <th class="framework-column hmpl-column">
              <div class="framework-header">
                <div class="framework-logo">H</div>
                <span>HMPL.js</span>
              </div>
            </th>
            <th class="framework-column alpine-column">
              <div class="framework-header">
                <div class="framework-logo">A</div>
                <span>Alpine.js</span>
              </div>
            </th>
            <th class="framework-column htmx-column">
              <div class="framework-header">
                <div class="framework-logo">H</div>
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
        <i class="fas fa-info-circle"></i>
        Bundle sizes are gzipped and minified. Data sourced from official documentation and bundle analyzers.
      </p>
      <p class="comparison-note">
        <i class="fas fa-chart-line"></i>
        In real applications, HMPL reduces bundle size by 1.67x compared to vanilla JS and 1.14x compared to Alpine.js.
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
          alpine: '~8.4KB',
          htmx: '~14.1KB'
        },
        {
          name: 'Learning Curve',
          hmpl: 'Medium',
          alpine: 'Easy',
          htmx: 'Easy'
        },
        {
          name: 'Server-Side Rendering',
          hmpl: true,
          alpine: false,
          htmx: true
        },
        {
          name: 'Client-Side Reactivity',
          hmpl: false,
          alpine: true,
          htmx: false
        },
        {
          name: 'No Build Step',
          hmpl: true,
          alpine: true,
          htmx: true
        },
        {
          name: 'JSON5 Integration',
          hmpl: true,
          alpine: false,
          htmx: false
        },
        {
          name: 'XSS Protection',
          hmpl: true,
          alpine: false,
          htmx: false
        },
        {
          name: 'Template Language',
          hmpl: true,
          alpine: false,
          htmx: false
        },
        {
          name: 'AJAX Requests',
          hmpl: true,
          alpine: false,
          htmx: true
        },
        {
          name: 'State Management',
          hmpl: 'Server-side',
          alpine: 'Client-side',
          htmx: 'Server-side'
        },
        {
          name: 'Use Case',
          hmpl: 'Server-oriented templating',
          alpine: 'Client-side interactivity',
          htmx: 'HTML enhancement'
        },
        {
          name: 'Performance',
          hmpl: 'High (server-side)',
          alpine: 'High (client-side)',
          htmx: 'High (server-side)'
        },
        {
          name: 'Community',
          hmpl: 'Growing',
          alpine: 'Large',
          htmx: 'Large'
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
        if (value.includes('KB') || value.includes('Easy') || value.includes('true')) {
          return 'positive'
        }
        if (value.includes('Medium') || value.includes('Server-side')) {
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
  border-radius: 20px;
  padding: 40px;
  margin: 60px 0;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
}

.comparison-table-wrapper::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #0183ff 0%, #7e71ba 100%);
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
}

.comparison-table {
  width: 100%;
  border-collapse: collapse;
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
  width: 150px;
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
  font-weight: 700;
  font-size: 1.1rem;
  color: white;
}

.hmpl-column .framework-logo {
  background: linear-gradient(135deg, #0183ff 0%, #7e71ba 100%);
}

.alpine-column .framework-logo {
  background: linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%);
}

.htmx-column .framework-logo {
  background: linear-gradient(135deg, #059669 0%, #10b981 100%);
}

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
}

.comparison-note {
  color: #6b7280;
  font-size: 0.9rem;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
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
    font-size: 0.9rem;
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
