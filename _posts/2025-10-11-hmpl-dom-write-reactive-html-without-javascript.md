---
layout: post
title: "Write Reactive HTML Without JavaScript"
date: 2025-10-11 20:00 PM
categories: blog
tags: [webdev, javaScript, opensource, programming]
---


Hello! This is not clickbait. I thought for a long time about what to call this article, but it is hard to convey in words what is felt. Therefore, I wrote simply as I felt.

For a long year we have been supplementing the template language, but the range of applied use was quite limited. We developed within the framework of the template paradigm, but, in essence, it was correct, but in an applied  [project](https://github.com/hmpl-language/hmpl-dom)  it is still quite difficult to implement this without something serious.

By serious I mean a framework, or something like that, that supported the syntax by default, but, in fact, if jsx has react, then it is quite difficult to build a structure on it, since it itself is structural.

Therefore, we took a different path, which I will try to describe in this article.

##  Structural Modules and the Real DOM

Whatever anyone says, the time of template languages ​​is a bit different. Today, many people look at artificial intelligence as something breakthrough. And it is, but the fact is that it is not everything in our world. About 10 years ago, there was active development of various template languages, but now you are more likely to find 1000 new AI projects than one with templates.

And this is not surprising, because with the advent of jsx, ejs and handlebars, we can consider that this topic has exhausted itself and humanity can no longer come up with anything better. Maybe it is so, but only in some aspects. We interact with the server in the same way, and php to js, ​​no matter how much you want, you can’t normally attach it.

So, as an experiment, we created this project to move this topic forward.

```html
<div class="container">
  {{#request src="/api/my-component.html"}}
    {{#indicator trigger="pending"}}
      <p>Loading...</p>
    {{/indicator}}
  {{/request}}
</div>
```
HTMX, no matter what SEO techniques they use and how caricatured they are in some sense, have nevertheless proven over 10-12 years of work on the topic that this topic is truly relevant in development. Together with Alpine.js, we see that not all people want to work on frameworks. This is correct, but it is also difficult and cumbersome on the other hand.

**This topic**, for some reason, was actively developed in attributes 3-4 years ago, but  **for some reason no one looks at template languages**. It's as if the hype on them passed 10 years ago and everyone thinks that they are relics of the past, but this is not so.

We believe that this topic is not forgotten, but we cannot deny the fact that today most of such projects are based on working with the real DOM. There is simply no escape from this.

## Hype on Attributes

Anyone who thinks that in the world of development  **hype can be out of nowhere is wrong**. Today, there are facts that in the state of the market today, people are not ready to switch to something more monumental, since it is easier to sit down at the framework. Therefore, working with the real DOM, when we connect only a couple of files - this is important. If you remember the same Docsify, to create documentation you do not need to install a bunch of packages that are not related to JS at all, as is done with Jekyll, this is the whole point.

Therefore, no matter how much we develop the theme of the template language, in a vacuum it is quite difficult to use, therefore, in fact, an obvious decision was made to supplement the functionality with a new module, which is called  **hmpl-dom**.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Example</title>
  </head>
  <body>
    <main>
      <template hmpl>
        <div>
          {{#request src="/api/my-component.html"}}
            {{#indicator trigger="pending"}}
              <p class="indicator">Loading...</p>
            {{/indicator}}
          {{/request}}
        </div>
      </template>
    </main>
    <script src="https://unpkg.com/json5/dist/index.min.js"></script>
    <script src="https://unpkg.com/dompurify/dist/purify.min.js"></script>
    <script src="https://unpkg.com/hmpl-js/dist/hmpl.min.js"></script>
    <script src="https://unpkg.com/hmpl-dom/dist/hmpl-dom.min.js"></script>
  </body>
</html>
```

Thanks to him, we combined the approach of a template language with working with a real DOM. I am convinced that attributes by definition, no matter how extensible they seem (like in Alpine.js, when you write expressions with functions there), they cannot be a full-fledged replacement.

Yes, they have their advantages, but it's not about them, it's about working with the real DOM without js.

## What if I need to pass  `RequestInit`?

No one will move away from js, even in such an implementation. Its meaning is in the choice of using js or not, as well as in the simplicity that is currently on the market.

**index.html**

```
<template data-hmpl data-config-id="clicker-config">
  <div>
    <button data-action="increment" id="btn">Click!</button>
    <div>
      Clicks: {{#request src="/api/clicks" after="click:#btn"}}{{/request}}
    </div>
  </div>
</template>
```
**script.js**  

```
import { init } from "hmpl-dom";

init([
  {
    id: "clicker-config",
    value: {
      compile: { memo: true },
      templateFunction: ({ request: { event } }) => ({
        body: JSON.stringify({
          action: event.target.getAttribute("data-action")
        })
      })
    }
  }
]);
```
We can still pass everything that was done before. It's just another level of nesting, when we had it before only within one compile function, now in a whole connected chain of templates, where a separate templateFunction is created for each (yes, we wouldn't take outerHTML from the entire page, because that would be just stupid.

## Links
More about this project you can find here:

-   [Repo](https://github.com/hmpl-language/hmpl-dom)
-   [Documentation Page](https://hmpl-lang.dev/dom.html)

Also, if you want to support us, you can put a star on our main project. Thanks!

*This article is based on the original tutorial by Anthony Max, available on [Dev.to](https://dev.to/hmpljs/hmpl-dom-v001-release-the-most-important-module-4783).*