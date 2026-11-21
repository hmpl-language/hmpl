---
layout: post
title: "Client‑Side SSR: Build a Component‑Based Landing Page in 10 Minutes"
date: 2025-04-27 2:10 PM
categories: blog
tags: [HMPL, SSR, components, landing-page, tutorial, web-development, JavaScript, quick-start]
---




# Client‑Side SSR: Build a Component‑Based Landing Page in 10 Minutes⏱️

---

Today, it is impossible to imagine a modern large project without using Next.js or Nuxt.js.  
But, nevertheless, if the task is to quickly create such a structure, then this method, which is described here, is perfect for this.

Today, we will create a small landing page application with 5 components that are located on the server.

Let’s get started!

---

## Application structure

Our application will have a structure just like modern SSR applications (without BFF, of course, etc.), but the rendering will occur on the client, which is shown through the browser.

There is no concept of a database in our structure, since the data will be located in HTML files. But if we were doing registration on the landing page, we might include a `.json` file; however, this example is meant to be built in 10 minutes, so we’ll keep it simple.

To connect the client to the server, we’ll use the HMPL module.

---

## Where to start creating an app?

Create two files: `global.css` and `global.js`. These will include the styles and scripts independent of server-rendered components.

### global.css

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Roboto, sans-serif;
}

body {
  line-height: 1.6;
  color: #333;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.section {
  padding: 80px 0;
  text-align: center;
}

.section h2 {
  font-size: 36px;
  margin-bottom: 30px;
}
```

### global.js

```js
console.log("Global scripts loaded");
```

Now, create `index.html` and link the necessary modules:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My Landing Page</title>
    <link rel="stylesheet" href="global.css" />
  </head>
  <body>
    <script src="https://unpkg.com/json5/dist/index.min.js"></script>
    <script src="https://unpkg.com/dompurify/dist/purify.min.js"></script>
    <script src="https://unpkg.com/hmpl-js/dist/hmpl.min.js"></script>
    <script src="global.js"></script>
  </body>
</html>
```

---

## ⚙️ Server Configuration

We'll use **Node.js** with **Express.js** for the server.

### app.js

```js
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");

const PORT = 8000;
const app = express();

const getRoutes = require("./routes/get");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({ origin: true, credentials: true }));

app.use(express.static(path.join(__dirname, "src")));

app.get("/", (_, res) => {
  res.sendFile(path.join(__dirname, "src/index.html"));
});

app.use("/api", getRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
```

### routes/get.js

```js
const express = require("express");
const expressRouter = express.Router();
const path = require("path");

const components = {
  title: "CTA",
  header: "Header",
  features: "Features",
  promo: "Promo",
  cta: "CTA",
  footer: "Footer",
};

Object.entries(components).forEach(([name, folder]) => {
  expressRouter.get(`/get-${name}-component`, (_, res) => {
    res.type("text/html");
    res.sendFile(path.join(__dirname, `../components/${folder}/index.html`));
  });
});

module.exports = expressRouter;
```

---

## ⌨️ Writing the first component

Create the features section, accessible via:

```
http://localhost:8000/api/get-features-component
```

### components/Features/index.html

```html
<div id="features-component">
  <section id="features" class="section features">
    <div class="container">
      <h2>Our Amazing Features</h2>
      <div class="features-grid">
        <div class="feature-card">
          <h3>Fast</h3>
          <p>Lightning fast performance that saves you time.</p>
        </div>
        <div class="feature-card">
          <h3>Simple</h3>
          <p>Easy to use interface with no learning curve.</p>
        </div>
        <div class="feature-card">
          <h3>Reliable</h3>
          <p>99.9% uptime guaranteed for your business.</p>
        </div>
      </div>
    </div>
  </section>
  <style>
    .features {
      background: #f9f9f9;
      padding: 80px 0;
      text-align: center;
    }
    .features h2 {
      font-size: 36px;
      margin-bottom: 30px;
    }
    .features-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 30px;
      margin-top: 50px;
    }
    .feature-card {
      background: white;
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
      opacity: 0;
      transform: translateY(20px);
      transition: all 0.6s ease;
    }
    .feature-card h3 {
      margin-bottom: 15px;
      font-size: 22px;
    }
    @media (max-width: 768px) {
      .features-grid {
        grid-template-columns: 1fr;
      }
    }
  </style>
  <script>
    const animateFeatures = function () {
      const elements = document.querySelectorAll(
        "#features-component .feature-card"
      );
      elements.forEach((element) => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;

        if (elementPosition < screenPosition) {
          element.style.opacity = "1";
          element.style.transform = "translateY(0)";
        }
      });
    };

    window.addEventListener("load", animateFeatures);
    window.addEventListener("scroll", animateFeatures);
  </script>
</div>
```

---

## ✅ Writing the rest

Repeat similar steps for the remaining components:

1. Header: `/api/get-header-component`  
2. Promo: `/api/get-promo-component`  
3. CTA: `/api/get-cta-component`  
4. Footer: `/api/get-footer-component`

All component files are available in the linked repository.

---

## Connecting everything to `index.html`

Append components dynamically using HMPL:

```html
<script>
  const body = document.querySelector("body");
  const template = `
    <main>
      {% raw %}{{#request src="http://localhost:8000/api/get-header-component"}}{{/request}}
      {{#request src="http://localhost:8000/api/get-features-component"}}{{/request}}
      {{#request src="http://localhost:8000/api/get-promo-component"}}{{/request}}
      {{#request src="http://localhost:8000/api/get-cta-component"}}{{/request}}
      {{#request src="http://localhost:8000/api/get-footer-component"}}{{/request}}{% endraw %}
    </main>
  `;
  const { response } = hmpl.compile(template)();
  body.append(response);
</script>
```

You can also use `interval` for repeated fetching or add loaders.

---

## ️ Result

The result is a functioning landing page built client-side in just ten minutes — clean, dynamic, and modular.

---

## ️ Conclusion

We built a small, yet sleek and functional landing page using client‑side SSR in under 10 minutes.  
This method offers a lightweight alternative to heavy frameworks like Next.js or Nuxt.js, especially when SEO isn't critical.

Feel free to show some ❤️ and star the project if you found this helpful!

---

## ️ Repository link

Full source code and all components are available here:  
[https://github.com/hmpl-language/examples/tree/main/landing](https://github.com/hmpl-language/examples/tree/main/landing)

---



