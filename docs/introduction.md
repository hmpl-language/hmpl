# Introduction

🌐 hmpl is a small template language for displaying UI from server to client. It is based on <em>customizable</em> requests sent to the server via <a href="https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API">fetch</a> and processed into ready-made HTML. The language is syntactically object-based and integrated with <a href="https://www.npmjs.com/package/json5">JSON5</a> and <a href="https://www.npmjs.com/package/dompurify">DOMPurify</a>. Reduce the size of your javascript files and display the same UI as if it was written in a modern framework and apply Server-Side Rendering, Static Site Generation, Incremental Static Generation (SSR, SSG, ISG) without robot indexing on any sites without Next.js, Remix, Nuxt.js!

## Example 1

### HTML before

```html
<div id="wrapper"></div>
<script src="https://unpkg.com/json5/dist/index.js"></script>
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

  /**
   * obj = {
   *  response: div,
   *  status: 200
   * }
   */

  wrapper.appendChild(obj.response);
</script>
```

### API route - /api/test

```html
<span>123</span>
```

### HTML after

```html
<div id="wrapper">
  <div><span>123</span></div>
</div>
```

## Example 2

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
