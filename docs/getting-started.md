# Getting started

After installation using any convenient method described in [Installation](/installation.md), you can start working with the server in the following way:

```html
<script src="https://unpkg.com/hmpl-js@2.1.3/dist/hmpl.min.js"></script>
<script>
  const templateFn = compile(
    `{ 
       {
         "src":"/api/test" 
       } 
     }`
  );
  const elementObj = templateFn();
</script>
```

Or, if you need to work with hmpl as a module, there is a list of imported functions, such as `compile`:

```javascript
import { compile } from "hmpl-js";

const templateFn = compile(
  `{ 
     {
       "src":"/api/test" 
     } 
   }`
);

const elementObj = templateFn();
```

These will be the two main ways to interact with the server. In future versions, the functionality will be expanded, but the methods themselves will not change.
