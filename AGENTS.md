# HMPL.js — Agent Guide

## Project Overview

This repository contains **HMPL.js**, a small server-oriented and customizable
template language for JavaScript. HMPL is designed for applications that want
server-driven HTML and dynamic UI updates without adopting a large client-side
framework.

The central idea is deliberately different from a traditional SPA:

1. Write ordinary HTML enhanced with HMPL block helpers.
2. Describe when and where a request should be sent.
3. Let the server return HTML fragments or complete components.
4. HMPL parses the response, renders it into the DOM, and exposes request
   lifecycle state to the application.

HMPL is positioned between **HTMX** and template-oriented/server-rendered
solutions such as EJS. It can also be used alongside modern frameworks rather
than replacing them.

### HMPL compared with HTMX and Alpine.js

- **HTMX** enhances HTML with attributes that issue requests and swap server
  responses into the page. HMPL instead uses explicit block-helper syntax such
  as `{{#request ...}}{{/request}}`, supports structured JSON5-like values,
  request initialization callbacks, indicators, memoization, intervals,
  automatic request bodies, response filtering, sanitization, and a typed
  JavaScript API.
- **Alpine.js** provides lightweight client-side reactivity and behavior through
  HTML attributes. HMPL is primarily server-oriented: the server remains the
  source of rendered HTML, while JavaScript is used to compile templates,
  configure requests, and react to request lifecycle values.
- HMPL is a useful alternative when the application should avoid shipping a
  client-side state-management layer or a full framework, but still needs
  event-driven updates, forms, polling, loading/error states, and reusable
  server-rendered components.
- HMPL does not claim that HTMX or Alpine.js are universally inferior. Choose
  HTMX for its concise attribute-based request/swap model, Alpine.js for
  client-local state and behavior, and HMPL when declarative server responses,
  structured configuration, and the typed JavaScript API are the better fit.

The official documentation explicitly presents HMPL as a lightweight
alternative to HTMX and Alpine.js. Keep this positioning accurate in code,
documentation, examples, and marketing copy.

## Repository Layout

### Core package

- [`src/index.ts`](./src/index.ts) is the public package entry point. It
  re-exports `compile`, `stringify`, and all public types, and provides the
  default export.
- [`src/main.ts`](./src/main.ts) contains the implementation: template parsing,
  block-helper extraction, request creation, event binding, response parsing,
  DOM rendering, indicators, memoization, intervals, automatic bodies,
  sanitization, status binding, and error handling.
- [`src/types.ts`](./src/types.ts) contains the public TypeScript contracts,
  including request options, request context, indicators, statuses, auto-body
  options, bind options, compile options, and template-function types.
- [`test/core/`](./test/core/) contains unit tests for compilation, stringifying,
  template functions, warnings, and helper behavior.
- [`test/server/`](./test/server/) and [`test/setup/`](./test/setup/) provide
  mocked request/server and test-environment support.
- [`dist/`](./dist/) and generated coverage output are build artifacts; edit
  `src/`, not generated files.

### Documentation website

- [`www/app/`](./www/app/) is the Astro + Starlight documentation and showcase
  site.
- Documentation pages live under
  [`www/app/src/content/docs/`](./www/app/src/content/docs/).
- Vue components used by interactive examples and the home page are under
  [`www/app/src/components/`](./www/app/src/components/).
- [`www/app/astro.config.mjs`](./www/app/astro.config.mjs) configures Astro,
  Starlight, navigation, sidebar, social links, sitemap generation, and the
  documentation theme.
- The app uses `@astrojs/starlight`, Vue, `starlight-theme-nova`, and the local
  `hmpl-js` package dependency for examples.
- The deployed app/documentation URL used in current user-facing links is
  `https://hmpl-lang.vercel.app/`.

### Blog

- [`www/blog/`](./www/blog/) is a separate Jekyll site.
- Posts are in [`www/blog/_posts/`](./www/blog/_posts/).
- Shared layout pieces are in [`www/blog/_includes/`](./www/blog/_includes/).
- Jekyll configuration is in [`www/blog/_config.yml`](./www/blog/_config.yml).
- The current deployed blog URL used in links is
  `https://blog-hmpl-lang.vercel.app`.
- The blog explains HMPL use cases, comparisons with HTMX/Alpine.js, and
  practical examples. Update links in both sites when changing a public URL.

### Other repository areas

- The language specification is published at
  [spec.hmpl-lang.dev](https://spec.hmpl-lang.dev/).
- Root [`README.md`](./README.md), [`CONTRIBUTING.md`](./CONTRIBUTING.md), and
  [`SECURITY.md`](./SECURITY.md) are the project-level reference documents.

## Installation and Integration Choices

For a JavaScript or TypeScript application, install the core package:

```sh
npm install hmpl-js
```

```js
import { compile } from "hmpl-js";
```

For a React application, install HMPL alongside React if React is not already
installed:

```sh
npm install hmpl-js react react-dom
```

In TypeScript projects, use the React type packages required by the app's React
version and toolchain.

The package manifest includes `json5` and `dompurify` as dependencies. If
sanitization is enabled in a browser integration, the runtime also needs a
DOMPurify instance on `window.DOMPurify`; see the React notes below and the
security documentation.

Choose an integration based on how templates are authored and mounted:

- **Core JavaScript/TypeScript or React:** use `hmpl-js`, `compile(template)`,
  then append `instance.response` to a host element.
- **Declarative templates in HTML:** install the separate `hmpl-dom` package
  with `npm install hmpl-dom`. It scans `<template data-hmpl>` / `<template
hmpl>` elements and mounts their output; see the `hmpl-dom` section below.
- **`.hmpl` source files:** use the project’s documented Vite plugin or Webpack
  loader integration. Do not assume the core package alone configures either
  bundler.
- **CDN:** include JSON5, DOMPurify, and `hmpl-js` in that order. Add
  `hmpl-dom` only when using its declarative DOM integration.

For CDN usage:

```html
<script src="https://unpkg.com/json5/dist/index.min.js"></script>
<script src="https://unpkg.com/dompurify/dist/purify.min.js"></script>
<script src="https://unpkg.com/hmpl-js/dist/hmpl.min.js"></script>
```

The optional `hmpl-dom` script must load after `hmpl-js`:

```html
<script src="https://unpkg.com/hmpl-dom/dist/hmpl-dom.min.js"></script>
```

### Vite plugin

Install the Vite integration as a development dependency:

```sh
npm install --save-dev vite-plugin-hmpl
```

Register it in `vite.config.js` or `vite.config.ts`:

```js
import { defineConfig } from "vite";
import hmplPlugin from "vite-plugin-hmpl";

export default defineConfig({
  plugins: [
    hmplPlugin({
      memo: true,
      sanitize: true
    })
  ]
});
```

Then import `.hmpl` files as template functions:

```js
import templateFn from "./templates/component.hmpl";

const instance = templateFn();
```

Plugin options can set compile defaults such as `memo`, `sanitize`,
`autoBody`, `allowedContentTypes`, `disallowedTags`, and configure `include`
and `exclude` globs. Verify exact options and defaults against the plugin's
documentation before changing plugin configuration.

### Webpack loader

Install the loader as a development dependency:

```sh
npm install --save-dev hmpl-loader
```

Configure the loader for `.hmpl` files using the project's existing Webpack
rules, then import the file as a template function:

```js
const templateFn = require("./templates/component.hmpl");
const instance = templateFn();
```

The official loader documentation recommends `hmpl-loader` version `0.0.2` or
higher. Check the loader's documentation for the exact rule syntax used by the
project's Webpack version.

### Starter project

The official installation guide provides a Vite starter project:

```sh
npx degit hmpl-language/hello-hmpl-starter hello-hmpl
cd hello-hmpl
npm install
```

Use the scripts defined by the generated starter project's `package.json` to
start development or build the application.

The official [installation page](https://hmpl-lang.vercel.app/installation)
covers prerequisites, CDN/npm/bun installation, the starter project, and links
to bundler integrations. For repository-specific details, see
[`www/app/src/content/docs/installation.mdx`](./www/app/src/content/docs/installation.mdx),
[`www/app/src/content/docs/vite-plugin.md`](./www/app/src/content/docs/vite-plugin.md),
and [`www/app/src/content/docs/webpack.md`](./www/app/src/content/docs/webpack.md).

## Public API and Data Flow

The `hmpl-js` package exposes `compile`, `stringify`, and its public TypeScript
types. The default export is an object containing `compile` and `stringify`;
named imports are also supported:

```ts
import hmpl from "hmpl-js";

const template = `<div>{{#request src="/api/items"}}{{/request}}</div>`;
const templateFn = hmpl.compile(template);
const instance = templateFn();
```

Use `hmpl.compile(...)` or the named `compile(...)`; both compile a template
string and return an HMPL template function. `hmpl.stringify(info)` and the
named `stringify(info)` export serialize a request helper. The second argument
to `compile` is compile-time configuration (`HMPLCompileOptions`), not fetch
options.

The usual way to instantiate a template is simply `templateFn()`. The optional
argument to the returned function is named `options` and has this
`HMPLTemplateFunctionOptions` union:

1. A single `HMPLRequestInit` object shared by requests in the template.
2. An `HMPLRequestInitFunction`, which receives HMPL request context and returns
   an `HMPLRequestInit` object.
3. An array of `{ id, value }` identification entries, used to associate
   request initialization options with helpers that declare a matching
   `initId`.

These are request-initialization options, not a required argument, and not a
generic “request init or function” API. Use `templateFn()` when no custom fetch
configuration is needed. The returned `HMPLInstance` contains `response` and
may contain `status` and `requests`, depending on the template.

```js
import { compile } from "hmpl-js";

const templateFn = compile(`
  <div>
    <button class="load">Load</button>
    {{#request src="/api/items" after="click:.load" repeat=false}}
      {{#indicator trigger="pending"}}<p>Loading...</p>{{/indicator}}
      {{#indicator trigger="error"}}<p>Request failed</p>{{/indicator}}
    {{/request}}
  </div>
`);

const instance = templateFn();
document.querySelector("#app").appendChild(instance.response);
```

Pass one `HMPLRequestInit` object when requests share options:

```js
const instance = templateFn({ credentials: "same-origin" });
```

The `get` option is a callback called with one object argument,
`{ prop, value, context, request }`. It reports instance property changes such
as `"status"` and `"response"`; it is not the callback that returns fetch
options:

```js
const instance = templateFn({
  get: ({ prop, value, context, request }) => {
    if (prop === "status") {
      console.log("Request status:", value, request);
    }
  }
});
```

Use an `HMPLRequestInitFunction` only when fetch options need to be generated
dynamically from the request context, for example to build a form body from the
triggering event:

```js
const instance = templateFn(({ request: { event } }) => ({
  body: new FormData(event.target, event.submitter),
  credentials: "same-origin"
}));
```

For templates with multiple requests that need different options, give each
request an `initId`, then pass an array of matching `{ id, value }` entries to
the template function. `value` can be an `HMPLRequestInit` object or a function
that returns one:

```hmpl
{{#request src="/api/register" after="submit:#form" initId="register"}}
{{/request}}
```

```js
const instance = templateFn([
  {
    id: "register",
    value: ({ request: { event } }) => ({
      body: new FormData(event.target, event.submitter)
    })
  }
]);
```

`stringify(info)` serializes an `HMPLRequestInfo` into a request block string,
which can then be included in a template passed to `compile`:

```js
const requestBlock = stringify({ src: "/api/items" });
const templateFn = compile(`<div>${requestBlock}</div>`);
```

Use the typed API definitions in [`src/types.ts`](./src/types.ts) rather than
inventing untyped option shapes. Preserve `stringify` behavior and tests when
changing parser or renderer internals.

### `hmpl-dom` is a separate integration

[`hmpl-dom`](https://www.npmjs.com/package/hmpl-dom) is a separate package, not
part of the `hmpl-js` package bundle. It scans HTML templates marked with
`data-hmpl` (or `hmpl`), compiles their HMPL markup, and mounts their rendered
output into the DOM. This declarative integration is different from calling
`compile` directly:

```html
<template data-hmpl data-config-id="custom-config">
  <div>
    <button id="load">Load</button>
    {{#request src="/api/items" after="click:#load" repeat=false}} {{#indicator
    trigger="pending"}}
    <p>Loading...</p>
    {{/indicator}} {{#indicator trigger="error"}}
    <p>Request failed</p>
    {{/indicator}} {{/request}}
  </div>
</template>
```

Configure a matching `data-config-id` through `hmpl-dom`'s `init` API. Its
`value.compile` config is passed to HMPL `compile`; `value.templateFunction`
config is passed to the returned template function. For example, monitor status
updates using the `get` callback:

```js
import { init } from "hmpl-dom";

init([
  {
    id: "custom-config",
    value: {
      templateFunction: {
        get: ({ prop, value }) => {
          if (prop === "status" && value === 200) {
            console.log("Request succeeded");
          }
        }
      }
    }
  }
]);
```

When using the global CDN builds, load JSON5, DOMPurify, `hmpl-js`, and then
`hmpl-dom` before initializing it; the global API is `hmplDOM.init([...])`.
The module form uses `import { init } from "hmpl-dom"`. Keep behavior specific
to the external `hmpl-dom` package separate from the core `hmpl-js` API.

## Using HMPL with React

HMPL can coexist with React: let React own an empty host element and let HMPL
own the DOM subtree it inserts into that host. Do not let React render children
inside a subtree that HMPL will replace or mutate.

In Next.js App Router, code using `useEffect`, refs, or browser APIs belongs in
a Client Component (`"use client"`). `compile` and DOM insertion require a
browser DOM, so instantiate templates in an effect, not during server render.

### Mounting a template and reflecting status in React

Keep the template string stable (for example, at module scope) so ordinary
React renders do not recompile and remount it. The `get` callback is the
supported way to reflect HMPL instance updates in React state:

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { compile, type HMPLRequestStatus } from "hmpl-js";

const template = `<div>
  <button id="load">Load items</button>
  {{#request src="/api/items" after="click:#load" repeat=false}}
    {{#indicator trigger="pending"}}<p>Loading...</p>{{/indicator}}
    {{#indicator trigger="rejected"}}<p>Network error</p>{{/indicator}}
    {{#indicator trigger="error"}}<p>Request failed</p>{{/indicator}}
  {{/request}}
</div>`;

export function ItemsPanel() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<HMPLRequestStatus | "idle">("idle");

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let active = true;
    const controller = new AbortController();
    const instance = compile(template)({
      signal: controller.signal,
      get: ({ prop, value }) => {
        if (active && prop === "status") {
          setStatus(value);
        }
      }
    });

    if (instance.response) host.append(instance.response);

    return () => {
      active = false;
      controller.abort();
      host.textContent = "";
    };
  }, []);

  return (
    <section>
      <div ref={hostRef} />
      <output aria-live="polite">
        {status === "idle" ? "Waiting" : String(status)}
      </output>
    </section>
  );
}
```

The `active` guard prevents late request callbacks from updating an unmounted
component. Abort the request in cleanup when appropriate; React Strict Mode
deliberately re-runs effects in development, so an automatically-started
request can otherwise be sent more than once. Clearing the host also prevents
stale HMPL nodes from accumulating. If `template` or options are component
props, include stable values in the effect dependencies and expect cleanup and
re-instantiation when they change.

### Forms and event-derived request options

HMPL can listen to events on DOM nodes in the compiled template. For a form,
use `after="submit:#form"` and derive the request body from the context event.
Prevent the browser’s native form navigation; the example uses a native capture
listener on the HMPL host and removes it during cleanup:

```tsx
const formTemplate = `<div>
  <form id="gallery-form">
    <label>
      Page
      <input name="page" type="number" value="1" min="1" />
    </label>
    <button type="submit">Load images</button>
  </form>
  {{#request
    src="/api/images"
    method="POST"
    after="submit:#gallery-form"
    autoBody=false
  }}
    {{#indicator trigger="pending"}}<p>Loading images...</p>{{/indicator}}
    {{#indicator trigger=400}}<p>Invalid page.</p>{{/indicator}}
    {{#indicator trigger=404}}<p>No images on this page.</p>{{/indicator}}
  {{/request}}
</div>`;

useEffect(() => {
  const host = hostRef.current;
  if (!host) return;

  const preventNavigation = (event: Event) => event.preventDefault();
  host.addEventListener("submit", preventNavigation, true);

  const instance = compile(formTemplate)(({ request }) => {
    const form = request.event?.target;
    if (!(form instanceof HTMLFormElement)) return {};

    const page = new FormData(form).get("page");
    return {
      body: new URLSearchParams({ page: String(page ?? "") }),
      headers: { "Content-Type": "application/x-www-form-urlencoded" }
    };
  });

  if (instance.response) host.append(instance.response);

  return () => {
    host.removeEventListener("submit", preventNavigation, true);
    host.textContent = "";
  };
}, []);
```

This uses `HMPLRequestInitFunction`, not the `get` callback. If using
`autoBody=true` instead, HMPL builds `FormData` from the form submit event; do
not also construct a competing body unless that is intentional.

### Polling and interval cleanup

For polling, combine `after`, `repeat=false`, and `interval` to start the
interval from an event. Save `context.request.clearInterval` in a ref and call
it from both the stop control and effect cleanup:

```tsx
const clearPollingRef = useRef<(() => void) | undefined>(undefined);

useEffect(() => {
  const host = hostRef.current;
  if (!host) return;

  const instance = compile(`<div>
    <button id="start-polling" type="button">Start polling</button>
    {{#request
      src="/api/metrics"
      after="click:#start-polling"
      repeat=false
      interval=1500
    }}
      {{#indicator trigger="pending"}}<span>Refreshing...</span>{{/indicator}}
    {{/request}}
  </div>`)((context) => {
    clearPollingRef.current = context.request.clearInterval;
    return {};
  });

  if (instance.response) host.append(instance.response);

  return () => {
    clearPollingRef.current?.();
    clearPollingRef.current = undefined;
    host.textContent = "";
  };
}, []);
```

An interval without `after` starts immediately. The currently supported
event-triggered interval mode uses `repeat=false`. When a template has multiple
interval requests, retain and clear every interval handle rather than
overwriting one ref with the last callback.

The React-owned stop control can call `clearPollingRef.current?.()` directly;
clear the ref after stopping if the component can be restarted without being
unmounted.

### Status binding, memoization, and sanitization in React

- Use `bind` when the response status should update an attribute inside the
  HMPL-owned subtree. Use `get` when React state or another React-owned UI needs
  the status. These are complementary, not interchangeable.
- `memo=true` is for identical repeated requests and is only supported with
  repeat mode enabled; it is not a substitute for React state or a general
  application cache.
- If enabling `sanitize=true` in a bundled browser app, provide the
  DOMPurify-compatible global required by the core implementation:

  ```tsx
  import DOMPurify from "dompurify";

  useEffect(() => {
    window.DOMPurify = DOMPurify;
  }, []);
  ```

  Initialize the global before mounting a template that can sanitize a
  response.

- Avoid using `dangerouslySetInnerHTML` as a workaround for HMPL integration;
  HMPL already parses and mounts response HTML, and untrusted HTML must be
  sanitized.

The React examples above cover event-triggered requests, POST forms,
status-driven React state, polling and interval cleanup, response sanitization,
and serializing request configuration. Keep React-owned UI outside the HMPL
mount point and let HMPL own the subtree it renders.

### Core implementation invariants

The implementation in [`src/main.ts`](./src/main.ts) has several important
invariants that are easy to break during parser or renderer changes:

- `compile` requires a non-empty template string and an options object.
- A compiled template is expected to contain one root element, or a request-only
  template represented by an HMPL comment placeholder. Multiple root elements
  or unsupported root shapes produce a render error.
- Request blocks are parsed into request objects and replaced in the temporary
  DOM with `<!--hmpl...-->` comment markers. Rendering later resolves those
  markers and inserts server responses at the correct location.
- A compiled template is cloned for each template-function invocation. Do not
  accidentally share mutable DOM nodes, request state, memoized nodes, or
  status-binding state between invocations.
- Request options are validated against the supported option list. Unknown
  request properties, unsupported HTTP methods, invalid attribute types, invalid
  content-type lists, invalid tags, and invalid binding values must remain
  explicit errors rather than being ignored.
- The request pipeline builds a `RequestInit` object from supported fetch
  options, handles headers and timeout/signal interaction, checks response
  status/content type, parses HTML into a template, and updates the relevant
  request nodes.
- `get` callbacks receive response updates for the main template and, for
  multi-request templates, the associated request object. Preserve the callback
  payload shape created by `createGetParams`.
- Status bindings are represented by dynamic HTML attribute values such as
  `{{requestStatus}}`. The default generated value uses the
  `hmpl-status-<target>-<status>` convention; custom bind prefixes must remain
  supported.
- Response memoization stores/reuses the rendered request data only when the
  corresponding memo options are enabled. Do not turn memoization into a global
  cache or leak DOM state between unrelated template instances.
- Error names and categories are part of the observable behavior, including
  `CompileError`, `CompileOptionsError`, `ParseError`, `RenderError`,
  `RequestComponentError`, `RequestInitError`, and `BadResponseError`.

The request initialization callback receives a context object. The current
request context includes:

- `context.request.event`: the event that triggered the request, when the
  request has an `after` trigger.
- `context.request.clearInterval`: a callback for stopping an active request
  interval, when applicable.

The `get` callback receives one object argument:
`{ prop, value, context, request }`. `prop` is the updated property name,
`value` is the new value, `context` is the current request context, and
`request` identifies the relevant helper in templates with multiple requests.
Do not document or implement this as a positional callback. This is separate
from an `HMPLRequestInitFunction`, which receives the request context as its
single argument and returns fetch options.

### Compile-time defaults

The second argument to `compile(template, compileOptions)` configures defaults
for request helpers in that compiled template. A helper's explicit attribute
takes precedence over the same compile-level option.

| Compile option        | Default         | Effect                                           |
| --------------------- | --------------- | ------------------------------------------------ |
| `memo`                | `false`         | Enables response memoization by default          |
| `autoBody`            | `false`         | Sets automatic request-body behavior by default  |
| `allowedContentTypes` | `["text/html"]` | Restricts response types processed as HTML       |
| `disallowedTags`      | `[]`            | Removes configured tags from response HTML       |
| `sanitize`            | `false`         | Enables DOMPurify for response HTML              |
| `sanitizeConfig`      | undefined       | Supplies DOMPurify configuration when sanitizing |

`sanitizeConfig` is compile-level configuration; it is not a request-block
attribute.

## HMPL Syntax

HMPL v3 uses block helpers with key/value attributes:

```hmpl
<div>
  <button id="load">Load component</button>
  {{#request src="/api/component" after="click:#load" repeat=false}}
    {{#indicator trigger="pending"}}<p>Loading...</p>{{/indicator}}
    {{#indicator trigger="error"}}<p>Request failed</p>{{/indicator}}
  {{/request}}
</div>
```

Block helpers start with `{{#name ...}}` and close with `{{/name}}`. A helper
can appear in HTML; its body can contain HTML and, for a request helper,
indicator helpers. The `request` helper also has the short alias
`{{#r ...}}{{/r}}`. Indicators use
`{{#indicator trigger="pending"}}...{{/indicator}}`. Do not assume arbitrary
helper nesting is supported: the documented request-helper nesting is for
indicator blocks.

The older v2 JSON-like form:

```hmpl
{{src:"/api/test" method:"GET"}}
```

was replaced in v3 by:

```hmpl
{{#request src="/api/test" method="GET"}}{{/request}}
```

Do not introduce v2 syntax into new examples or tests.

The compiled markup must have one root element or be a request-only template;
multiple root elements are not supported. Request helper blocks are compiled
into comment placeholders in the intermediate DOM and later replaced at their
position by response/indicator nodes. They are not runtime HTML custom
elements.

### Attribute values

Attributes are parsed using JSON5-compatible rules and support:

- strings;
- arrays;
- booleans;
- objects;
- numbers.

Example:

```hmpl
{{#request
  src="/api/test"
  method="POST"
  indicators=[
    { trigger: "pending", content: "<p>Loading</p>" }
  ]
  autoBody={ formData: true }
}}{{/request}}
```

Since v3.2.0, HMPL also supports dynamic values in ordinary HTML attributes
that are related to request status:

```hmpl
<button class="{{requestStatus}}">Submit</button>
{{#request
  src="/api/submit"
  after="click:#submit"
  bind="{{requestStatus}}"
}}{{/request}}
```

Do not confuse HMPL block attributes with ordinary HTML attributes. Preserve
the parser's support for nested arrays/objects and JSON5-compatible values.
Values such as `src="/api/items"`, `repeat=false`,
`indicators=[{ trigger: "pending", content: "<p>Loading</p>" }]`, and
`autoBody={ formData: true }` are helper attributes; normal attributes remain
ordinary HTML. Attribute values are parsed as JSON5-compatible values, not
evaluated as arbitrary JavaScript expressions.

## Request Helper

`request` is the main block helper. Its supported properties are:

| Property              | Type                                  | Default         | Purpose                                    |
| --------------------- | ------------------------------------- | --------------- | ------------------------------------------ |
| `src`                 | `string`                              | required        | Request URL                                |
| `method`              | `string`                              | `"GET"`         | HTTP method                                |
| `after`               | `string`                              | none            | Event trigger in `event:selector` form     |
| `repeat`              | `boolean`                             | `true`          | Whether subsequent triggers issue requests |
| `interval`            | `number`                              | none            | Polling interval in milliseconds           |
| `indicators`          | `HMPLIndicator[]`                     | `[]`            | Status-specific HTML                       |
| `autoBody`            | `boolean \| HMPLAutoBodyOptions`      | `false`         | Build request body from event/form         |
| `memo`                | `boolean`                             | `false`         | Cache/reuse response behavior              |
| `initId`              | `string \| number`                    | none            | Identify shared request initialization     |
| `allowedContentTypes` | `string[] \| "*"`                     | `["text/html"]` | Accepted response content types            |
| `disallowedTags`      | `("script" \| "style" \| "iframe")[]` | `[]`            | Remove selected response tags              |
| `sanitize`            | `boolean`                             | `false`         | Run DOMPurify on response HTML             |
| `bind`                | `string \| HMPLBindOptions`           | none            | Bind request status to an attribute        |

Supported HTTP methods are `GET`, `POST`, `PUT`, `PATCH`, `DELETE`, `OPTIONS`,
and `TRACE`; method validation is case-insensitive.

### Event triggers and selectors

`after` uses `event:selector`, for example:

```hmpl
<button id="load">Load</button>
{{#request src="/api/items" after="click:#load"}}{{/request}}
```

Selectors are scoped to the template fragment/request context, not implicitly
to the entire global document. Preserve this behavior in changes to event
binding.

`repeat=false` makes an event-triggered request run only once. `interval` uses
the JavaScript `setInterval` model and can be stopped through
`context.request.clearInterval`. Current documented compatibility is:

- `interval` alone starts immediately;
- `interval` with `after` is supported when `repeat=false`, where the event
  starts the interval once.

### Indicators and statuses

Indicators render HTML for request states. Common triggers include:

- `pending`;
- `rejected`;
- `error`;
- non-success HTTP statuses such as `400`, `401`, `403`, `404`, `500`, and
  other statuses represented by the public status types.

An indicator has the shape:

```ts
{
  trigger: "pending" | "error" | 404,
  content: "<p>...</p>"
}
```

Keep status transitions and indicator replacement behavior stable when touching
the request/render pipeline.

### Automatic request bodies

`autoBody` can derive a body from the triggering form event. It can be enabled
as `autoBody=true` or configured with `autoBody={ formData: true }`. Use
`FormData` for form submissions when appropriate and preserve the ability to
provide a manually generated `body` through the request initialization
callback.

## Security Model

The default accepted response content type is `text/html`. This is an
intentional safety and behavior boundary; do not silently broaden it.

HMPL can remove selected tags with:

```hmpl
disallowedTags=["script", "style", "iframe"]
```

This is not a complete XSS defense because dangerous behavior can also be
expressed through event attributes, URLs, malformed media, or other HTML
features. For untrusted HTML, enable:

```hmpl
sanitize=true
```

Sanitization uses DOMPurify. Compile-level `sanitizeConfig` can configure
DOMPurify where the public types support it. Keep security-sensitive defaults
explicit and never turn on broad content acceptance as a convenience.

When modifying response parsing, validate:

1. Content-Type checks still happen before rendering.
2. `disallowedTags` removes only supported tags and does not create malformed
   DOM behavior.
3. `sanitize` still routes through DOMPurify.
4. No response is rendered through a success-shaped fallback after a failed
   request.
5. Errors remain observable through the existing errors/statuses and tests.

See [`www/app/src/content/docs/about/security.md`](./www/app/src/content/docs/about/security.md)
and [`SECURITY.md`](./SECURITY.md) before changing security behavior.

## Development Commands

Run commands from the directory that owns the relevant `package.json`.

### Core library

```sh
npm install
npm test
npm run build
npm run build:prod
npm run lint
npm run lint:test
npm run coverage
```

- `npm run build` runs TypeScript compilation after the `prebuild` lint hook.
- `npm run build:prod` builds the distributable package with `tsup`.
- `npm test` runs Mocha tests through `ts-node/esm`.
- `npm run lint` and `npm run lint:test` use ESLint and currently include
  autofix; inspect the diff after running them.
- `npm run coverage` runs the test suite with c8.

### Documentation app

```sh
cd www/app
npm install
npm run dev
npm run build
npm run preview
```

`npm run build` is the smallest reliable check after editing Astro config,
documentation pages, Vue components, navigation, or generated site behavior.
The build may report pre-existing warnings about unresolved assets, large
chunks, or missing optional content collections; distinguish warnings from
actual failures.

### Blog

```sh
cd www/blog
bundle install
bundle exec jekyll serve
bundle exec jekyll build
```

The blog build may emit Liquid warnings from existing post content. Treat a
non-zero exit code as a failure, but do not rewrite unrelated posts merely to
silence an existing warning.

## Testing Expectations

For changes to core behavior:

1. Add or update a focused test under [`test/core/`](./test/core/).
2. Cover both the normal path and invalid/error input when applicable.
3. Run the smallest relevant test file or `npm test`.
4. Run `npm run build` for TypeScript/declaration compatibility.
5. Run `npm run build:prod` when package output or exports are affected.

For documentation-only changes, a full core test run is usually unnecessary;
build the affected site when practical. For app changes, run
`cd www/app && npm run build`. For blog changes, run the Jekyll build if
Bundler is available.

Tests use mocked network behavior and DOM environments. Do not add tests that
depend on live production URLs or external APIs.

### Existing test coverage map

Before adding a test, inspect the closest existing cases and reuse their
helpers. The suite already exercises these behavior families:

- [`test/core/compile.test.ts`](./test/core/compile.test.ts): template and
  compile-option validation; block syntax and malformed/unclosed blocks;
  unsupported nested request/indicator blocks; root-node constraints; request
  attribute validation; `autoBody`; `allowedContentTypes`; `disallowedTags`;
  `sanitize` and `sanitizeConfig`; and `bind` targets/prefixes.
- [`test/core/template-function.test.ts`](./test/core/template-function.test.ts):
  method and selector errors; request initialization object/function/arrays;
  duplicate and missing `initId`s; initial and event-triggered requests;
  `repeat`; request status and response callbacks; pending/rejected/HTTP status
  indicators; HTTP failures and network rejections; content-type acceptance and
  rejection; headers, timeout and abort signal; interval cleanup; form body
  behavior; memoized and non-memoized DOM nodes; response sanitization and
  disallowed tags; `bind` on classes/custom attributes and multiple request
  targets.
- [`test/core/stringify.test.ts`](./test/core/stringify.test.ts): serialization
  of request fields including strings, numbers, booleans, arrays, nested
  indicator/configuration values, `initId`, `after`, `repeat`, `memo`,
  `interval`, and allowed content types.
- [`test/core/createWarning.test.ts`](./test/core/createWarning.test.ts):
  warning behavior.
- [`test/core/functions.ts`](./test/core/functions.ts) and
  [`test/server/server.ts`](./test/server/server.ts): shared test helpers,
  mocked HTTP routes, response bodies/statuses/headers, rejected requests, and
  event dispatch.
- [`test/setup/setup.ts`](./test/setup/setup.ts) and
  [`test/setup/server.setup.ts`](./test/setup/server.setup.ts): DOM and network
  test setup. The test suite uses jsdom, nock, and Sinon; keep tests isolated
  and restore stubs/scopes.

The tests are useful executable examples of supported syntax and edge cases,
but documentation remains the source for intended public behavior. If a test
contradicts the current docs or public types, determine whether the
implementation, test, or documentation is stale rather than copying the
contradiction into new examples.

## Code and Change Conventions

- Make surgical changes and preserve existing behavior unless the task
  explicitly requests a behavior change.
- Prefer existing public types, validation helpers, and error paths over
  `any`, duplicated parsing, or casts.
- Keep core implementation changes in `src/`; do not edit generated `dist/`,
  `build/`, `coverage/`, Astro `dist/`, or Jekyll `_site/` output.
- Keep public API names and exported types backward compatible unless a versioned
  migration is intentionally being made.
- If changing syntax, update the parser, types, focused tests, and the relevant
  documentation together.
- If changing request lifecycle behavior, check indicators, status callbacks,
  intervals, memoization, and multi-request templates.
- Avoid broad catches and silent defaults. Invalid input should use the
  repository's existing validation/error conventions.
- Follow the surrounding formatting and naming. Comments should explain only
  non-obvious logic.
- Do not change deployment domains, `CNAME` files, sitemap URLs, or SEO
  canonical URLs merely because a local link needs changing. Treat those as
  separate deployment/SEO decisions.
- When changing a public app/blog link, search both `www/app` and `www/blog`
  for the old and new URL and update all user-facing navigation/documentation
  references consistently.

## Documentation Content Guidelines

The documentation is part of the product. When adding a feature, explain:

1. What problem it solves and how it relates to server-rendered HTML.
2. The exact syntax and defaults.
3. The TypeScript type or public API involved.
4. Event, selector, lifecycle, and error behavior.
5. Security implications and safe defaults.
6. A minimal runnable example.
7. Interactions with `indicators`, `repeat`, `interval`, `memo`,
   `autoBody`, `allowedContentTypes`, `disallowedTags`, `sanitize`, and
   `bind` when relevant.

Use the established docs sections for:

- installation: [`installation.mdx`](./www/app/src/content/docs/installation.mdx);
- syntax: [`syntax/block-helper.mdx`](./www/app/src/content/docs/syntax/block-helper.mdx)
  and [`syntax/attribute.mdx`](./www/app/src/content/docs/syntax/attribute.mdx);
- request behavior:
  [`block-helpers/request.mdx`](./www/app/src/content/docs/block-helpers/request.mdx);
- request context:
  [`context/request.mdx`](./www/app/src/content/docs/context/request.mdx);
- security:
  [`about/security.md`](./www/app/src/content/docs/about/security.md);
- v2-to-v3 migration:
  [`about/migration-from-v2-to-v3-version.md`](./www/app/src/content/docs/about/migration-from-v2-to-v3-version.md).

## Contribution and Release Safety

Before substantial work, follow [`CONTRIBUTING.md`](./CONTRIBUTING.md): discuss
the proposed change with maintainers, keep the pull request focused, link the
related issue, and complete the repository's PR template.

The supported security policy currently covers HMPL `3.x` and later; report
vulnerabilities according to [`SECURITY.md`](./SECURITY.md), not in a public
issue when private disclosure is appropriate.

Do not commit secrets, credentials, generated local caches, or production
environment files. Do not rewrite unrelated user changes in a dirty worktree.
Before finishing, inspect the diff, run the targeted validation, and report
warnings separately from failures.
