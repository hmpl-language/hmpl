<h1 align="center">
    <a href="https://www.npmjs.com/package/hmpl-js">
        <img width="460" src="https://raw.githubusercontent.com/hmpl-language/media/refs/heads/main/new_banner.png" alt="hmpl">
    </a>
</h1>

<h2 align="center">
  Server-oriented customizable templating for JavaScript
</h2>

<div align="center">

[![npm-version](https://img.shields.io/npm/v/hmpl-js?logo=npm&color=0183ff)](https://www.npmjs.com/package/hmpl-js)
[![codecov](https://img.shields.io/codecov/c/github/hmpl-language/hmpl?logo=codecov&logoColor=ffffff&label=codecov&color=0183ff)](https://codecov.io/github/hmpl-language/hmpl)
[![stars](https://img.shields.io/github/stars/hmpl-language/hmpl?logo=github&color=0183ff&style=flat)](https://github.com/hmpl-language/hmpl/stargazers)
[![discord](https://img.shields.io/discord/1317272386353238086?style=flat&logo=discord&color=5865F2&labelColor=5865F2&logoColor=fff)](https://discord.gg/KFunMep36n)
[![x.com](https://img.shields.io/badge/twitter-000?logo=x&logoColor=fff)](https://x.com/hmpljs)

</div>

<div align="center">
<a href="https://hmpl-lang.dev">🌐 Website</a> • <a href="https://hmpl-lang.dev/introduction">📄 Docs</a> • <a href="https://codesandbox.io/p/sandbox/basic-hmpl-example-dxlgfg">🖥️ Demo Sandbox</a> • <a href="https://hmpl-lang.dev/examples">⚙️ Examples</a>
</div>

<br/>

<div align="center">
  <a href="https://devhunt.org/tool/hmpljs">
    <img src="https://raw.githubusercontent.com/hmpl-language/media/refs/heads/main/devhunt.svg" />
  </a>
</div>

## Introduction

hmpl is a small template language for displaying UI from server to client. It is based on <em>customizable</em> requests sent to the server via <a href="https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API">fetch</a> and processed into ready-made HTML. The language is syntactically block-based and integrated with <a href="https://www.npmjs.com/package/json5">JSON5</a> and <a href="https://www.npmjs.com/package/dompurify">DOMPurify</a>. Reduce the size of your javascript files and display the same UI as if it was written in a modern framework!

☆ If you find HMPL useful, please consider giving us a star on GitHub! Your support helps us continue to innovate and deliver exciting features.

## Example

```html
<div>
  {{#request src="/api/my-component.html"}}
    {{#indicator trigger="pending"}}
      <p>Loading...</p>
    {{/indicator}}
  {{/request}}
</div>
```

## Basic usage

```javascript
import hmpl from "hmpl-js";

const templateFn = hmpl.compile(
  `<div>
      <button data-action="increment" id="btn">Click!</button>
      <div>Clicks: {{#request src="/api/clicks" after="click:#btn"}}{{/request}}</div>
  </div>`
);

const clicker = templateFn(({ request: { event } }) => ({
  body: JSON.stringify({ action: event.target.getAttribute("data-action") })
})).response;

document.querySelector("#app").append(clicker);
```

<details>
<summary>Explain this!</summary>

```js
import hmpl from "hmpl-js"; // Import the HMPL library

// Compile an HMPL template with dynamic behavior
const templateFn = hmpl.compile(
  `<div>
      <button data-action="increment" id="btn">Click!</button>
      <!-- This div will update with the click count from /api/clicks -->
      <div>Clicks: {{#request src="/api/clicks" after="click:#btn"}}{{/request}}</div>
      <!-- Also, you can write in short: {{#r src="..."}}{{/r}} -->
  </div>`
);

// Generate a response handler for the template
// In the original object, we will have the following: { response: div, status: 200 }
const clicker = templateFn(({ request: { event } }) => ({
  // Send a JSON payload with the action from the button's data attribute
  body: JSON.stringify({ action: event.target.getAttribute("data-action") })
})).response;

// Append the dynamically generated element to the #app container
document.querySelector("#app").append(clicker);
```

In this example, we create a dynamic clicker component in which, when a `button` is pressed, we will receive the value of the current clicks that will come from the server. The advantage of this approach is that we can take out not only data in the form of `Text`, but also entire components and even pages!

</details>

## Usage with DOM

If you need an option without using js, then by connecting the additional [hmpl-dom](https://www.npmjs.com/package/hmpl-dom) module you can do this.

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
      <template hmpl>
        <div>
          {{#request src="/api/my-component.html"}}
            {{#indicator trigger="pending"}}
              <p>Loading...</p>
            {{/indicator}}
          {{/request}}
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

This way, components from the server are mounted into the DOM without having to add them manually. This is great when you want to replace Alpine.js or HTMX in a project.

## Why HMPL?

Using template language capabilities, you can multiply reduce the size of the application bundle. Full customization of the request based on the modern `fetch` standard, as well as support for all the functionality necessary for modern work in applications (request indicator, sending by event, automatic generation of `body` for the `form`, caching) and the syntax of the object in the markup, which requires a minimum number of characters, will help to build interaction with the server and client as efficiently as possible. App size [comparison](https://github.com/hmpl-language/app-size-comparison) (bytes):

<div>
    <a href="https://github.com/hmpl-language/app-size-comparison">
        <img src="https://raw.githubusercontent.com/hmpl-language/media/refs/heads/main/comparison.png" alt="App size comparison">
    </a>
</div>

Also, HMPL can be a great alternative to popular tools such as HTMX and Alpine.js.

## Features

- **Customizable**: Send a custom request to the server when receiving the UI
- **Memory Preserving**: Reduce file sizes on the client by several times
- **Based on Fetch API**: Use a modern standard instead of `XMLHTTPRequest`
- **Server-oriented**: Work with the server directly through markup and with a little js
- **Generate thousands of DOM nodes from a single template**: Work with large components not only on the server but also on the client
- **Simple**: Get ready-made UI from the server by writing a couple of lines of familiar object syntax
- **Protected from XSS attacks**: Enable incoming server HTML sanitization with [DOMPurify](https://www.npmjs.com/package/dompurify) and work with it safely
- **Flexible**: Can be used in almost any project due to not only working through a script, but also working in files with the `.hmpl` extension
- **Integrated with JSON5**: Flexible writing of objects by [docs](https://hmpl-lang.dev/introduction) as in vanilla js, as well as the reliability of the parser used by millions of people
- **Small bundle size**: Lots of functionality in a couple of kilobytes

## Installation

hmpl can be installed in several ways, which are described in this section. This tool is a simple javascript file that is connected in the usual way through a `script`, or using the `import` construct in an environment that supports this (webpack build, parcel build etc.). Also, starting with version `2.2.0`, the JSON5 module needs to be connected, and starting with version `2.2.5`, the DOMPurify module also needs to be connected. The first and easiest way is to install using a CDN.

### Package Manager

This method involves downloading through npm or other package managers.

```bash
npm i hmpl-js
```

> Node.js [v10.12.0+](https://nodejs.org/en/download) is required.

Along the path node-modules/hmpl/dist you can find two files that contain a regular js file and a minified one.

### CDN

This method involves connecting the file through a third-party resource, which provides the ability to obtain a javascript file from npm via a link.

```html
<script src="https://unpkg.com/json5/dist/index.min.js"></script>
<script src="https://unpkg.com/dompurify/dist/purify.min.js"></script>
<script src="https://unpkg.com/hmpl-js/dist/hmpl.min.js"></script>
<!--   
  integrity="..."
  crossorigin="anonymous"
-->
```

This resource could be unpkg, skypack or other resources. The examples include unpkg simply because it is one of the most popular and its url by characters is not so long.

## Through the starter template project

There is a [starter project](https://github.com/hmpl-language/hello-hmpl-starter) on Vite.

```sh
npx degit hmpl-language/hello-hmpl-starter hello-hmpl
```

Based on it, you can make web applications.

## Ecosystem

<table cellpadding="10" cellspacing="0" border="0">
    <tr>
        <td>
            <img src="https://raw.githubusercontent.com/hmpl-language/media/refs/heads/main/VS%20Code.svg" width="100" alt="vs-code-extension">
        </td>
        <td>
            <a href="https://marketplace.visualstudio.com/items?itemName=hmpljs.hmpl"><b>VS Code Extension</b></a><br>
            <i>Syntax highlighting and tools for HMPL</i>
        </td>
        <td>
            <img src="https://raw.githubusercontent.com/hmpl-language/media/refs/heads/main/vite.png" width="100" alt="vite-plugin-hmpl">
        </td>
        <td>
            <a href="https://www.npmjs.com/package/vite-plugin-hmpl"><b>Vite Plugin</b></a><br>
            <i>Seamless .hmpl integration with Vite</i>
        </td>
    </tr>
    <tr>
        <td>
            <img src="https://raw.githubusercontent.com/hmpl-language/media/refs/heads/main/Webpack.svg" width="100" alt="hmpl-loader">
        </td>
        <td>
            <a href="https://www.npmjs.com/package/hmpl-loader"><b>Webpack Loader</b></a><br>
            <i>Compile .hmpl files inside Webpack</i>
        </td>
    </tr>
</table>

## Community support

The [documentation](https://hmpl-lang.dev/introduction) contains main information on how the HMPL template language works. If you have any questions about how HMPL works, you can use the following resources:

- [Github](https://github.com/hmpl-language/hmpl) - In the discussion and issues sections you can ask any question you are interested in
- [Discord](https://discord.gg/KFunMep36n) - You can ask your question in the thematic channel "support"
- [𝕏 (Twitter)](https://x.com/hmpljs) - There is a lot of interesting stuff there, concerning the template language and not only :)

You can also ask your question on [Stack Overflow](https://stackoverflow.com/) and address it in the resources described above.

## Contribution

We have a [Contributing Guide](https://github.com/hmpl-language/hmpl/blob/main/CONTRIBUTING.md) that describes the main steps for contributing to the project.

Thank you to all the people who have already contributed to HMPL, or related projects!

## Roadmap

The project has a [roadmap](https://github.com/orgs/hmpl-language/projects/5) where you can see the plans for future development.

## License

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fhmpl-language%2Fhmpl.svg?type=large&issueType=license)](https://app.fossa.com/projects/git%2Bgithub.com%2Fhmpl-language%2Fhmpl?ref=badge_large&issueType=license)

Licensed under [MIT](https://github.com/hmpl-language/hmpl/blob/main/LICENSE)
