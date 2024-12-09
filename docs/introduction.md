# Introduction

🌐 hmpl is a small template language for displaying UI from server to client. It is based on _customizable_ requests sent to the server via [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) and processed into ready-made HTML. The language is syntactically object-based and integrated with [JSON5](https://www.npmjs.com/package/json5). Reduce the size of your javascript files and display the same UI as if it was written in a modern framework.

## Example

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
