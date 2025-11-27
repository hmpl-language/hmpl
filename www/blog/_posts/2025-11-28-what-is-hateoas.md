---
layout: post
title: "What Is HATEOAS? A Complete Guide + Build Your Own App Using Hypermedia"
date: 2025-11-27 20:00 PM
categories: blog
tags: [webdev, html]
---

Surely most people have encountered the concept of HATEOAS at least once, but what exactly is it?

In fact, this is a rather old, but very interesting topic even today, which has not lost its relevance in development.

In this article, we will cover the basics and create our first simple application that will reflect this topic.

Ready? Then let's get to the topic!

---

## 🔎 What is this?

Many would start with a definition, but without some understanding, we'll naturally leave it at that for now. Let's first look at how our app works.

Let's say we have a typical SPA application built on some popular framework. Let's review how we retrieve data from it.

![Diagram 1](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/1ffijdozw4vdn121vt8m.png)

We retrieve data from API routes defined in advance on the client, but what if the route changes? What if we work in a large company with several thousand employees and never know which backend is currently up-to-date?

Perhaps now we come to the definition of what HATEOAS is.

**HATEOAS - Hypermedia As The Engine Of Application State**.

This means that we will take one specific existing route, and we will describe the actions for it based on the response object.

## 📦 Architectural structure of the application

Now, let's look at some specific examples of what this concept offers for our SPA app. Let's take a simple online clothes store.

We know that product reviews come from our API via the specified `reviews/{id}` route, but one day, they simply delete it and integrate it with a review platform. As a result, when users go to buy jacket, for example, they open the reviews section, but an error occurs on the page, and the app stops working.

For these kinds of cases, we can create a different application. We won't discuss the BFF layer here; let's focus on our topic. What if we simply create an `products/{id}` route and retrieve the data we need from there? Let's see how this would look in a diagram:

![Diagram 2](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/xtksefbkelpsfi5z9ewx.png)

We see that we have a list of links we can work with. Now, we can simply create a button with a link from the response, and when clicked, we'll get the route we need. This way, we can literally build the entire application with just a couple of routes for each page.

## 🔧 Creating an application

Now, let's create a small app for our clothing store. The functionality will be simple: we'll tap on an item and get information about it. For work we will use hmpl-js via the hmpl-dom extension for working through one html.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Mini HATEOAS Shop</title>
    <style>
      body {
        padding: 20px;
      }
      .item {
        padding: 8px;
        border: 1px solid #ddd;
        margin: 6px 0;
        cursor: pointer;
        border-radius: 6px;
      }
      .back {
        color: blue;
        cursor: pointer;
        margin-top: 10px;
        display: inline-block;
      }
      pre {
        background: #f6f6f6;
        padding: 8px;
        border-radius: 6px;
      }
    </style>

    <script>
      (function () {
        const products = [
          { id: 1, name: "T-Shirt", price: 15 },
          { id: 2, name: "Hoodie", price: 40 },
          { id: 3, name: "Jeans", price: 55 }
        ];
        const real = fetch.bind(window);

        window.fetch = async (input, init) => {
          const url = typeof input === "string" ? input : input?.url || "";
          await new Promise((r) => setTimeout(r, 80));

          if (url.endsWith("/api/products")) {
            return new Response(
              products
                .map(
                  (p) => `
        <div class="item" data-id="${p.id}">
          <strong>${p.name}</strong> — $${p.price}
        </div>`
                )
                .join(""),
              { status: 200, headers: { "Content-Type": "text/html" } }
            );
          }

          if (/\/api\/product\/\d+$/.test(url)) {
            const id = +url.split("/").pop();
            const p = products.find((x) => x.id === id);
            return new Response(
              `
        <h2>${p.name}</h2>
        <p>Price: $${p.price}</p>
        <div class="back" data-back="/api/products">← Back</div>
        <pre data-hateoas>${JSON.stringify(
          {
            self: `/api/product/${p.id}`,
            add_to_cart: `/api/cart/add/${p.id}`
          },
          null,
          2
        )}</pre>
      `,
              { status: 200, headers: { "Content-Type": "text/html" } }
            );
          }

          return real(input, init);
        };
      })();
    </script>
  </head>

  <body>
    <main>
      <template data-hmpl>
        <div>
          <h1>Clothing Shop — HATEOAS</h1>

          <div id="list">
            {{#request src="/api/products"}} {{#indicator
            trigger="pending"}}Loading…{{/indicator}} {{/request}}
          </div>

          <div id="detail"></div>

          <h3>Info:</h3>
          <pre id="info">none</pre>
        </div>
      </template>
    </main>

    <script src="https://unpkg.com/json5/dist/index.min.js"></script>
    <script src="https://unpkg.com/dompurify/dist/purify.min.js"></script>
    <script src="https://unpkg.com/hmpl-js/dist/hmpl.min.js"></script>
    <script src="https://unpkg.com/hmpl-dom/dist/hmpl-dom.min.js"></script>

    <script>
      document.addEventListener("click", async (e) => {
        const item = e.target.closest("[data-id]");
        if (item) {
          const id = item.dataset.id;
          const html = await (await fetch("/api/product/" + id)).text();
          detail.innerHTML = html;
          info.textContent =
            detail.querySelector("[data-hateoas]")?.textContent || "none";
        }

        const back = e.target.closest("[data-back]");
        if (back) {
          const html = await (await fetch(back.dataset.back)).text();
          list.innerHTML = html;
          detail.innerHTML = "";
        }
      });
    </script>
  </body>
</html>
```

As a result, our application is located in about 120 lines and this is what it looks like:

![App](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/01caittftigwaob2t62l.png)

As you can see, thanks to [hmpl-js](https://github.com/hmpl-language/hmpl) and HATEOAS architecture, we can create cool and functional applications in just a few dozen lines of code, and this application works very flexibly with a mock server, since we do not set strict routes.

## ✅ Conclusion

In this article, we discussed the HATEOAS architecture and created a small application using it. In fact, this topic receives little attention in application development, which is undeserved, as application flexibility allows us to create more scalable and easily maintainable websites.

---

**Thank you very much for reading this article ❤️!**

_What do you think of this architecture? Have you ever used it in your own projects or seen it in work projects? It will be interesting to know in the comments!_

P.S. Also, don't forget to give HMPL a star!
