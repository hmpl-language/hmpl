---
home: true
title: Home
heroImage: images/logo_new.svg
actions:
  - text: Get Started
    link: /getting-started.html
    type: primary

  - text: Demo Sandbox
    link: https://codesandbox.io/p/sandbox/basic-hmpl-example-dxlgfg
    type: secondary

features:
  - title: Fully customizable
    icon: wrench
    details: When working with server-side HTML, unlike HTMX and similar modules, you can almost completely customize requests to the server
  - title: Syntax
    icon: code
    details: The language is syntactically object-based and integrated with a robust <a href="https://www.npmjs.com/package/json5">JSON5</a> parser used by millions of people
  - title: Supportability
    icon: clock
    details: The basis of the language is fetch and the new ECMAScript and Web APIs features that come with it

footer: Licensed under MIT
---

## Usage

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

### Result

<div id="wrapper">
  <div>
    <div>
      <form @submit.prevent="switchComponent" id="form">
        <div class="form-example">
          <label for="login">User name: </label>
          <input v-model="login" type="text" name="login" id="login" required />
        </div>
        <div class="form-example">
          <input type="submit" value="Register!" />
        </div>
      </form>
      <p><component :is="currentComponent"></component></p>
    </div>
  </div>
</div>

<script setup>
  import { createCommentVNode, h, ref } from 'vue'
  let id = ref(0);
  const login = ref("")
  const els = [createCommentVNode("hmpl0"), h("div", "Loading...")];
  const Comment = (_, ctx) => els[0];
  const Loading = (_, ctx) => els[1];
  const currentComponent = ref(Comment)
  const switchComponent = () => {
    const isComment = currentComponent.value === Comment;
    if(isComment){
      currentComponent.value = Loading;
      setTimeout(()=>{
        currentComponent.value = h("span", `Hello, ${login.value}!`);
        login.value = "";
      }, 300);
    }
  }
</script>

## Why hmpl?

The HMPL template language extends the capabilities of regular HTML by adding request objects to the markup to reduce the code on the client. When creating modern web applications, frameworks and libraries are used, which entail the need to write a bunch of boilerplate code, as well as connecting additional modules, which again make JavaScript files very large. If you recall the same SPA, then there js files can reach several hundred megabytes, which makes the first site load speed quite long. All this can be avoided by generating the markup on the server and then loading it on the client. Example of comparing the file size of a web application on Vue and HMPL.js:

```javascript
createApp({
  setup() {
    const count = ref(0);
    return {
      count
    };
  },
  template: `<div>
        <button @click="count++">Click!</button>
        <div>Clicks: {{ count }}</div>
    </div>`
}).mount("#app");
```

> Size: **226** bytes (4KB on disk)

```javascript
document.querySelector("#app").append(
  hmpl.compile(
    `<div>
        <button>Click!</button>
        <div>Clicks: {{ src: "/api/clicks", after: "click:button" }}</div>
    </div>`
  )().response
);
```

> Size: **209** bytes (4KB on disk)

If we do not take into account that in one case we store the state on the client, and in the other on the server, as well as the response speed from the server, then we can see that with different file sizes we get the same interface. And this is only a small example. If we take large web applications, then the file sizes there can be several times smaller.

## Webpack

Module has its own loader for files with the `.hmpl` extension. You can include [hmpl-loader](https://www.npmjs.com/package/hmpl-loader) and use the template language syntax in separate files:

### main.hmpl

```hmpl
<div>
  {
    {
      src: "/api/test"
    }
  }
</div>
```

### main.js

```javascript
const templateFn = require("./main.hmpl");

const elementObj = templateFn();
```

For the loader to work, it is better to use versions `0.0.2` or higher.
