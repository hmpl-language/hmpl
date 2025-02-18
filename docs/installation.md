## Installation

hmpl can be installed in several ways, which are described in this section. This tool is a simple javascript file that is connected in the usual way through a `script`, or using the `import` construct in an environment that supports this (webpack build, parcel build etc.). Also, starting from version `2.2.0`, the connection of the JSON5 module is required. The first and easiest way is to install using a CDN.

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
<script src="https://unpkg.com/json5/dist/index.js"></script>
<script src="https://unpkg.com/hmpl-js/dist/hmpl.min.js"></script>
<!--   
  integrity="..."
  crossorigin="anonymous"
-->
```

This resource could be unpkg, skypack or other resources. The examples include unpkg simply because it is one of the most popular and its url by characters is not so long.

### Manual download

You can install the package by simply [downloading](https://unpkg.com/hmpl-js/dist/hmpl.min.js) it as a file and moving it to the project folder.

```html
<script src="https://unpkg.com/json5/dist/index.js"></script>
<script src="./hmpl.min.js"></script>
```

If, for some reason, you do not need the minified file, then you can download the full file from this [link](https://unpkg.com/hmpl-js/dist/hmpl.js).

```html
<script src="https://unpkg.com/json5/dist/index.js"></script>
<script src="./hmpl.js"></script>
```

The non-minified file is larger in size, but it is there as it is with all the formatting.
