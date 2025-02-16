# Getting started

This guide will help you quickly set up and start using HMPL to dynamically render UI components from the server.

You can follow along in StackBlitz or set up a project locally.

- [StackBlitz](https://stackblitz.com/edit/stackblitz-starters-kelupxnr?file=src%2Fmain.js&theme=light)
- [Local Setup](#local-setup)
- [Rendering Your First Component](#rendering-your-first-component)
- [Rendering Dynamic Components](#rendering-dynamic-components)

## Local Setup
To setup a local HMPL project, run the following commands:
```sh
npx degit toyaAoi/hello-hmpl-starter hello-hmpl-starter
cd hello-hmpl-starter
npm install
npm run dev
```
This will:
- Download a starter template for HMPL.
- Install the necessary dependencies.
- Start the Vite dev server.

Once server is running, open your browser at Vite's server URL (printed in the terminal).
Now let's create our first component.

## Rendering Your First Component

### 1. Create an HMPL template

Inside the `src` directory, create a new folder named `hmpl`.
Then, create a file named `HelloWorld.hmpl` inside the `hmpl` folder and add the following code:

```hmpl
<div>
  <div>
    {{
      src: "/api/hello",
      indicators: [
        {
          trigger: "pending",
          content: "<p>Loading...</p>;"
        },
        {
          trigger: "rejected",
          content: "<p>Error!</p>;"
        }
      ]
    }}
  </div>
</div>
```

- `src`: Specifies the API endpoint (`/api/hello`), From where the component will be fetched.
- `indicators`: Defines UI elements for different request states:
  - `"pending"` →  Shows the **Loading** component while waiting for a response.
  - `"rejected"`: → Show the **Error** component if the request fails.

### 3. Load the component into DOM
Open `main.js` inside the `src` folder and import the component:

```javascript
import HelloWorld from './hmpl/HelloWorld.hmpl';

document.body.appendChild(HelloWorld().response);
```
We import `HelloWorld` as a [HMPL template function](/types.md#hmpltemplatefunction). To make the request to server we invoke this template function. It returns a [HMPL instance object](/types.md#hmplinstance) and the `response` property holds the components received from server and the request state indicator components.

Saving the files will render the component received from the server.

> The responses are served by a mock server located in the mock/ directory. You can modify these mock API responses to test different scenarios.

## Rendering Dynamic Components

### 1. Create a Form Component

Create a new file `Form.hmpl` inside the `hmpl` directory and add the following code:

```hmpl
<div>
  <form id="form" onsubmit="event.preventDefault()">
    <input type="text" name="name" placeholder="Enter your name" />
    <input type="submit" value="Submit" />
  </form>

  {{
    src: "/api/hello",
    method: "POST",
    after: "submit:#form",
    autoBody: true,
    indicators: [
      {
        trigger: "pending",
        content: "<p>Loading...</p>;"
      }
    ]
  }}
</div>
```
- `method`: → Sets the request method (POST).
- `after: "submit:#form"` → Schedules requests on the form submit event.
- `autoBody: true` → Automatically converts form data into JSON before sending.

### 2. Load the Form Component to DOM

Edit `main.js` to include the form component:

```javascript
import HelloWorld from './hmpl/HelloWorld.hmpl';
import Form from './hmpl/Form.hmpl';

document.body.appendChild(HelloWorld().response);
document.body.appendChild(Form().response);
```

### 3. Submit the form

- Fill your name and click **Submit**.
- You should see the response greeting appear.


## Next Steps

Now that you’ve set up your first components, here’s what you can explore next:

- 📖 [Learn more about HMPL](/hmpl.md) – Understand how HMPL works under the hood.
- 🛠️ [Explore other examples](/examples.md) – See other use cases and patterns.
- 📰 [Read our blog](https://blog.hmpl-lang.dev/) – Stay updated with the latest HMPL features and best practices.
- 🌱 [Contribute to HMPL](https://github.com/hmpl-language/hmpl) – Help improve HMPL by reporting issues, suggesting features, or contributing code!
