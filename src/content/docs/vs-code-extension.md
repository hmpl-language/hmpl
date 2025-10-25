---
title: VS Code Extension
description: Enhanced development experience with VS Code extension
head:
  - tag: meta
    attrs:
      name: keywords
      content: hmpl vs code, hmpl extension, syntax highlighting, template language support, hmpl files, developer tooling
---

[The HMPL extension](https://marketplace.visualstudio.com/items?itemName=hmpljs.hmpl) for Visual Studio Code provides seamless syntax highlighting and file handling for `.hmpl` files. Starting from version `0.0.4`, it introduces new features that enhance the editing experience for developers working with the HMPL template language.

## Features

- **Enhanced Syntax Highlighting**: Improved tokenization ensures accurate highlighting for complex nested structures in `.hmpl` files.
- **Custom File Icons**: `.hmpl` files now appear with a distinct icon in the file explorer, making them easy to identify.
- **Theme and Plugin Support**: Work with HMPL as with HTML in VS Code, using your favorite themes, plugins.
- **Configuration Options**: New settings to customize the behavior of `.hmpl` files in the editor, such as enabling bracket pair colorization or customizing the tab size.

## Example: Creating and Using `.hmpl` Files in VS Code

Here’s how you can work with `.hmpl` files using the HMPL extension.

### Step 1: Create a `.hmpl` File

In your project, create a new file named `template.hmpl` and add the following content:

```hmpl
<template>
  <div>
    {{#request src="/api/getHTML"}}{{/request}}
  </div>
</template>
```

This file represents a simple HMPL template that outputs a JSON-like object embedded in a `div`.

### Step 2: Use the `.hmpl` File in JavaScript

Now, load and use the `.hmpl` file in your JavaScript code.

#### `index.js`

```javascript
const templateFn = require("./template.hmpl");

// Render the template
const elementObj = templateFn();

console.log(elementObj);
```

In this example, the `.hmpl` file is treated as a JavaScript module, with the extension enabling syntax highlighting and integration.

## Installation and Configuration

### Install the Extension

1. Open the Extensions view in Visual Studio Code (`Ctrl+Shift+X` or `Cmd+Shift+X` on macOS).
2. Search for **HMPL** and click **Install**.

### Customize Settings

You can tweak how `.hmpl` files are handled by adding the following configuration to your `settings.json`:

```json
"[hmpl]": {
  "editor.tabSize": 2,
  "editor.autoClosingBrackets": "always",
}
```

## Version Compatibility

To fully leverage the HMPL extension’s capabilities, ensure you are using version `0.0.4` or higher. You can check your current version or update the extension in the Extensions view in Visual Studio Code.
