---
title: Migration from v2 to v3
description: Upgrade guide from HMPL v2 to v3
head:
  - tag: meta
    attrs:
      name: keywords
      content: hmpl migration, upgrade guide, hmpl v3 changes, request syntax, safer templates, version upgrade
---

HMPL v3 introduces a **simpler, safer, and more flexible request configuration syntax**.
This guide explains the key differences and how to update your existing templates.

## What Changed

In **HMPL v2**, request configuration blocks used JSON-like objects inside `{{ }}`:

```html
{{src:"/api/test" method:"GET"}}
```

In HMPL v3, configurations are moved into block syntax with key=value pairs, using either `{{#request}}` or the short form `{{#r}}`:

```html
{{#request src="/api/test" method="GET"}}{{/request}}
```

## Key Improvements in v3

- Cleaner syntax — no need for colons : or enclosing in {}.

- Standardized blocks — uses `{{#request ...}} ... {{/request}}` or `{{#r ...}} ... {{/r}}`.

- Supports nested values — arrays [] and objects {} inside key=value.

- No unpaired curly braces — prevents hard-to-debug template errors.

- Better parsing & validation — safer integration with your HTML markup.

## Migration Example

Before (v2):

```html
<div>{{src:"/api/count" after:"click:#btn"}}</div>
```

After (v3):

```html
<div>{{#request src="/api/count" after="click:#btn"}}{{/request}}</div>
```

You can also use the short form `{{#r}}`.

### get function

Also, the get function's arguments have changed. Now, the request object comes fourth, not third, because the context comes third.

Before (v2):

```typescript
type HMPLRequestGet = (prop: string, value: any, request?: HMPLRequest) => void;
```

After (v3):

```typescript
type HMPLRequestGet = (
  prop: string,
  value: any,
  context: HMPLInstanceContext,
  request?: HMPLRequest
) => void;
```

This is done in connection with the introduction of the `interval`.

# Done!

After migrating, your templates will be cleaner, safer, and fully compatible with HMPL v3.
