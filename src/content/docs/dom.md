---
title: Working with the real DOM
description: Working with the Document Object Model in HMPL
head:
  - tag: meta
    attrs:
      name: keywords
      content: hmpl dom, hmpl-dom, mount templates, server driven components, dynamic html, request helper
---

`hmpl-dom` is a library for integrating HMPL templates directly into the DOM. It allows you to use templates written with [hmpl-js](https://www.npmjs.com/package/hmpl-js) right in your HTML documents using the `<template>` tag, and automatically mounts them into the DOM.

> Requires `hmpl-js` version `3.0.5` or higher.

## Installation

```bash
npm install hmpl-dom
```

## Usage

Add a template to your HTML file using the `<template>` tag and the `data-hmpl` or `hmpl` attribute:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Example</title>
  </head>
  <body>
    <main>
      <template data-hmpl data-config-id="my-component-config">
        <div>
          {{#request src="/api/my-component.html"}} {{#indicator
          trigger="pending"}} Loading... {{/indicator}} {{/request}}
        </div>
      </template>
    </main>
    <script src="https://unpkg.com/json5/dist/index.min.js"></script>
    <script src="https://unpkg.com/dompurify/dist/purify.min.js"></script>
    <script src="https://unpkg.com/hmpl-js/dist/hmpl.min.js"></script>
    <script src="https://unpkg.com/hmpl-dom/dist/hmpl-dom.min.js"></script>
  </body>
</html>
```

<details>
<summary>Explain this HTML</summary>

This HTML example demonstrates how to use the `hmpl-dom` library to mount HMPL templates directly in your page:

- The `<template data-hmpl data-config-id="my-component-config">` tag defines a template that will not be rendered immediately. It contains HMPL syntax for dynamic content loading.
- Inside the template, the `{{#request src="/api/my-component.html"}} ... {{/request}}` block will fetch content from the server. While the request is pending, the `{{#indicator trigger="pending"}} Loading... {{/indicator}}` block will show a loading message.
- The scripts at the bottom load all required dependencies from CDN: `json5`, `dompurify`, `hmpl-js`, and `hmpl-dom`.
- When the page loads, `hmpl-dom` will automatically find all `<template data-hmpl ...>` elements, compile them using HMPL, and replace the template with the rendered result in the DOM.

This approach allows you to declaratively define dynamic, server-driven components in your HTML, and have them automatically rendered and updated by the HMPL engine.

</details>

## Configs

Each config object for `init` can contain:

- **id**: (string) — Unique identifier for the template, must match the `data-config-id` in HTML.
- **value**: (object)
  - **compile**: (object) — Compile options for HMPL (e.g., `{ memo: true }`).
  - **templateFunction**: (object) — Data or parameters to be passed to the template function.

Example:

```javascript
init([
  {
    id: "1",
    value: {
      compile: { memo: true },
      templateFunction: { credentials: "include" }
    }
  }
]);
```

## Important Notes

- Each `<template>` must contain exactly one root element.
- The `data-config-id` attribute is not required and cannot be empty.
- For every `configId`, a corresponding option must be defined in the `init` call.

## Example

```html
<template data-hmpl data-config-id="clicker-config">
  <div>
    <button data-action="increment" id="btn">Click!</button>
    <div>
      Clicks: {{#request src="/api/clicks" after="click:#btn"}}{{/request}}
    </div>
  </div>
</template>
```

```javascript
import { init } from "hmpl-dom";

init([
  {
    id: "clicker-config",
    value: {
      compile: { memo: true },
      templateFunction: ({ request: { event } }) => ({
        body: JSON.stringify({
          action: event.target.getAttribute("data-action")
        })
      })
    }
  }
]);
```

## Changelog

See the [GitHub releases page](https://github.com/hmpl-language/hmpl-dom/releases) for changes.

## Contributing

We have a [Contributing Guide](https://github.com/hmpl-language/hmpl/blob/main/CONTRIBUTING.md) that describes the main steps for contributing to the project.

Thank you to all the people who have already contributed to HMPL, or related projects!

## License

This project is licensed under the [MIT License](https://github.com/hmpl-language/hmpl-dom/blob/main/LICENSE).
