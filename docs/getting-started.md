# Getting started

After installation using any convenient method described in [Installation](/installation.md), you can start working with the server in the following way:

```html
<script src="https://unpkg.com/json5/dist/index.js"></script>
<script src="https://unpkg.com/hmpl-js/dist/hmpl.min.js"></script>
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

Also, to work with the module, you should set up a server. You can see how to do this on the [Server Configuration](/server-configuration.md) page.
