---
layout: post
title: "Best Alpine.js Alternative"
date: 2025-05-03 2:10 PM
categories: blog
---

In this article I'll tell you about a great replacement for Alpine.js that will help you do the same (and even more) with server-side HTML.

A couple of months ago I wrote a [similar article about HTMX](https://dev.to/hmpljs/best-alternative-to-htmx-35j7), and now I can finally write about the benefits you can get by using [HMPL](https://github.com/hmpl-language/hmpl) instead of [Alpine.js](https://github.com/alpinejs/alpine).

In my opinion, this idea has much greater potential than what has been done so far.

Well, let's get started!

---

## How will we compare?

First of all, all comparison will be in the context of the server connection. We will not consider options for regular client functionality here. Although everything is done on the client, there are still serious differences.

We will consider the following parameters when comparing:

- **Rendering**
- **Customization of server requests**
- **Disk space**
- **What's under the hood of the modules**

We will also touch on the topic of support, ease of installation and a couple of other points.

---

## Rendering

In modern web development, the choice of interface rendering approach plays a key role. We will consider two fundamentally different methods: template compilation in HMPL and the declarative approach of Alpine.js. These technologies offer different paradigms for working with the user interface, each with its own advantages and implementation features.

**HMPL**

HMPL uses client-side template compilation, which means that markup is turned into JavaScript functions that dynamically generate HTML.

```js
const templateFn = hmpl.compile(`
  <div>
    {{#request 
       src="/api/my-component"   
       indicators=[
         {
            trigger: "pending"
            content: "<p>Loading...</p>"
         }
       ]}}
    {{/request}}
  </div>
`);

// Usage
const component = templateFn();
```

The template is compiled once into an executable function that:

- Creates an optimized render function

- Caches the result for reuse

- Prepares the DOM structure for future updates

**Alpine.js**

Alpine.js offers a declarative style - you describe behavior directly in HTML via attributes (`x-data`, `x-show`, `x-text`).

```html
<div
  x-data="{ user: null, loading: true }"
  x-init="fetch('/api/user')
       .then(r => r.json())
       .then(data => { user = data; loading = false; })"
>
  <template x-if="loading">
    <div>Loading...</div>
  </template>

  <div x-show="user" class="user-card">
    <h2 x-text="user.name"></h2>
    <span x-show="user.isPremium" class="badge">Premium</span>
  </div>
</div>
```

Here's the concise 4-point breakdown of how the Alpine.js code works:

- The component defines its reactive state and data fetching logic directly in the HTML markup using Alpine.js directives.

- The `x-init` hook automatically triggers data loading when the component mounts, managing both the request and state updates.

- Alpine's `x-if` and `x-show` directives handle dynamic UI rendering based on the loading state and data availability.

- The template automatically re-renders when state changes, keeping the UI in sync with the underlying data without manual DOM manipulation.

**Comparison**

HMPL provides an automated rendering approach with built-in request handling and templating, ideal for complex data-driven components but requiring compilation. Alpine.js offers more transparent control through explicit fetch calls and reactive state management, better suited for lightweight interactivity. The choice depends on project needs - HMPL excels for structured templating, while Alpine.js shines for rapid prototyping and simple dynamic elements.

---

## Customization of server requests

When building dynamic web applications, efficiently managing server requests is crucial. Unlike HTMX, where there is a meager range of customization, Alpine.js offers a wider range, and the customization itself occurs almost like in jsx, when we directly insert js code into attributes. Only, of course, with a limitation of templates.

```html
<div
  x-data="{ user: null, error: null }"
  x-init="fetch('/api/user')
       .then(r => r.json())
       .then(data => user = data)
       .catch(e => error = e)"
></div>
```

With this approach we see that it is very convenient, but the problem is that most likely it looks like `eval`, or processing of a template according to ready-made patterns.

This approach has a number of serious drawbacks, since with each new version of JS more and more new features are added that must be supported with this approach. In jsx this point is justified, since in fact, this is the very basis of React, and here it is only a module that can be connected via the `script` tag. We become seriously dependent on version updates, which makes this approach, although convenient, not entirely practical.

In HMPL, a different approach is used, we can write some minimal part that we need directly in the template, there, the method, the route by which we will receive HTML and other things, but we write the entire js part in js.

```javascript
const templateFn = hmpl.compile(...);

const elementObj = templateFn(({
  request: { event, clearInterval }
})=>{
  clearInterval?.();
  return {
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "text/html",
      },
      redirect: "follow",
      get: (prop, value) => {},
      referrerPolicy: "no-referrer",
      body: new FormatData(event.target, event.submitter),
    }
});
```

Here there is a clear separation between the js part and the html part. Therefore, you will not depend on new versions of the module, since everything that is needed when describing js, you can always write there, even if it is version 1.0.0, even if it is 3.0.1.

Also, in Alpine.js with such syntax there are risks of XSS injections. Yes, of course there is not a real `eval`, but the same, but with a limited syntax that prevents most dangers, but still there is a danger. This is not only a problem for it, but for all modules in general, including HMPL, but in HMPL, by the way, there is an option to `sanitize` incoming HTML from `DOMPurify`.

---

## Disk space

Here is probably the simplest and most understandable thing when comparing. Just write the same code and compare (but we must understand that if the application is large, then the code also increases exponentially).

**Alpine.js**

```
document.querySelector(
  "#app"
).innerHTML = `<div x-data="{ count: 0, l() { fetch('/a').then(r => r.text()).then(d => this.c = d)}}"><button @click="l()">Click!</button><div>Clicks: <span x-text="c"></span></div></div>`;
```

**HMPL**

```
document
  .querySelector("#app")
  .append(
    hmpl.compile(
      `<div><button>Click!</button><div>Clicks: {{#r src= "/api/clicks" after="click:button" }}{{/r}}</div></div>`
    )().response
  );
```

**Here, it is probably clear that it will be shorter when written.**

But, if you still need full-fledged tests, there is a [repository with tests](https://github.com/hmpl-language/app-size-comparison). There is also a second version of the module, which was even shorter, but the essence of the third has not changed.
These figures are closest to the real results in large and small projects.

---

## What's under the hood of the modules

This refers to the technology of sending the request itself. I will not write about what `RegExp` is used to process templates, or how saving an element in arrays works - this should not be interesting to clients at all.

The main thing we will consider is `XMLHTTPRequest` and `fetch` support. And, on this topic we have the following:

**Alpine.js**

Alpine.js has full compatibility with both `fetch` and `XMLHTTPRequest` methods. This allows, in some cases, to make more precise requests, for example, with `overrideMimeType`:

```html
<div x-data="{ data: null }"
     x-init="
       const xhr = new XMLHttpRequest();
       xhr.overrideMimeType("text/html");
       xhr.open('GET', '/api/data');
       xhr.onload = () => { data = JSON.parse(xhr.responseText) };
       xhr.send();
     ">
  <div x-text="data?.message || 'Loading...'"></div>
</div>
```

Despite the shortcomings of this type of `eval` approach, it is still a very convenient option to switch like this and for this Alpine.js can be given a plus. In the same HTMX you will use only `XMLHTTPRequest` without the ability to change it.

**HMPL**

Unfortunately (or better yet, fortunately), HMPL does not support `XMLHTTPRequest` requests and everything is built on `fetch`, which is not replaceable. Requests occur inside the module, you only describe them:

```html
<div>
  <button data-action="increment" id="btn">Click!</button>
  <div>
    Clicks: {{#request src="/api/clicks" after="click:#btn" }}{{/request}}
  </div>
</div>
```

This also has an advantage, because `then`, `catch` and other things are implemented within the module, so you don't have to write it like in jsx.

## Conclusion

Of course, you can use what suits you best in the project. Let's say in the article we looked at the part related to requests to the server, but there is also another part of Alpine.js, which makes it a kind of lightweight framework. But, still, if we take work with the server, then I would advise (who would doubt it) to use HMPL, since it is more tailored for this task. And so, both options are quite good!

## Links to modules:

HMPL - [https://github.com/hmpl-language/hmpl](https://github.com/hmpl-language/hmpl)
Alpine.js - [https://github.com/alpinejs/alpine](https://github.com/alpinejs/alpine)

**Thank you all very much for reading the article!**
