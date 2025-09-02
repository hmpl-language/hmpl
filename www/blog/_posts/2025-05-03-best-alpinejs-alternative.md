---
layout: post
title: "Best Alpine.js Alternative"
date: 2025-05-03 14:10:00 +0300
categories: blog
tags: [HMPL, Alpine.js, JavaScript, comparison, web-development, alternatives, frontend]
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

In modern web development, the choice of interface rendering approach plays a key role. We will consider two fundamentally different methods: template compilation in HMPL and the declarative approach of Alpine.js.

**HMPL**

HMPL uses client-side template compilation:

```javascript
const templateFn = hmpl.compile(`
  <div>
    {% raw %}{{#request 
       src="/api/my-component"   
       indicators=[
         {
            trigger: "pending"
            content: "<p>Loading...</p>"
         }
       ]}}
    {{/request}}{% endraw %}
  </div>
`);

// Usage
const component = templateFn();
```

**Alpine.js**

Alpine.js offers a declarative style:

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

---

## Customization of server requests

Efficiently managing server requests is crucial for dynamic web applications.

**Alpine.js Example:**

```html
<div
  x-data="{ user: null, error: null }"
  x-init="fetch('/api/user')
       .then(r => r.json())
       .then(data => user = data)
       .catch(e => error = e)"
></div>
```

**HMPL Example:**

```javascript
const elementObj = templateFn(({ request: { event, clearInterval } }) => {
  clearInterval?.();
  return {
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "text/html"
    },
    redirect: "follow",
    get: (prop, value) => {},
    referrerPolicy: "no-referrer",
    body: new FormatData(event.target, event.submitter)
  };
});
```

---

## Disk space

**Alpine.js:**

```javascript
document.querySelector("#app").innerHTML =
  `<div x-data="{ count: 0, l() { fetch('/a').then(r => r.text()).then(d => this.c = d)}}"><button @click="l()">Click!</button><div>Clicks: <span x-text="c"></span></div></div>`;
```

**HMPL:**

```javascript
document
  .querySelector("#app")
  .append(
    hmpl.compile(
      `<div><button>Click!</button><div>Clicks: {% raw %}{{#r src="/api/clicks" after="click:button" }}{{/r}}{% endraw %}</div></div>`
    )().response
  );
```

---

## What's under the hood

**Alpine.js** supports both `fetch` and `XMLHTTPRequest`:

```html
<div
  x-data="{ data: null }"
  x-init="
       const xhr = new XMLHttpRequest();
       xhr.overrideMimeType('text/html');
       xhr.open('GET', '/api/data');
       xhr.onload = () => { data = JSON.parse(xhr.responseText) };
       xhr.send();
     "
>
  <div x-text="data?.message || 'Loading...'"></div>
</div>
```

**HMPL** uses only `fetch`:

```html
<div>
  <button data-action="increment" id="btn">Click!</button>
  <div>
    Clicks: {% raw %}{{#request src="/api/clicks" after="click:#btn"
    }}{{/request}}{% endraw %}
  </div>
</div>
```

---

## Conclusion

Both options have their strengths. For server requests specifically, HMPL is more tailored for this task, while Alpine.js works well as a lightweight framework.

## Links to modules:

- [HMPL GitHub](https://github.com/hmpl-language/hmpl)
- [Alpine.js GitHub](https://github.com/alpinejs/alpine)

**Thank you all very much for reading the article!**
