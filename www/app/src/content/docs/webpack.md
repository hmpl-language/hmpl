---
title: Webpack
description: Integrate HMPL with Webpack
head:
  - tag: meta
    attrs:
      name: keywords
      content: hmpl, hmpl webpack integration, webpack hmpl loader, hmpl template loader, webpack dynamic html, hmpl-loader examples
---

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

For the loader to work, it is better to use versions `0.0.6` or higher.
