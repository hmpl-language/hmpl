<script>
import "./HomePage.css";
import Statistics from "./Statistics.vue";
import HomePageScript from "./HomePage.js";

export default HomePageScript;
</script>
<template>
  <section class="banner wrapper">
    <div class="container">
      <div class="banner_info">
        <div class="banner_content">
          <div class="banner_left">
            <p class="banner_brand">HMPL.js</p>
            <h1 class="banner_title">
              Server-oriented customizable templating for JavaScript
            </h1>
            <p class="banner_description">
              HMPL.js is a lightweight server-oriented template language for
              JavaScript. Fetch HTML, render it safely, and keep apps dynamic,
              modern, and small.
            </p>
            <div class="buttons">
              <a href="/getting-started" class="">Get Started</a>
              <a
                href="https://codesandbox.io/p/sandbox/basic-hmpl-example-dxlgfg"
                class=""
                rel="noreferrer noopener"
                target="_blank"
                >Demo Sandbox</a
              >
            </div>
          </div>
          <div class="banner_right">
            <img
              src="/images/banner_logo_background.png"
              alt="Logo background"
              class="banner_logo_background"
            />
            <div class="banner_logo">
              <img
                src="/images/logo_3d.png"
                alt="3D Logo"
                class="banner_image_logo"
              />
            </div>
          </div>
        </div>
        <!--
        <a
          href="https://www.producthunt.com/products/hmpl-js?embed=true&utm_source=badge-featured&utm_medium=badge&utm_source=badge-hmpl&#0045;js"
          target="_blank"
          class="producthunt"
          ><img
            src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=972730&theme=dark&t=1748847658573"
            alt="HMPL.js - Template language for displaying UI from server to client | Product Hunt"
            style="width: 250px; height: 54px"
            width="250"
            height="54"
        /></a> -->
      </div>
    </div>
  </section>
  <!-- Statistics block directly under banner -->
  <section class="stats wrapper">
    <div class="container">
      <Statistics />
    </div>
  </section>
  <!-- Code comparison block (HTMX / Alpine / HMPL) -->
  <section class="code-comparison wrapper">
    <div class="container">
      <div class="code-comparison-inner">
        <div class="code-comparison-left">
          <div class="code-card">
            <img
              src="/images/ellipse_1.png"
              alt="Background circle 1"
              class="code-comparison-bg code-comparison-bg-1"
            />
            <div class="code-card-header">
              <span class="code-label">HTMX</span>
              <span class="code-icon code-icon-cross">
                <i class="fas fa-times" aria-hidden="true"></i>
              </span>
            </div>
            <div v-html="highlightedCode" class="code-snippet"></div>
          </div>
          <div class="code-card">
            <img
              src="/images/ellipse_2.png"
              alt="Background circle 2"
              class="code-comparison-bg code-comparison-bg-2"
            />
            <div class="code-card-header">
              <span class="code-label">Alpine.js</span>
              <span class="code-icon code-icon-cross">
                <i class="fas fa-times" aria-hidden="true"></i>
              </span>
            </div>
            <div v-html="alpineHighlightedCode" class="code-snippet"></div>
          </div>
        </div>
        <div class="code-comparison-right">
          <div class="code-card code-card-hmpl">
            <img
              src="/images/ellipse_3.png"
              alt="Background circle 3"
              class="code-comparison-bg code-comparison-bg-3"
            />
            <div class="code-card-header">
              <span class="code-label">HMPL.js</span>
              <span class="code-icon code-icon-check">
                <i class="fas fa-check" aria-hidden="true"></i>
              </span>
            </div>
            <div v-html="hmplHighlightedCode" class="code-snippet"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="comparison-table wrapper">
    <div class="container">
      <ComparisonTable />
    </div>
  </section>
  <section class="text-block">
    <!-- Text Block section started -->
    <div class="text_block_wrapper wrapper">
      <div class="container">
        <div class="text_block_1">
          <div class="text-content">
            <p class="text_block_1_subtitle">We offer</p>
            <h2 class="text_block_1_title">Gold Standard</h2>
            <p class="text_block_1_description">
              This means that the process of interaction with the template
              language occurs in a combined format, when, unlike almost
              completely ignoring JS, focused only on working in the layout, you
              use a minimal amount of code to fully customize the request to the
              server. This allows you to handle a huge number of use cases.
            </p>
          </div>
          <div class="code-wrapper">
            <img
              class="code-image"
              src="/images/gold_standard.png"
              alt="hmpl-code"
            />
          </div>
        </div>

        <div class="text_block_1_items-grid">
          <div class="text_block_1_item">
            <div class="item-header">
              <h3 class="item-title">
                <img
                  src="/images/feature_1.svg"
                  alt="Flexibility"
                  class="item-svg"
                />
                Flexibility
              </h3>
            </div>
            <p class="item-description">
              Get all the benefits of SSR without robots, regardless of the
              platform (be it Tilda, Vue, etc.)
            </p>
          </div>
          <div class="text_block_1_item">
            <div class="item-header">
              <h3 class="item-title">
                <img
                  src="/images/feature_2.svg"
                  alt="Easy to use"
                  class="item-svg"
                />
                Easy to use
              </h3>
            </div>
            <p class="item-description">
              Get ready HTML from the server by describing only a couple of
              properties in the object
            </p>
          </div>
          <div class="text_block_1_item">
            <div class="item-header">
              <h3 class="item-title">
                <img
                  src="/images/feature_3.svg"
                  alt="Reliability"
                  class="item-svg"
                />
                Reliability
              </h3>
            </div>
            <p class="item-description">
              Code coverage is
              <a
                class="item-link"
                href="https://app.codecov.io/github/hmpl-language/hmpl"
                >100%</a
              >, which minimizes the risk of unexpected errors. Has
              functionality against XSS vulnerabilities (<a
                class="item-link"
                href="https://npmjs.com/package/dompurify"
                >DOMPurify</a
              >
              and more)
            </p>
          </div>
          <div class="text_block_1_item">
            <div class="item-header">
              <h3 class="item-title">
                <img
                  src="/images/feature_4.svg"
                  alt="Small size"
                  class="item-svg"
                />
                Small size
              </h3>
            </div>
            <p class="item-description">
              Get extensive server functionality <br class="item-br" />
              stored in just about
              <a
                class="item-link"
                href="https://bundlephobia.com/package/hmpl-js"
                >~24 kilobytes</a
              >
            </p>
          </div>
        </div>
      </div>
    </div>
    <!-- Text Block section ended -->
  </section>
  <!-- Metrics section -->
  <section class="metrics-wrapper" id="comparisonChart">
    <div class="wrapper">
      <div class="metrics-content">
        <div class="metrics-container flex-container">
          <div class="metrics-column">
            <div class="metric-block metric-large">
              <span class="metric-title">~1.67x</span>
              <span class="metric-subtitle">smaller than Vanilla</span>
            </div>
            <div class="metric-block metric-medium">
              <span class="metric-title">~1.14x</span>
              <span class="metric-subtitle">smaller than Alpine</span>
            </div>
          </div>
          <div class="metrics-progress-and-ellipse">
            <img
              src="/images/ellipse_4.png"
              alt="Background ellipse"
              class="metrics-bg-ellipse"
            />
            <div class="metrics-progress-container">
              <div class="labels-column">
                <div class="progress-label">HMPL</div>
                <div class="progress-label">Alpine</div>
                <div class="progress-label">Vue</div>
                <div class="progress-label">Angular</div>
                <div class="progress-label">Vanilla</div>
              </div>
              <div class="progress-column">
                <div class="progress-bar-wrapper">
                  <div
                    class="progress-bar"
                    data-width="40"
                    data-value="198"
                  ></div>
                </div>
                <div class="progress-bar-wrapper">
                  <div
                    class="progress-bar"
                    data-width="48.29"
                    data-value="224"
                  ></div>
                </div>
                <div class="progress-bar-wrapper">
                  <div
                    class="progress-bar"
                    data-width="51.59"
                    data-value="235"
                  ></div>
                </div>
                <div class="progress-bar-wrapper">
                  <div
                    class="progress-bar"
                    data-width="75.73"
                    data-value="314"
                  ></div>
                </div>
                <div class="progress-bar-wrapper">
                  <div
                    class="progress-bar"
                    data-width="80"
                    data-value="328"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="metrics-text-container">
          <p>
            The results are based on a comparison of the sizes of small
            applications presented in
            <a
              href="https://github.com/hmpl-language/app-size-comparison"
              rel="noreferrer noopener"
              target="_blank"
              class="metrics-link"
              >this</a
            >
            repository.
          </p>
          <p>
            (When the project is closer to reality, the difference increases
            many times over)
          </p>
        </div>
      </div>
    </div>
  </section>
  <!-- Articles section -->
  <section class="articles_wrapper wrapper">
    <div class="article_block container">
      <div class="article_wrapper left_article">
        <div class="article_gradient"></div>
        <div class="article_content">
          <a
            class="article_link"
            href="https://blog.hmpl-lang.dev/blog/2024/08/10/differences-between-hmpl-and-htmx.html"
            rel="noreferrer noopener"
            target="_blank"
            ><h2 class="article_title">
              Differences between <br />HMPL and HTMX
            </h2></a
          >
          <p class="article_excerpt">
            Hello everyone! In this post I would like to tell you about the
            differences between the HMPL template language and the HTMX library.
            This question often arises when first getting to know the language,
            so I will try to describe the differences as fully as possible...
          </p>
          <a
            href="https://blog.hmpl-lang.dev/blog/2024/08/10/differences-between-hmpl-and-htmx.html"
            class="main-button article-button"
            rel="noreferrer noopener"
            target="_blank"
            >Read more</a
          >
        </div>
        <a
          href="https://blog.hmpl-lang.dev/blog/2024/08/10/differences-between-hmpl-and-htmx.html"
          rel="noreferrer noopener"
          class="article_preview_link"
          target="_blank"
          ><img
            src="/images/preview1_V3.png"
            class="article_preview"
            alt="Differences between HMPL and HTMX"
        /></a>
      </div>
      <div class="article_wrapper right_article">
        <div class="article_gradient"></div>
        <div class="article_content">
          <a
            href="https://blog.hmpl-lang.dev/blog/2024/12/18/creating-a-gallery-app-in-javascript-with-hmpl.html"
            rel="noreferrer noopener"
            target="_blank"
            ><h2 class="article_title">
              Creating a Gallery App in JavaScript with HMPL
            </h2></a
          >
          <p class="article_excerpt">
            Hello everyone! In this article I will describe the process of
            creating a Gallery application. You can safely take this application
            and edit it as you wish (you can only change the pictures there,
            because there is a license). It is small in functionality, but, in
            my opinion...
          </p>
          <a
            href="https://blog.hmpl-lang.dev/blog/2024/12/18/creating-a-gallery-app-in-javascript-with-hmpl.html"
            class="main-button article-button"
            rel="noreferrer noopener"
            target="_blank"
            >Read more</a
          >
        </div>
        <a
          href="https://blog.hmpl-lang.dev/blog/2024/12/18/creating-a-gallery-app-in-javascript-with-hmpl.html"
          rel="noreferrer noopener"
          class="article_preview_link"
          target="_blank"
          ><img
            src="/images/preview_2.png"
            class="article_preview"
            alt="Creating a Gallery App in JavaScript with HMPL"
        /></a>
      </div>
    </div>
  </section>
  <!-- Contributors section -->
  <section class="contributors_wrapper wrapper">
    <div class="contributors container">
      <h1 class="contributors-title">Contributors</h1>
      <div class="contributors-grid"></div>
      <a
        href="https://github.com/hmpl-language/hmpl/issues"
        class="contributor-button"
        >Become a contributor</a
      >
    </div>
  </section>
  <!-- Sample text section -->
  <section class="sample_text_wrapper wrapper">
    <div class="container">
      <div class="sample_text">
        <img
          src="/images/ellipse_6.png"
          alt="Background ellipse"
          class="sample_text_ellipse_1"
        />
        <img
          src="/images/ellipse_7.png"
          alt="Background ellipse"
          class="sample_text_ellipse_2"
        />
        <div class="sample_content">
          <h2 class="sample_title">Ready to get started?</h2>
          <div class="sample_divider"></div>
          <p class="sample_highlight">Create modern apps much smaller</p>
        </div>
        <div class="sample_buttons">
          <a href="/getting-started" class="sample_button sample_button_primary"
            >Get started</a
          >
          <div
            class="sample_button sample_button_secondary"
            @click="copyText('npm i hmpl-js')"
          >
            <span class="sample_button_secondary_text">npm i hmpl-js</span>
            <img src="/images/copy.png" alt="Clipboard" class="copy-icon" />
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- Footer -->
  <footer>
    <div class="wrapper">
      <div class="container footer_container">
        <div class="footer_top_wrapper">
          <div class="footer_first_section">
            <a href="/" class="footer_logo_header">
              <img
                src="/images/antWhite.png"
                alt="Logo"
                class="footer_ant_logo"
              />
              <span class="footer_logo_header_title">HMPL.js</span>
            </a>
            <p class="footer_logo_subtitle">
              Server-oriented customizable templating for js
            </p>
          </div>
          <div class="footer_second_section">
            <div class="footer_section">
              <h3 class="footer_section_title">Example Apps</h3>
              <ul class="footer_list">
                <li class="footer_item">
                  <a
                    class="footer_item_link"
                    href="https://github.com/hmpl-language/examples/tree/main/gallery-app"
                    rel="noreferrer noopener"
                    target="_blank"
                    >Gallery App</a
                  >
                </li>
                <li class="footer_item">
                  <a
                    class="footer_item_link"
                    href="https://github.com/hmpl-language/examples/tree/main/landing"
                    rel="noreferrer noopener"
                    target="_blank"
                    >Landing Page</a
                  >
                </li>
                <li class="footer_item">
                  <a
                    class="footer_item_link"
                    href="https://github.com/aanthonymax/ant-and-apples"
                    rel="noreferrer noopener"
                    target="_blank"
                    >Game</a
                  >
                </li>
              </ul>
            </div>
            <div class="footer_section">
              <h3 class="footer_section_title">Documents</h3>
              <ul class="footer_list">
                <li class="footer_item">
                  <a
                    class="footer_item_link"
                    href="https://github.com/hmpl-language/hmpl/blob/main/CODE_OF_CONDUCT.md"
                    rel="noreferrer noopener"
                    target="_blank"
                    >Code Of Conduct</a
                  >
                </li>
                <li class="footer_item">
                  <a
                    class="footer_item_link"
                    href="https://github.com/hmpl-language/hmpl/blob/main/SECURITY.md"
                    rel="noreferrer noopener"
                    target="_blank"
                    >Security</a
                  >
                </li>
                <li class="footer_item">
                  <a
                    class="footer_item_link"
                    href="https://github.com/hmpl-language/hmpl/blob/main/CONTRIBUTING.md"
                    rel="noreferrer noopener"
                    target="_blank"
                    >Contributing</a
                  >
                </li>
                <li class="footer_item">
                  <a
                    class="footer_item_link"
                    href="https://github.com/hmpl-language/hmpl/blob/main/LICENSE"
                    rel="noreferrer noopener"
                    target="_blank"
                    >MIT License</a
                  >
                </li>
              </ul>
            </div>
            <div class="footer_section">
              <h3 class="footer_section_title">Resources</h3>
              <ul class="footer_list">
                <li class="footer_item">
                  <a class="footer_item_link" href="/introduction">Docs</a>
                </li>
                <li class="footer_item">
                  <a class="footer_item_link" href="/examples">Examples</a>
                </li>
                <li class="footer_item">
                  <a class="footer_item_link" href="/projects"
                    >Community projects</a
                  >
                </li>
                <li class="footer_item">
                  <a class="footer_item_link" href="/changelog">Changelog</a>
                </li>
              </ul>
            </div>
          </div>
          <div class="footer_third_section">
            <div class="footer_social-links">
              <a
                class="footer_social-link"
                href="https://github.com/hmpl-language/hmpl"
                rel="noreferrer noopener"
                target="_blank"
              >
                <svg
                  class="footer_social-logo"
                  width="25"
                  height="25"
                  viewBox="0 0 25 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.4902 1.86279C6.45264 1.86035 1.5625 6.74805 1.5625 12.7808C1.5625 17.5513 4.62158 21.6064 8.88184 23.0957C9.45557 23.2397 9.36768 22.832 9.36768 22.5537V20.6616C6.05469 21.0498 5.92041 18.8574 5.69824 18.4912C5.24902 17.7246 4.18701 17.5293 4.50439 17.1631C5.25879 16.7749 6.02783 17.2607 6.91895 18.5767C7.56348 19.5312 8.8208 19.3701 9.45801 19.2114C9.59717 18.6377 9.89502 18.125 10.3052 17.7271C6.87256 17.1118 5.44189 15.0171 5.44189 12.5269C5.44189 11.3184 5.83984 10.2075 6.62109 9.31152C6.12305 7.83447 6.66748 6.56982 6.74072 6.38184C8.15918 6.25488 9.63379 7.39746 9.74854 7.48779C10.5542 7.27051 11.4746 7.15576 12.5049 7.15576C13.54 7.15576 14.4629 7.27539 15.2759 7.49512C15.5518 7.28516 16.9189 6.30371 18.2373 6.42334C18.3081 6.61133 18.8403 7.84668 18.3716 9.3042C19.1626 10.2026 19.5654 11.3232 19.5654 12.5342C19.5654 15.0293 18.125 17.1265 14.6826 17.7319C14.9775 18.0219 15.2116 18.3677 15.3713 18.7492C15.531 19.1306 15.6131 19.5401 15.6128 19.9536V22.7002C15.6323 22.9199 15.6128 23.1372 15.979 23.1372C20.3027 21.6797 23.4155 17.5952 23.4155 12.7832C23.4155 6.74805 18.5229 1.86279 12.4902 1.86279Z"
                    fill="white"
                  />
                </svg>
              </a>
              <a
                class="footer_social-link"
                href="https://x.com/hmpljs"
                rel="noreferrer noopener"
                target="_blank"
              >
                <svg
                  class="footer_social-logo"
                  width="25"
                  height="25"
                  viewBox="0 0 25 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19.0039 2.34375H22.4512L14.9219 10.9473L23.7793 22.6562H16.8457L11.4111 15.5566L5.2002 22.6562H1.74805L9.7998 13.4521L1.30859 2.34375H8.41797L13.3252 8.83301L19.0039 2.34375ZM17.793 20.5957H19.7021L7.37793 4.29688H5.32715L17.793 20.5957Z"
                    fill="white"
                  />
                </svg>
              </a>
              <a
                class="footer_social-link"
                href="https://discord.gg/KFunMep36n"
                rel="noreferrer noopener"
                target="_blank"
              >
                <svg
                  class="footer_social-logo"
                  width="25"
                  height="20"
                  viewBox="0 0 25 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M23.6801 8.48954C22.9166 6.09137 22.426 4.98097 22.2014 4.53241L22.2013 4.53226C22.0207 4.16506 21.5631 3.3749 21.5449 3.34349C21.4808 3.26625 19.8916 1.38872 16.0615 0L15.5554 1.36041C17.3664 2.01704 18.606 2.77532 19.3738 3.34543C17.2529 2.72102 14.7309 2.33889 12.4972 2.33889C10.2609 2.33889 7.73589 2.72213 5.61337 3.34789C6.32427 2.82716 7.61698 2.0211 9.43911 1.36041L8.93299 0C5.1029 1.38872 3.51369 3.26625 3.44959 3.34349C3.44959 3.34349 3.07207 3.94515 2.75489 4.60579C2.56478 5.00174 2.07232 5.90581 1.3096 8.50519C0.353004 11.7661 0.0132609 16.3753 0 16.5597C0.168868 16.9244 2.12619 20 7.39326 20L8.83655 17.9367C10.0278 18.2418 11.2568 18.3961 12.4973 18.3961C13.7405 18.3961 14.9719 18.2411 16.1655 17.9348L17.5998 20C22.9717 20 24.7251 17.0291 25 16.5514C24.9788 16.3319 24.4468 10.898 23.6801 8.48954ZM22.2742 17.2738C21.1569 18.0545 19.8443 18.4806 18.3677 18.5428L17.6272 17.4766C18.6485 17.0967 19.6284 16.6023 20.5491 15.9972L19.7357 14.7907C18.7087 15.4657 17.5998 15.9879 16.4392 16.3495V16.3509C16.4392 16.3509 14.5173 16.9468 12.4974 16.9468C10.4775 16.9468 8.56095 16.3526 8.56095 16.3526V16.3511C7.39835 15.9895 6.28767 15.4667 5.25904 14.7907L4.44558 15.9971C5.36797 16.6033 6.34966 17.0984 7.37291 17.4785L6.62849 18.5428C5.15134 18.4809 3.83812 18.0547 2.72044 17.2738C2.09732 16.8383 1.69588 16.3969 1.50293 16.1593C1.58808 15.1666 1.93648 11.5782 2.71985 8.90838C3.30778 6.90472 3.71364 5.96707 3.9352 5.51436C3.9352 5.51436 9.61679 3.78814 12.4974 3.78814C15.3756 3.78814 18.8874 4.4941 21.0403 5.50537C21.2731 6.02896 21.6875 7.06381 22.2797 8.92404C22.9044 10.8865 23.3704 15.0569 23.4866 16.1656C23.2908 16.4057 22.8912 16.8427 22.2742 17.2738Z"
                    fill="white"
                  />
                  <path
                    d="M7.6355 9.88135H9.10349V12.2969H7.6355V9.88135Z"
                    fill="white"
                  />
                  <path
                    d="M15.8911 9.88135H17.3591V12.2969H15.8911V9.88135Z"
                    fill="white"
                  />
                </svg>
              </a>
            </div>
            <a
              href="https://devhunt.org/tool/hmpljs"
              target="_blank"
              class="badge"
            >
              <img class="badge-img" src="/images/devhunt.svg" />
            </a>
          </div>
        </div>
        <hr class="footer_divider" />
        <div class="footer_bottom_wrapper">
          <div class="footer_copyright">
            <div class="footer_texts">
              <p class="footer_text">
                HMPL.js is a templating language, along with its official
                modules, distributed in an open source model. hmpl.js, together
                with its official modules, is not affiliated with any company
                registered in any country in the world.
              </p>
              <p class="footer_text">
                This project has been developed with contributions from many
                amazing community 🌱 developers!
              </p>
            </div>
            <p class="footer_copyright_text">
              MIT Licensed | © 2024-2025 HMPL.js
            </p>
          </div>
        </div>
      </div>
    </div>
  </footer>
  <div class="note">
    This project participates in Hacktoberfest 2025. See the
    <a
      class="note_link"
      href="https://github.com/hmpl-language/hmpl/issues"
      target="_blank"
      rel="noopener noreferrer"
      >issue list</a
    >.
  </div>
  <!-- Scroll to top button -->
  <button
    class="scroll-to-top"
    v-show="showScroll"
    @click="scrollToTop"
    aria-label="Scroll to top"
  >
    <i class="fas fa-arrow-up" aria-hidden="true"></i>
  </button>
</template>
