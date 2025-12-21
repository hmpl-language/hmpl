<template>
  <div class="comparison-table-wrapper">
    <div class="comparison-header">
      <h2 class="comparison-title">What makes it different from others?</h2>
      <p class="comparison-subtitle">
        See how HMPL.js compares to similar projects
      </p>
    </div>

    <div class="table-container">
      <!-- Header row -->
      <div class="columns-grid comparison-grid-header">
        <div class="column-header column-header-feature">
          <div class="column-header-content">Feature</div>
        </div>
        <div class="column-header column-header-hmpl">
          <div class="column-header-content">
            <div class="framework-header">
              <div class="framework-logo">
                <img src="/images/logo_new.svg" alt="HMPL" />
              </div>
              <span>HMPL.js</span>
            </div>
          </div>
        </div>
        <div class="column-header">
          <div class="column-header-content">
            <div class="framework-header">
              <div class="framework-logo">
                <img
                  src="https://avatars.githubusercontent.com/u/59030169?s=200&v=4"
                  alt="Alpine.js"
                />
              </div>
              <span>Alpine.js</span>
            </div>
          </div>
        </div>
        <div class="column-header">
          <div class="column-header-content">
            <div class="framework-header">
              <div class="framework-logo">
                <img
                  src="https://raw.githubusercontent.com/bigskysoftware/htmx/master/www/static/img/htmx_logo.1.png"
                  alt="HTMX"
                />
              </div>
              <span>HTMX</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Body rows: each row is a grid of 4 cells so heights match -->
      <div
        v-for="feature in features"
        :key="feature.name"
        class="columns-grid comparison-grid-row"
      >
        <div class="column-cell feature-name">
          {{ feature.name }}
        </div>

        <div
          class="column-cell feature-value hmpl-value"
          :class="getValueClass(feature.hmpl)"
        >
          <span v-if="typeof feature.hmpl === 'boolean'">
            <svg
              v-if="feature.hmpl"
              width="21"
              height="15"
              viewBox="0 0 21 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.98646 14.7094L0 7.72292L1.47292 6.25L6.98646 11.7635L18.75 0L20.2229 1.47292"
                fill="url(#paint0_linear_42_247)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_42_247"
                  x1="10.1115"
                  y1="0"
                  x2="10.1115"
                  y2="14.7094"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#0183FF" />
                  <stop offset="1" stop-color="#9747FF" />
                </linearGradient>
              </defs>
            </svg>
            <svg
              v-else
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M0 18.1812L1.81875 20L10 11.8188L18.1812 20L20 18.1812L11.8188 10L20 1.81875L18.1812 0L10 8.18125L1.81875 0L0 1.81875L8.18125 10L0 18.1812Z"
                fill="#EE3434"
              />
            </svg>
          </span>
          <span v-else>{{ feature.hmpl }}</span>
        </div>

        <div
          class="column-cell feature-value alpine-value"
          :class="getValueClass(feature.alpine)"
        >
          <span v-if="typeof feature.alpine === 'boolean'">
            <svg
              v-if="feature.alpine"
              width="21"
              height="15"
              viewBox="0 0 21 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.98646 14.7094L0 7.72292L1.47292 6.25L6.98646 11.7635L18.75 0L20.2229 1.47292"
                fill="url(#paint0_linear_42_247)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_42_247"
                  x1="10.1115"
                  y1="0"
                  x2="10.1115"
                  y2="14.7094"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#0183FF" />
                  <stop offset="1" stop-color="#9747FF" />
                </linearGradient>
              </defs>
            </svg>
            <svg
              v-else
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M0 18.1812L1.81875 20L10 11.8188L18.1812 20L20 18.1812L11.8188 10L20 1.81875L18.1812 0L10 8.18125L1.81875 0L0 1.81875L8.18125 10L0 18.1812Z"
                fill="#EE3434"
              />
            </svg>
          </span>
          <span v-else>{{ feature.alpine }}</span>
        </div>

        <div
          class="column-cell feature-value htmx-value"
          :class="getValueClass(feature.htmx)"
        >
          <span v-if="typeof feature.htmx === 'boolean'">
            <svg
              v-if="feature.htmx"
              width="21"
              height="15"
              viewBox="0 0 21 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.98646 14.7094L0 7.72292L1.47292 6.25L6.98646 11.7635L18.75 0L20.2229 1.47292"
                fill="url(#paint0_linear_42_247)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_42_247"
                  x1="10.1115"
                  y1="0"
                  x2="10.1115"
                  y2="14.7094"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#0183FF" />
                  <stop offset="1" stop-color="#9747FF" />
                </linearGradient>
              </defs>
            </svg>
            <svg
              v-else
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M0 18.1812L1.81875 20L10 11.8188L18.1812 20L20 18.1812L11.8188 10L20 1.81875L18.1812 0L10 8.18125L1.81875 0L0 1.81875L8.18125 10L0 18.1812Z"
                fill="#EE3434"
              />
            </svg>
          </span>
          <span v-else>{{ feature.htmx }}</span>
        </div>
      </div>
    </div>
    <div class="comparison-footer">
      <p class="comparison-note">
        <svg
          class="note-image"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="8" cy="8" r="8" fill="#0183FF" />
          <path
            d="M8.01297 12.0536C7.47637 12.0536 7.03979 12.4902 7.03979 13.0268C7.03979 13.5634 7.47637 14 8.01297 14C8.54957 14 8.98614 13.5634 8.98614 13.0268C8.98614 12.4902 8.54957 12.0536 8.01297 12.0536ZM8.01297 13.5219C7.73999 13.5219 7.51787 13.2998 7.51787 13.0268C7.51787 12.7538 7.73997 12.5317 8.01297 12.5317C8.28597 12.5317 8.50806 12.7538 8.50806 13.0268C8.50806 13.2998 8.28594 13.5219 8.01297 13.5219Z"
            fill="white"
          />
          <path
            d="M8.0001 2C5.965 2 4.30933 3.65567 4.30933 5.69077C4.30933 6.22831 4.74665 6.66563 5.28419 6.66563C5.82172 6.66563 6.25904 6.22831 6.25904 5.69077C6.25904 4.73075 7.04008 3.94974 8.00008 3.94974C8.96008 3.94974 9.74111 4.73073 9.74111 5.69075C9.74111 6.65077 8.9601 7.43176 8.0001 7.43176C7.46256 7.43176 7.02524 7.86908 7.02524 8.40662V10.681C7.02524 11.2186 7.46256 11.6559 8.0001 11.6559C8.53764 11.6559 8.97496 11.2186 8.97496 10.681V9.25074C9.71026 9.04866 10.3742 8.61678 10.8607 8.02053C11.396 7.3644 11.6908 6.53698 11.6908 5.69075C11.6909 3.65567 10.0352 2 8.0001 2ZM8.68504 8.82997C8.57519 8.85392 8.49688 8.95114 8.49688 9.06355V10.6811C8.49688 10.955 8.27401 11.1778 8.0001 11.1778C7.72619 11.1778 7.50332 10.955 7.50332 10.6811V8.40664C7.50332 8.13273 7.72619 7.90986 8.0001 7.90986C9.22372 7.90986 10.2192 6.91438 10.2192 5.69077C10.2192 4.46717 9.22372 3.47164 8.0001 3.47164C6.77647 3.47164 5.78099 4.46715 5.78099 5.69075C5.78099 5.96466 5.55812 6.18753 5.28421 6.18753C5.01029 6.18753 4.78743 5.96466 4.78743 5.69075C4.78743 3.91927 6.22862 2.47808 8.0001 2.47808C9.77158 2.47808 11.2128 3.91927 11.2128 5.69073C11.2128 7.19049 10.1497 8.51075 8.68504 8.82997Z"
            fill="white"
          />
        </svg>
        These comparisons are based on two articles. For more details, see<a
          href="https://blog.hmpl-lang.dev/2025/05/03/best-alpinejs-alternative/"
          class="metrics-link"
          >about alpine</a
        >,<a
          href="https://blog.hmpl-lang.dev/2024/08/10/differences-between-hmpl-and-htmx/"
          class="metrics-link"
          >about htmx</a
        >.
      </p>
      <p class="comparison-note">
        <svg
          class="note-image"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="8" cy="8" r="8" fill="#0183FF" />
          <g clip-path="url(#clip0_70_443)">
            <path
              d="M3.2583 8.15021H5.48921C5.64453 8.15021 5.77046 8.27613 5.77046 8.43146V11.5094C5.77046 11.6647 5.64453 11.7906 5.48921 11.7906H3.2583C3.10298 11.7906 2.97705 11.6647 2.97705 11.5094V8.43146C2.97705 8.27613 3.10298 8.15021 3.2583 8.15021ZM5.20796 8.71271H3.53955V11.2281H5.20796V8.71271Z"
              fill="white"
            />
            <path
              d="M6.8252 7.203H9.0561C9.21143 7.203 9.33735 7.32893 9.33735 7.48425V11.5094C9.33735 11.6647 9.21143 11.7907 9.0561 11.7907H6.8252C6.66987 11.7907 6.54395 11.6647 6.54395 11.5094V7.48425C6.54395 7.32893 6.66987 7.203 6.8252 7.203ZM8.77485 7.76551H7.10645V11.2282H8.77485V7.76551Z"
              fill="white"
            />
            <path
              d="M10.3921 4.84595H12.623C12.7783 4.84595 12.9043 4.97187 12.9043 5.1272V11.5094C12.9043 11.6647 12.7783 11.7907 12.623 11.7907H10.3921C10.2368 11.7907 10.1108 11.6647 10.1108 11.5094V5.1272C10.1108 4.97187 10.2368 4.84595 10.3921 4.84595ZM12.3418 5.40845H10.6733V11.2282H12.3418V5.40845Z"
              fill="white"
            />
            <path
              d="M3.25582 7.40289C3.12295 7.48297 3.08015 7.65565 3.16023 7.78853C3.24032 7.9214 3.413 7.9642 3.54588 7.88412L10.024 3.96885C10.1568 3.88877 10.1996 3.71609 10.1195 3.58321C10.0395 3.45034 9.86677 3.40754 9.7339 3.48763L3.25582 7.40289Z"
              fill="white"
            />
            <path
              d="M8.08108 2.99592C7.9306 2.95891 7.7786 3.05089 7.74158 3.20137C7.70457 3.35186 7.79656 3.50386 7.94704 3.54087L9.53943 3.93351L9.14667 5.52624C9.10966 5.67672 9.20165 5.82872 9.35213 5.86573C9.50261 5.90274 9.65461 5.81076 9.69163 5.66028L10.1469 3.81401C10.1488 3.80798 10.1506 3.80183 10.1521 3.79557C10.1893 3.64476 10.0972 3.49234 9.94636 3.45517L8.08108 2.99592Z"
              fill="white"
            />
            <path
              d="M2.28125 11.2281H13.7188C13.8741 11.2281 14.0001 11.3541 14.0001 11.5094V12.7317C14.0001 12.8871 13.8741 13.013 13.7188 13.013H2.28125C2.12593 13.013 2 12.8871 2 12.7317V11.5094C2 11.3541 2.12593 11.2281 2.28125 11.2281ZM13.4376 11.7907H2.5625V12.4505H13.4376V11.7907Z"
              fill="white"
            />
          </g>
          <defs>
            <clipPath id="clip0_70_443">
              <rect
                width="12"
                height="12"
                fill="white"
                transform="translate(2 2)"
              />
            </clipPath>
          </defs>
        </svg>
        The project also has a comparison of the original sizes of applications.
        <a href="#comparisonChart" class="metrics-link"
          >See detailed metrics below</a
        >
      </p>
    </div>
  </div>
</template>

<script>
import "./ComparisonTable.css";
import ComparisonTableScript from "./ComparisonTable.js";

export default ComparisonTableScript;
</script>

<style scoped></style>
