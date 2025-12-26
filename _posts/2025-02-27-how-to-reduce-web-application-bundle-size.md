---
layout: post
title: "How to reduce web application bundle size?"
date: 2025-02-27 2:10 PM
categories: blog
tags: [Performance, Optimization, Bundle-size, web-development, JavaScript, SSR, CSR]
---

Often, when working on a project for a long time, you notice that the more functionality you add, the slower the web application becomes. Although, it would seem that there is no point in adding a `table`, a `button`, or something else that in some vacuum weighs quite a bit. As a result, you get an unacceptable initial load, which can take more than 10-30 seconds, for example.

In this article, I would like to consider some methods and little tricks that will help you avoid this and make your site as fast to load and smaller in size as possible.

## Platform Dependency

If you want to reduce the size of a web application, then first of all you need to start with the platform you use for the base. If we take Next.js, then these are some methods, but if these are self-written sites, then these are slightly different.

Therefore, first of all, it is worth looking for how to configure the same framework or library so that they give a better result, changing just a couple of settings, for example, the same caching of responses to requests to the server, or an add-on for images - all this is sometimes already built into the config itself, all that remains is to find it.

## Migration from CSR to SSR (SSG, ISG, etc.)

One of the best ways to reduce the size of a bundle is to transfer the rendering of parts of a page from the client to the server. This allows you to get a kind of framework, where the component will be loaded brick by brick. Accordingly, the size of the HTML and JS source files of such a project will consist only of empty tags and requests to the server, which put ready-made components there.

An example of such an approach is the following code:

**index.html**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title><%= data.title %></title>
  </head>
  <body>
    <h1><%= data.title %></h1>
    <p><%= data.content %></p>
  </body>
</html>
```

**server.js**

```javascript
const express = require("express");
const app = express();
const PORT = 3000;

// Set EJS as the templating engine
app.set("view engine", "ejs");

// Sample data
const data = {
  title: "Server Side Rendering Example",
  content: "This is an example of Server Side Rendering using Node.js and EJS."
};

// Define a route
app.get("/", (req, res) => {
  // Render the HTML using EJS
  res.render("index", { data });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
```

Here we see that thanks to EJS and Express we can render everything on the server. Also, we can redesign the site for Next.js, then we will achieve a similar effect not only for one page, but also for others, including with dynamic routes, and, of course, indexing by robots.

**BUT**, this method of making SSR (SSG, ISG etc.) has serious disadvantages, because of which it may not be suitable. For example, if the site is already on some of the frameworks or libraries, which was already focused on the client side, then redoing everything can cost a lot of money and time. Also, the specifics of choosing such tools (except Next.js) can provoke a shortage of personnel who are suitable for these tasks. If a person learned to work on one framework, and the vacancy is not very popular, difficult to replace library, then finding an applicant will be problematic.

To keep the server-oriented approach, and at the same time not have significant problems described above, you can use HMPL.js or similar libraries.

## Implementing Server-Oriented Methods Using HMPL.js

Unlike the methods described above, the module will not allow robots to index the page, but you can connect it to any web application, or simply to any site, be it WordPress, Vue.js, Tilda, Next.js, or wherever you want.

Working with the module looks something like this:

**index.html**

```html
<main id="app"></main>

<script src="https://unpkg.com/json5/dist/index.js"></script>
<script src="https://unpkg.com/hmpl-js/dist/hmpl.min.js"></script>
```

**client.js**

```javascript
const templateFn = hmpl.compile(
  `<div>
      <button data-action="increment" id="btn">Click!</button>
      <div>Clicks: {% raw %}{{#request src="/api/clicks" after="click:#btn"}}{{/request}}{% endraw %}</div>
  </div>`
);

const clicker = templateFn(({ request: { event } }) => ({
  body: JSON.stringify({ action: event.target.getAttribute("data-action") })
})).response;

document.querySelector("#app").append(clicker);
```

Here, we also get rendered HTML, but we don't have a clear architecture to adhere to. We can either disable or enable the module for any project and there will be no consequences. It is also easy to use, because it consists of a small, but necessary number of functional capabilities. Also, in the example, you can safely remove `after` and load components during DOM rendering.

## Other general methods that can help reduce bundle size

Here, if we do not take work with the server, but just regular work with the web application, then the methods described below can also help in reducing the bundle size:

## 1. Removing unnecessary dependencies

It happens that in the process of developing a web application you need to create some functionality and you download different packages, trying them out, choosing the most suitable for the task. Forgetting to delete them, the size of the bundle, accordingly, only becomes larger. Or, if a huge module is connected to a task that can be solved in regular js and one function is used from there - this is also simply pointless.

To analyze unused packages, for example, you can use the following package or something similar:

```bash
npm install depcheck
depcheck /path/to/my/project
```

or

```bash
npx depcheck
```

This module, although not supported, will still allow you to analyze dependencies and identify unused ones. But, you need to use it carefully, because it would seem that something is not used, but then without it some module will not work - this also needs to be controlled.

You can also use npm's built-in functionality via the following command:

```bash
npm prune
```

This command removes "extraneous" packages. If a package name is provided, then only packages matching one of the supplied names are removed.

## 2. Using lower sized media files in a project

This is probably one of the simplest and most obvious pieces of advice that can be given. If you have a single video in your project that is equal in size to the entire web application, then it will be simply difficult to work with, let's say, with the same `git clone`.

This practice is great for images, where you can save a few MB per image without losing any quality. Online compression platforms can easily do this today.

Also, you can change the image resolution from png, jpg to webp. This is also a good practice, which is used in many large web applications.

## 3. Using CDN

This is also one of the common ways when you transfer a module from `npm_modules` to an external environment.

```javascript
import { chunk } from "lodash";
```

or

```html
<script src="https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js"></script>
```

It is somewhat similar to what was described earlier, but has a slightly different meaning.

## 4. Code splitting

One of the easiest ways to split code is to use dynamic imports. In modern bundlers like Webpack and Vite, you can easily write something like this:

**main.js**

```javascript
document.getElementById("loadButton").addEventListener("click", () => {
  import("./module.js")
    .then((module) => {
      module.default();
    })
    .catch((err) => {
      console.error("Error loading the module:", err);
    });
});
```

In this case, we do not load the module immediately, but only when necessary, when the button is pressed.

You can also enable chunk splitting. This is useful for separating common code between different modules.

**webpack.config.js**

```javascript
module.exports = {
  optimization: {
    splitChunks: {
      chunks: "all"
    }
  }
};
```

## 5. Code minification

You can also reduce the bundle size if you apply minification during compilation to your code. This is probably one of the best ways you can use.

```
uglifyjs file.js -c toplevel,sequences=false
```

For this, you can use Uglify.js, which is one of the most popular tools for code minification. It can also be used with bundlers, if it or similar ones are not included by default, of course.

## Conclusion

First of all, from all the listed, I tried to describe the most general methods that are applicable to almost every web application. They are the most popular of those that are always taken up when setting such a task. I also did not want to write some stupid advice about DRY, KISS principles, which are already obvious in terms of reducing code, I wanted more specifics. But, in any case, I hope that these methods will help you make your site smaller and faster!

**Thank you very much for reading the article!**
