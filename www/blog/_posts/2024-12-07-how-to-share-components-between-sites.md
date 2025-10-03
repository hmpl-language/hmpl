---
layout: post
title: "How to share components between sites"
date: 2024-12-07 01:00 AM
categories: blog
tags: [HMPL, components, reusability, web-development, JavaScript, cross-site, tutorial]
---

It is not uncommon to encounter such a task when creating a web application, when it is necessary to transfer a component between sites. Usually, these are some kind of general buttons, blocks like footer, header, and the like.

## Component

For example, we can take the button component, which we will transfer between the components. It will look like this:

```html
<button class="button">Click Me</button>
<style>
  .button {
    background-color: #4caf50;
    color: white;
    border: none;
    padding: 12px 24px;
    text-align: center;
    text-decoration: none;
    font-size: 16px;
    border-radius: 5px;
    cursor: pointer;
    transition:
      background-color 0.3s,
      transform 0.2s;
  }

  .button:hover {
    background-color: #45a049;
  }

  .button:active {
    transform: scale(0.95);
  }
</style>
```

The result on the site will be as follows:

![button](/images/2024-12-07-how-to-share-components-between-sites/button.png)

Now, let's take two sites for which you need to make the component common. Let it be example1 example2. They can all be hosted on different hosting sites. Let one be deployed from GithHub, and the other from some local hosting.

Now, the main question arises - how to share?

## Several ways of sharing

I will describe several methods that are usually used for this. From the most banal to the most practical.

![Sharing components](/images/2024-12-07-how-to-share-components-between-sites/diagram.png)

Both of these approaches will look something like this.

### 1. Output to a file and connection by script

This method assumes that there will be a function that returns HTML markup. And, this function can be connected via a file remotely. It doesn't matter where this file will be located. You just need to connect it from there.

**createButton.js**

```javascript
// buttonModule.js
(function (global) {
  // Define the createButton function
  function createButton() {
    // Create a <style> element and add styles
    const style = document.createElement("style");
    style.textContent = `
      .button {
        background-color: #4caf50;
        color: white;
        border: none;
        padding: 12px 24px;
        text-align: center;
        text-decoration: none;
        font-size: 16px;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s, transform 0.2s;
      }
      .button:hover {
        background-color: #45a049;
      }
      .button:active {
        transform: scale(0.95);
      }
    `;

    // Create the button element
    const button = document.createElement("button");
    button.className = "button";
    button.textContent = "Click Me";

    // Return the elements (style and button)
    return { style, button };
  }

  // Expose the function to the global scope
  global.buttonModule = {
    createButton
  };
})(window);
```

**example1/root/index.html,
example2/root/index.html**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Button Module</title>
    <script src="https://.../buttonModule.js"></script>
  </head>
  <body>
    <div id="wrapper"></div>
    <script>
      // Use the buttonModule
      const { style, button } = buttonModule.createButton();
      const wrapper = document.getElementById("wrapper");
      wrapper.append(style); // Attach styles to the document
      wrapper.append(button); // Add the button to the page
    </script>
  </body>
</html>
```

Here we connect the module via a site that is not connected to our two sites. It could be the same GitHub.

### Features (Advantages):

- Easy to implement with standard `<script>` tags in HTML without additional setup.
- Requires no modern tools or configurations like Webpack or Vite.
- Suitable for small, single-page applications or quick experiments.
- Minimal setup, enabling faster development.
- Can be seamlessly integrated into existing projects that already rely on global variables.

### Drawbacks:

- If there are many components, there will be a thousand scripts, which makes this method suitable only for a single use.
- Adds variables or objects to the global scope, increasing the risk of naming conflicts.
- Difficult to avoid clashes when multiple scripts are used.
- Makes the project harder to scale or refactor.
- Scripts depend on the correct order of loading, which must be manually managed.
- Less maintainable and not aligned with current best practices.

### 2. Using a third-party library and moving the component to the API

For this method, we will use a module such as [HMPL](https://github.com/hmpl-language/hmpl). It will allow you to connect components from the server using simple templates based on objects. To begin with, let's take the component to the server. Create a separate `HTML` and give it via API request. What will the `.html` file look like:

**button.html**

```html
<button class="button">Click Me</button>
<style>
  .button {
    background-color: #4caf50;
    color: white;
    border: none;
    padding: 12px 24px;
    text-align: center;
    text-decoration: none;
    font-size: 16px;
    border-radius: 5px;
    cursor: pointer;
    transition:
      background-color 0.3s,
      transform 0.2s;
  }

  .button:hover {
    background-color: #45a049;
  }

  .button:active {
    transform: scale(0.95);
  }
</style>
```

After that, we will need to somehow transfer this file to the server. Let the backend be on Node.js. We will use express.js as one of the most popular frameworks for creating API. First, we will set the route by which we will receive our component:

**buttonController.js**

```javascript
const express = require("express");
const expressRouter = express.Router();
const path = require("path");

const buttonController = (req, res) => {
  res.sendFile(path.join(__dirname, "../button.html"));
};

expressRouter.use("/getButton", buttonController);
```

**app.js**

```javascript
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = 8000;
const app = express();
const routes = require("./routes/buttonController");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({ origin: true, credentials: true }));

app.set(express.static(path.join(__dirname, "src")));

app.use("/api", routes);

app.listen(PORT);
```

After this, we will have a route by which we can now easily take the component. On the site we connect HMPL. It can be connected in several ways, let's consider the main ones:

**Via script**

```html
<script src="https://unpkg.com/json5/dist/index.js"></script>
<script src="https://unpkg.com/hmpl-js/dist/hmpl.min.js"></script>
```

**Via import**

```javascript
import hmpl from "hmpl-js";
```

We use method 1, since index.html is the default on our sites.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Button Module</title>
  </head>
  <body>
    <script src="https://unpkg.com/json5/dist/index.js"></script>
    <script src="https://unpkg.com/hmpl-js/dist/hmpl.min.js"></script>
    <script>
      const templateFn = hmpl.compile(
        `<div id="wrapper">{% raw %}{{#request src="https://.../api/getButton"}}{{/request}}{% endraw %}</div>`
      );
      const btnWrapper = templateFn().response;
      document.body.append(btnWrapper);
    </script>
  </body>
</html>
```

Here we do almost the same as in the first method, but the trick is that now you can safely reuse the component. Let's say you can do it like this:

```javascript
const btnWrapper1 = templateFn().response;
const btnWrapper2 = templateFn().response;
```

Also, there is a lot of additional functionality that comes from the module - indicators, request error handling, etc. Since the module is based on fetch, you can effectively customize requests and do much more.

### Features (Advantages):

- Reusing components
- Suitable for both small and large applications with thousands of components
- A huge amount of functionality aimed specifically at this server-oriented approach to components displayed on the client
- Flexibility in use

### Drawbacks:

- Connecting two script files
- Creating an additional API

This approach kind of implements the SSR approach, but on the client without the key element for it - visibility for robots, but otherwise - it's a cool method that can make the solution of the problem easier.

## Conclusion

Depending on the situation, you can use either the first approach or the second. In the first one, you have full control over the process, but it is still not suitable when you need to work with several components, since you will have to constantly import files, which is not good.

Thank you all for reading! I hope you found this article helpful!
