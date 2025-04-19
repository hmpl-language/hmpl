# Webpack

Module has its own loader for files with the `.hmpl` extension. You can include [hmpl-loader](https://www.npmjs.com/package/hmpl-loader) and use the template language syntax in separate files:

## main.hmpl

```hmpl
<div>
  {{#request src="/api/test"}}{{/request}}
</div>
```

## main.js

```javascript
const templateFn = require("./main.hmpl");

const elementObj = templateFn();
```

For the loader to work, it is better to use versions `0.0.2` or higher.
