---
layout: post
title: "How to GET HTML from API and Display In DOM using HMPL.js (fetch)?"
description: "Learn how to fetch HTML content from APIs and dynamically display it in the DOM using HMPL.js. Complete tutorial with practical examples and code snippets."
date: 2024-07-22 2:10 PM
categories: [blog, tutorial, api]
tags: [HMPL, JavaScript, API, fetch, DOM, HTML, tutorial, web-development]
author: "HMPL Team"
image: "/favicon.ico"
keywords: "HMPL, JavaScript, API, fetch, DOM manipulation, HTML, tutorial, web development, frontend"
---

Hello! In this post I would like to talk about how to GET HTML from API and Display In DOM using HMPL.js.

This method is suitable for any api, because This module is based on the Fetch API and almost completely copies the work with the vanilla solution.

Let's say if we take a route that returns HTML in response:

API route - http://localhost:8000/api/test

```html
<span>123</span>
```

And, let’s say, there is a task in a `div` with `id` "wrapper" to display this HTML. To do this, you can connect the hmpl module via the `script` tag and write the following code:

```html
<div id="wrapper"></div>
<script src="https://unpkg.com/hmpl-js/dist/hmpl.min.js"></script>
<script>
  const templateFn = hmpl.compile(
    `<div>
       { 
         {
           "src":"http://localhost:8000/api/test" 
         } 
       }
    </div>`
  );

  const wrapper = document.getElementById("wrapper");

  const obj = templateFn();

  wrapper.appendChild(obj.response);
</script>
```

In this code, thanks to hmpl markup, you can generate a DOM node that can be displayed in HTML. It is worth considering that this node will be updated automatically during the API request process.

If you need to add a request indicator, you can slightly expand the existing code:

```html
<div id="wrapper"></div>
<script src="https://unpkg.com/hmpl-js/dist/hmpl.min.js"></script>
<script>
  const templateFn = hmpl.compile(
    `<div>
       { 
         {
           "src":"http://localhost:8000/api/test",
           "on": {
              "trigger": "loading",
              "content": "<div>Loading...</div>",
           } 
         } 
       }
    </div>`
  );

  const wrapper = document.getElementById("wrapper");

  const obj = templateFn();

  wrapper.appendChild(obj.response);
</script>
```

In this example, the indicator will be triggered when the request is sent, but the response from the API has not yet arrived.
