---
layout: post
title: "HMPL integration with JSON5"
date: 2024-12-05 01:00 AM
categories: blog
tags: [HMPL, JSON5, JavaScript, integration, web-development, JSON, data-format]
---

The new version of HMPL has integration with the JSON5 module, which will qualitatively improve the work several times! In this article, I would like to describe in more detail why this was done and why it is necessary.

## About JSON5

First of all, it is worth noting the long-standing problem with JSON, which exists in JavaScript, and indeed in almost any other programming language that works with this format.

When working with objects, it seems that everything is convenient and practical. JSON is very convenient and why do we need additional packages at all if there is `JSON.parse` and `JSON.stringify`, which will be useful in almost all cases of work? But, let's take this code:

```javascript
const user = {
  id: 0,
  name: "Tony",
  age: 43,
  hobbies: ["Building anthill"]
};

const jsonString = JSON.stringify(user);
```

Now, let's output to the console what we got:

```javascript
console.log(jsonString);

// output - {"id":0,"name":"Tony","age":43,"hobbies":["Building anthill"]}
```

We got a seemingly ordinary string, which can easily be translated back with parsing and everything is cool, only this string takes up "a lot" of space on the disk, and also imagine if you write all this manually, and not in JavaScript through a convenient object? Yes, this is the main problem with this functionality.

If we take the same JavaScript object and write it normally in a string, then `JSON.Parse` will not parse it, giving an error:

```javascript
const userString = `{
    id: 0,
    name: "Tony",
    age: 43,
    hobbies: ["Building anthill"],
}`;

JSON.parse(userString);

// Uncaught SyntaxError: Expected property name or '}' in JSON at position 6 (line 2 column 5)
//   at JSON.parse (<anonymous>)
```

To fix this, we will have to adjust the string to the format. To do this, we will have to manually constantly write double quotes near the object properties. We will always have to not put a comma at the end, not write comments in the string like in JS, etc. We kind of get convenient functionality, but if we consider it as something that we will write manually, then it is simply incredibly inconvenient, because everyone is used to writing a JS object manually, and not JSON.

So, the [JSON5](https://www.npmjs.com/package/json5) module allows you to write strings almost like in JS and not have the problems described above:

```javascript
import JSON5 from "json5";

const userString = `{
    id: 0,
    name: "Tony",
    age: 43,
    hobbies: ["Building anthill"],
}`;

JSON5.parse(userString);

/*
{
    id: 0,
    name: "Tony",
    age: 43,
    hobbies: ["Building anthill"],
};
*/
```

Even the slogan of the module itself says: "JSON5 – JSON for Humans".

Of course, the problem may seem insignificant at first glance, but only until it becomes a daily issue. It's okay to correct quotes once, remove a comma, but doing it manually every day is incredibly tedious. Therefore, as one of the modules that solves this problem, it is the best fit for all of this.

You can even remember not abstract examples, but specific ones that are used in work. Have you ever configured a configuration file when working with some code assemblers or something else? The same linters, prefixers, module builders, various text editors - all this works, including through JSON.

And, usually, such files are filled manually by users. And, now there is a need to parse such moments, for example, here is an example of a config:

```javascript
const config = `{
 "useStrict": true, // or false
 "withComments": false,
 "indent": "tab", // "two spaces"
 ...
}`;
```

And, such an object also needs to be parsed on the application side. These parameters can be any and in any format, as well as with comments and other jokes. Manually writing such a parser is not cost-effective, and simply unnecessary.

## About the benefits for HMPL

The HMPL module is based on extended HTML markup, to which we pass objects, and at the output we receive a ready component from the server. Let's take an example of the code:

```javascript
import { compile } from "hmpl-js";

const templateFn = compile(
  `<div>
  <form onsubmit="function prevent(e){e.preventDefault();};return prevent(event);" id="form">
    <div class="form-example">
      <label for="login">Login: </label>
      <input type="login" name="login" id="login" required />
    </div>
    <div class="form-example">
      <input type="submit" value="Register!" />
    </div>
  </form>
  <p>
    {
      {
        src: "/api/register",
        after: "submit:#form",
        repeat: false,
        indicators: [
          {
            trigger: "pending",
            content: "<p>Loading...</p>"
          }
        ]
      }
    }
  </p>
</div>`
);
const initFn = (ctx) => {
  const event = ctx.request.event;

  return {
    body: new FormData(event.target, event.submitter),
    credentials: "same-origin"
  };
};
const obj = templateFn(initFn);
const wrapper = document.getElementById("wrapper");
wrapper.appendChild(obj.response);
```

As we can see, for a custom request to the server, you need to write a couple of properties for which it will be easy to manually put quotes in pairs. Specifically, this is the markup:

```html
  <p>
    {
      {
        src: "/api/register",
        after: "submit:#form",
        repeat: false,
        indicators: [
          {
            trigger: "pending",
            content: "<p>Loading...</p>"
          }
        ]
      }
    }
  </p>
```

Before version 2.2.0, the module was based on `JSON.parse`, so this whole thing was completely inconvenient. The `stringify` function was introduced, which somehow bypassed this point, but it's clear that it's still in separate ones `.hmpl` files js code will be problematic to write. Here is an example of `stringify` and a file:

```javascript
const request = hmpl.stringify({
  src: "/api/test"
});
const templateFn = hmpl.compile(`{${request}}`);
```

**mail.hmpl**:

```html
<div>{% raw %}{{#request src="/api/test"}}{{/request}}{% endraw %}</div>
```

Therefore, I think that integration with JSON5 is the best way to make sites even faster and smaller in size. Now, it's generally super convenient, because you can just copy an object from JavaScript and paste it into an HTML file.
