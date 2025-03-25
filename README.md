<div>
    <a href="https://www.npmjs.com/package/hmpl-js">
        <img src="https://raw.githubusercontent.com/hmpl-language/media/refs/heads/main/banner_new.png" alt="hmpl">
    </a>
</div>

<br/>
<div>

[![npm-version](https://img.shields.io/npm/v/hmpl-js?logo=npm&color=0183ff&style=for-the-badge)](https://www.npmjs.com/package/hmpl-js)
[![minzipped size](https://img.shields.io/bundlephobia/minzip/hmpl-js?logo=npm&color=0183ff&style=for-the-badge)](https://bundlephobia.com/package/hmpl-js)
[![codecov](https://img.shields.io/codecov/c/github/hmpl-language/hmpl?style=for-the-badge&logo=codecov&logoColor=ffffff&label=CODECOV&color=0183ff)](https://codecov.io/github/hmpl-language/hmpl)
[![issues](https://img.shields.io/github/issues/hmpl-language/hmpl?logo=github&color=0183ff&style=for-the-badge)](https://github.com/hmpl-language/hmpl/issues)

[![x.com](https://img.shields.io/badge/Twitter-000?style=for-the-badge&logo=x&logoColor=fff)](https://x.com/hmpljs)
[![discord](https://img.shields.io/badge/Discord-7289DA?style=for-the-badge&logo=discord&logoColor=fff)](https://discord.gg/KFunMep36n)

</div>

<a href="https://hmpl-lang.dev">Website</a> • <a href="https://hmpl-lang.dev/introduction.html">Documentation</a> • <a href="https://codesandbox.io/p/sandbox/basic-hmpl-example-dxlgfg">Demo Sandbox</a> • <a href="https://hmpl-lang.dev/examples.html">Examples</a>

hmpl is a small template language for displaying UI from server to client. It is based on <em>customizable</em> requests sent to the server via <a href="https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API">fetch</a> and processed into ready-made HTML. The language is syntactically object-based and integrated with <a href="https://www.npmjs.com/package/json5">JSON5</a> and <a href="https://www.npmjs.com/package/dompurify">DOMPurify</a>. Reduce the size of your javascript files and display the same UI as if it was written in a modern framework and apply Server-Side Rendering, Static Site Generation, Incremental Static Generation (SSR, SSG, ISG) without robot indexing on any sites without Next.js, Remix, Nuxt.js!

☆ If you find HMPL useful, please consider giving us a star on GitHub! Your support helps us continue to innovate and deliver exciting features.

<div align="center">
  <a href="https://devhunt.org/tool/hmpljs">
    <img src="https://raw.githubusercontent.com/hmpl-language/media/refs/heads/main/devhunt.svg" />
  </a>
</div>

## Usage

```javascript
import hmpl from "hmpl-js";

const templateFn = hmpl.compile(
  `<div>
      <button data-action="increment" id="btn">Click!</button>
      <div>Clicks: {{ src: "/api/clicks", after: "click:#btn" }}</div>
  </div>`
);

const clicker = templateFn(({ request: { event } }) => ({
  body: JSON.stringify({ action: event.target.getAttribute("data-action") })
})).response;

document.querySelector("#app").append(clicker);
```

## Why HMPL?

Using template language capabilities, you can multiply reduce the size of the application bundle. Full customization of the request based on the modern `fetch` standard, as well as support for all the functionality necessary for modern work in applications (request indicator, sending by event, automatic generation of `body` for the `form`, caching) and the syntax of the object in the markup, which requires a minimum number of characters, will help to build interaction with the server and client as efficiently as possible.

Also, HMPL can be a great alternative to popular tools such as HTMX and Alpine.js.

## Features

- **Customizable**: Send a custom request to the server when receiving the UI
- **Memory Preserving**: Reduce file sizes on the client by [several times](https://github.com/hmpl-language/app-size-comparison)
- **Based on Fetch API**: Use a modern standard instead of `XMLHTTPRequest`
- **Server-oriented**: Work with the server directly through markup and with a little js
- **Generate thousands of DOM nodes from a single template**: Work with large components not only on the server but also on the client
- **Simple**: Get ready-made UI from the server by writing a couple of lines of familiar object syntax
- **Protected from XSS attacks**: Enable incoming server HTML sanitization with [DOMPurify](https://www.npmjs.com/package/dompurify) and work with it safely
- **Flexible**: Can be used in almost any project due to not only working through a script, but also working in files with the `.hmpl` extension
- **Integrated with JSON5**: Flexible writing of objects by [specs](https://spec.json5.org) as in vanilla js, as well as the reliability of the parser used by millions of people
- **Small bundle size**: Lots of functionality in a couple of kilobytes

## Installation

hmpl can be installed in several ways, which are described in this section. This tool is a simple javascript file that is connected in the usual way through a `script`, or using the `import` construct in an environment that supports this (webpack build, parcel build etc.). Also, starting with version `2.2.0`, the JSON5 module needs to be connected, and starting with version `2.2.5`, the DOMPurify module also needs to be connected. The first and easiest way is to install using a CDN.

### Package Manager

This method involves downloading through npm or other package managers.

```bash
npm i hmpl-js
```

> [Node.js](https://nodejs.org) is required for npm.

Along the path node-modules/hmpl/dist you can find two files that contain a regular js file and a minified one.

### CDN

This method involves connecting the file through a third-party resource, which provides the ability to obtain a javascript file from npm via a link.

```html
<script src="https://unpkg.com/json5/dist/index.min.js"></script>
<script src="https://unpkg.com/dompurify/dist/purify.min.js"></script>
<script src="https://unpkg.com/hmpl-js/dist/hmpl.min.js"></script>
<!--
  integrity="sha384-..."
  crossorigin="anonymous"
-->
```

This resource could be unpkg, skypack or other resources. The examples include unpkg simply because it is one of the most popular and its url by characters is not so long.

### Manual download

You can install the package by simply [downloading](https://unpkg.com/hmpl-js/dist/hmpl.min.js) it as a file and moving it to the project folder.

```html
<script src="https://unpkg.com/json5/dist/index.min.js"></script>
<script src="https://unpkg.com/dompurify/dist/purify.min.js"></script>
<script src="./hmpl.min.js"></script>
```

If, for some reason, you do not need the minified file, then you can download the full file from this [link](https://unpkg.com/hmpl-js/dist/hmpl.js).

```html
<script src="https://unpkg.com/json5/dist/index.min.js"></script>
<script src="https://unpkg.com/dompurify/dist/purify.min.js"></script>
<script src="./hmpl.js"></script>
```

The non-minified file is larger in size, but it is there as it is with all the formatting.

## Ecosystem

<a href="https://www.npmjs.com/package/hmpl-loader"><img src="https://raw.githubusercontent.com/hmpl-language/media/refs/heads/main/Webpack.svg" alt="hmpl-loader" height="40"/></a>
<a href="https://marketplace.visualstudio.com/items?itemName=hmpljs.hmpl"><img src="https://raw.githubusercontent.com/hmpl-language/media/refs/heads/main/VS%20Code.svg" height="40" alt="vs-code extension"/></a>

## Community support

The [documentation](https://hmpl-lang.dev/introduction.html) contains main information on how the HMPL template language works. If you have any questions about how HMPL works, you can use the following resources:

- [Github](https://github.com/hmpl-language/hmpl) - In the discussion and issues sections you can ask any question you are interested in
- [Discord](https://discord.gg/KFunMep36n) - You can ask your question in the thematic channel "support"
- [𝕏 (Twitter)](https://x.com/hmpljs) - There is a lot of interesting stuff there, concerning the template language and not only :)

You can also ask your question on [Stack Overflow](https://stackoverflow.com/) and address it in the resources described above.

## Contribution

We have a [Contributing Guide](https://github.com/hmpl-language/hmpl/blob/main/CONTRIBUTING.md) that describes the main steps for contributing to the project.

Thank you to all the people who have already contributed to HMPL, or related projects!

## Roadmap

The project has a [roadmap](https://github.com/orgs/hmpl-language/projects/5) where you can see the plans for future development.

## Fossa status

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fhmpl-language%2Fhmpl.svg?type=large&issueType=license)](https://app.fossa.com/projects/git%2Bgithub.com%2Fhmpl-language%2Fhmpl?ref=badge_large&issueType=license)

Licensed under [MIT](https://github.com/hmpl-language/hmpl/blob/main/LICENSE)
