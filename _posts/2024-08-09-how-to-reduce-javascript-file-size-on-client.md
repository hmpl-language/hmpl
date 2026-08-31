---
layout: post
title: "How to reduce javascript file size on client?"
date: 2024-08-09 2:10 PM
categories: blog
tags: [HMPL, JavaScript, File-Size, optimization, performance, web-development, Vue.js, client-side]
---

Hello everyone! In this post I would like to tell you how you can reduce the size of javascript files several times thanks to such a template language as [hmpl](https://github.com/hmpl-lang/hmpl).

The technological approach that appears in the post is not new, but nevertheless is popular enough today to be worth talking about.

Reducing the size of the javascript file will allow the pages to load faster on the client. If we take modern SPA, it turns out that the file sizes, even taking into account all the minifications, are still quite large. Of course, once you load a page once, it's easier to navigate it, but the first load time itself can be from one second to, say, several minutes with a bad internet connection. Few customers will want to wait that long.

When using most frameworks and libraries for creating UI, you have to write a lot of boilerplate code. Each symbol takes up memory space. Let's take a Vue.js clicker:

```javascript
createApp({
  setup() {
    const count = ref(0);
    return {
      count,
    };
  },
  template: `<div>
        <button @click="count++">Click!</button>
        {% raw %}<div>Clicks: {{ count }}</div>{% endraw %}
    </div>`,
}).mount("#app");
```

A super simple clicker, but even it requires a fair amount of lines of code in js, let alone those cases when the application is more or less large.

![File size](/images/2024-08-09-how-to-reduce-javascript-file-size-on-client/image1.png)

> Even without two commas, there could be a few bytes less

This is not only a problem with Vue, but also with other frameworks and libraries that work in a similar way. But, that's not the only point. There are a huge number of additional modules that go to them, and to them go the same number of additional modules, and so on to "infinity".

In fact, one of the solutions to this problem was proposed long ago and it is trivially simple - it is to prepare the UI on the server and simply load it on the client. Thanks to this, the size of the application files can be significantly reduced. This is exactly the idea used in HMPL.

In the example, I will also try to make a clicker, but using hmpl.js.

```javascript
document.querySelector("#app").appendChild(
  hmpl.compile(
    `<div>
        <button>Click!</button>
        {% raw %}<div>Clicks: {{#request src="/api/clicks" after="click:button"}}{{/request}}</div>{% endraw %}
    </div>`
  )().response
);
```

As you can see, the UI will be the same, but the file size will be a little smaller.

![File size](/images/2024-08-09-how-to-reduce-javascript-file-size-on-client/image2.png)

_Even if you minify the files and remove all unnecessary spaces from the templates, maybe the files will be on par or something bigger, but this is just an assumption on small examples. If we take large applications, then it is obvious that with this approach there will be much less js._

As can be seen from the example, the functionality of calculating and storing the application state can, if desired, be moved to the server.

As you can see from the example, the functionality of calculating and storing the application state can, if desired, be moved to the server. It is clear that if there are a huge number of users, this will simply bring the server down, but the fact that the user interface is the same is important.

Yes, of course, this method has not only such a disadvantage, but also the reusability of the UI, how to cache the UI so as not to load everything a hundred times and much more. An alternative is important, which, if properly configured, can compete with most modern solutions.

Thank you all very much for reading this post!

List of materials:

- [HMPL docs](https://hmpl-lang.dev/introduction.html)
- [Vue docs](https://vuejs.org/guide/introduction.html)
