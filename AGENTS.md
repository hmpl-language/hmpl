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

- [`www/spec/`](./www/spec/) contains the language specification and has its own
  README when present.
- [`hmpl-site/`](./hmpl-site/) is a separate site/server area; do not assume it
  is the same application as `www/app`.
- Root [`README.md`](./README.md), [`CONTRIBUTING.md`](./CONTRIBUTING.md), and
  [`SECURITY.md`](./SECURITY.md) are the project-level reference documents.

## Public API and Data Flow

The main public API is:

```ts
import hmpl, { compile, stringify } from "hmpl-js";

const templateFn = compile(template, options?);
const result = templateFn(requestInitOrFunction?);
```

`compile` parses an HMPL template and returns a template function. Calling that
function creates or initializes the rendered DOM/request graph. The returned
object includes the rendered `response` node and request-related state. Use the
typed APIs in [`src/types.ts`](./src/types.ts) rather than inventing new
untyped shapes.

`stringify` is the complementary serialization utility. Preserve its existing
behavior and tests when changing parser or renderer internals.

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
  `hmpl-status-<source>-<status>` convention; custom bind prefixes must remain
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

The `get` callback receives `{ prop, value, context, request }`. `prop` is the
updated property name, `value` is the new value, `context` is the current
request context, and `request` identifies the relevant helper in templates with
multiple requests. In v3, `context` is the third parameter and `request` is the
fourth; do not restore the v2 callback signature.

## HMPL Syntax

HMPL v3 uses block helpers with key/value attributes:

```hmpl
{{#request src="/api/component" method="GET"}}
  {{#indicator trigger="pending"}}
    <p>Loading...</p>
  {{/indicator}}
{{/request}}
```

The short alias `{{#r ...}}{{/r}}` may be used for request blocks. Indicators
are nested `{{#indicator ...}}{{/indicator}}` blocks. HMPL v3 intentionally
replaced the older v2
JSON-like form:

```hmpl
{{src:"/api/test" method:"GET"}}
```

with the v3 form:

```hmpl
{{#request src="/api/test" method="GET"}}{{/request}}
```

Do not introduce v2 syntax into new examples or tests.

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

## Request Helper

`request` is the main block helper. Its supported properties are:

| Property | Type | Default | Purpose |
| --- | --- | --- | --- |
| `src` | `string` | required | Request URL |
| `method` | `string` | `"GET"` | HTTP method |
| `after` | `string` | none | Event trigger in `event:selector` form |
| `repeat` | `boolean` | `true` | Whether subsequent triggers issue requests |
| `interval` | `number` | none | Polling interval in milliseconds |
| `indicators` | `HMPLIndicator[]` | `[]` | Status-specific HTML |
| `autoBody` | `boolean \| HMPLAutoBodyOptions` | `false` | Build request body from event/form |
| `memo` | `boolean` | `false` | Cache/reuse response behavior |
| `initId` | `string \| number` | none | Identify shared request initialization |
| `allowedContentTypes` | `string[] \| "*"` | `["text/html"]` | Accepted response content types |
| `disallowedTags` | `("script" \| "style" \| "iframe")[]` | `[]` | Remove selected response tags |
| `sanitize` | `boolean` | `false` | Run DOMPurify on response HTML |
| `bind` | `string \| HMPLBindOptions` | none | Bind request status to an attribute |

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