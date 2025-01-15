# Why hmpl?

The HMPL template language extends the capabilities of regular HTML by adding request objects to the markup to reduce the code on the client. When creating modern web applications, frameworks and libraries are used, which entail the need to write a bunch of boilerplate code, as well as connecting additional modules, which again make JavaScript files very large. If you recall the same SPA, then there js files can reach several hundred megabytes, which makes the first site load speed quite long. All this can be avoided by generating the markup on the server and then loading it on the client. Example of comparing the file size of a web application on Vue and HMPL.js:

```javascript
createApp({
  setup() {
    const count = ref(0);
    return {
      count
    };
  },
  template: `<div>
        <button @click="count++">Click!</button>
        <div>Clicks: {{ count }}</div>
    </div>`
}).mount("#app");
```

> Size: **226** bytes (4KB on disk)

```javascript
document.querySelector("#app").append(
  hmpl.compile(
    `<div>
        <button>Click!</button>
        <div>Clicks: {{ src: "/api/clicks", after: "click:button" }}</div>
    </div>`
  )().response
);
```

> Size: **209** bytes (4KB on disk)

If we do not take into account that in one case we store the state on the client, and in the other on the server, as well as the response speed from the server, then we can see that with different file sizes we get the same interface. And this is only a small example. If we take large web applications, then the file sizes there can be several times smaller.