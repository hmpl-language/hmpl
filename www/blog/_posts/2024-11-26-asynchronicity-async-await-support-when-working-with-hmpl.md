---
layout: post
title: "Asynchronicity: async await support when working with HMPL"
date: 2024-11-26 2:10 PM
categories: blog
tags: [HMPL, JavaScript, async-await, asynchronous, Promise, web-development, tutorial]
---

In this short article I would like to consider working with asynchrony in HMPL. By default, in order to get a response from the server after an unspecified time, you need to specify a callback function in `HMPLRequestInit`. The key will be `get`. In the code, it looks like this:

```javascript
const elementObj = templateFn({
  get: (prop, value, requestObject) => {
    switch (prop) {
      case "response":
        if (!requestObject) console.log(requestObject);
        console.log("Response:");
        console.log(value);
        break;
      case "status":
        console.log("Status:");
        console.log(value);
        break;
    }
  }
});
```

With this approach, you can easily work with the server, but what if you need to specify `async` `await` so that the code is synchronous? For this, there is a little trick that will allow you to do this. We can wrap the entire code in `Promise` and resolve it when receiving data. How it looks in code:

```javascript
const val = await new Promise((res, rej) => {
  templateFn({
    get: (prop, value, requestObject) => {
      switch (prop) {
        case "response":
          if (!value) return;
          res(value);
          break;
      }
    }
  });
});
```

This way we can easily get the right response at the right time. If the request will take more than a few seconds, then in order not to wait for the server's response, we can make a `setTimeout`, which will resolve the `Promise` when we have waited too long:

```javascript
const val = await new Promise((res, rej) => {
  setTimeout(() => res("timeout"), 2000);
  templateFn({
    get: (prop, value, requestObject) => {
      switch (prop) {
        case "response":
          if (!value) return;
          res(value);
          break;
      }
    }
  });
});
```

Here, whatever resolves faster will work. Moreover, the macro task `setTimeout` will not wait an hour until the response from the server from the micro task comes, even if we have such a call stack. That is, timeout should work.

Links to documentation:

[https://hmpl-lang.dev/hmpl.html#compile](https://hmpl-lang.dev/hmpl.html#compile)
