---
layout: post
title: "Differences between HMPL and HTMX"
date: 2024-08-10 2:10 PM
categories: blog
tags: [HMPL, HTMX, Comparison, web-development, JavaScript, template-language, HTML]
---

Hello everyone! In this post I would like to tell you about the differences between the HMPL template language and the HTMX library. This question often arises when first getting to know the language, so I will try to describe the differences as fully as possible.

I have highlighted a list of differences that I believe are the most significant:

1: **Concepts**. The first and probably the most important difference between HTMX and HMPL is the very concept of the two modules. HMPL is a template language that will be supported and developed as such. That is, linters, themes, syntax support (`.hmpl` extensions) in text editors, programs, and the like. HTMX is a set of tools that expand the capabilities of html using tags, classes, nesting, and the like.

2: **Syntax**. The second and no less important difference is the syntax. In HMPL, everything is built on objects. In HTML, you kind of "pass" a request object and, at the output, again, you get an `HMPLInstance` object, which contains nodes, request status, etc.:

```hmpl
<div>
  {
    {
      "src": "http://localhost:8000/api/test"
    }
  }
</div>
```

In HTMX the basic syntax is tag attributes, as well as nesting of constructions that relate to the request:

```html
<button hx-get="/click">
  Click Me!
  <img class="htmx-indicator" src="/spinner.gif" />
</button>
```

In this case, the nested structure is an `img` with the "htmx-indicator" `class`.

3: **Working with javascript**. The second and probably no less important difference is the process of working with javascript. In HMPL, all work is built only on javascript. There, objects with nodes are created, RequestInit objects are passed to requests, etc. That is, the very concept of the language assumes that the main work will be done there, although you can make a separate file and write the syntax of the language, all the same, its processing will occur manually through js:

```javascript
const templateFn = require("./main.hmpl");

const elementObj = templateFn();
```

In HTMX, working with javascript fades into the background. Almost all work occurs in the original html, without resorting to js. This is like a basis, because it is convenient when you connect a file and no longer return to js and get work with the server without hassle:

```html
<script src="https://unpkg.com/htmx.org"></script>
<!-- have a button POST a click via AJAX -->
<button hx-post="/clicked" hx-swap="outerHTML">Click Me</button>
```

But when you need to pass parameters to the server to receive HTML, configure `AbortSignal` for a request, in general, integrate somehow more tightly with the server, then HMPL is intended for such options, because this is already work with js.

4: **Real DOM**. Each, so to speak, "component" of HMPL is independent of anything. That is, when creating an `HMPLInstance`, it contains a separate node or array of nodes that are not connected to other instances and the real DOM in principle. If you specify the `after` property in an object, it will search only inside the copy of HTML that is specified during compilation:

```javascript
import { compile } from "hmpl-js";

const templateFn = compile(
  `<div>
    <button class="getHTML">Get HTML!</button>
    { 
      {
        "src":"/api/test",
        "after":"click:.getHTML"
      } 
    }
  </div>`
);

const elementObj1 = templateFn();
const elementObj2 = templateFn();
```

In HTMX, work occurs with the real DOM and with the `document` in general. That is, let's say, the `hx-target` property will search for a target throughout the DOM:

```html
<button
  hx-post="/clicked"
  hx-trigger="click"
  hx-target="#parent-div"
  hx-swap="outerHTML"
>
  Click Me!
</button>
```

5: **Request sending method**. In HMPL, the request is sent by default via `fetch`, which gives support for future functionality. For now, `XMLHTTPRequest` support has not been made and, most likely, it is unlikely to be. This has its downsides, because old browser versions will not be supported (`fetch` was introduced relatively recently, I may be mistaken, but it seems to have been in 2015 as a web api). In HTMX, the request is made via `XMLHTTPRequest` by default, which gives the advantage of supporting old browsers, but also a disadvantage, because fetch has become a new standard, although in general, this does not affect the work, but, again, `XMLHTTPRequest` was developed in 2000.

Here are the main 5 differences, which, in my opinion, are the most significant between HMPL and HTMX. Of course, you can find a bunch of other minor differences or go and joke and say that there is a difference in 3 letters in words or in sites, but this is not serious.

Thank you all for reading the post!

Sources:

- [HMPL Docs](https://hmpl-lang.dev/introduction.html)
- [HTMX Docs](https://htmx.org/docs)
