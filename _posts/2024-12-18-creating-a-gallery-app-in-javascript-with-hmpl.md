---
layout: post
title: "Creating a Gallery App in JavaScript with HMPL"
date: 2024-12-18 2:10 PM
categories: blog
tags: [HMPL, JavaScript, web-development, tutorial, gallery, image-gallery, responsive-design]
---

Hello everyone! In this article I will describe the process of creating a Gallery application. You can safely take this application and edit it as you wish (you can only change the pictures there, because there is a license). It is small in functionality, but, in my opinion, it is quite suitable for an example of work.

## What does the application look like and what is its functionality?

The application is a small list of images, the pages of which can be navigated. The interface looks like this:

**Desktop**

![Desktop](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/krmilvycbrrdksb9vpqa.png)

**Mobile**

![Mobile](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/nm8epi2helo0e2oormnc.png)

In terms of functionality, you can click the Next button and go to the next page, and by clicking the Previous button, you can return to the first page.

![Second page](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/gwqej4vu1xi6umtv12xb.png)

Also, if you click on any of the images, you can see it in full format:

![full format](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/spz9az5zb55oa3h6rtmz.png)

This is the main functionality that is available in the application.

## Subtleties of the application

One of the main features of this application is that **the images, like the title text, come from the server**. That is, we do not store 10 images in the site repository on the client. They all come from the server. This can be achieved by an approach where we store the HTML of the main content on the server, and on the client we output it to some cells, which, in essence, take up little space on the disk.

Remember, when you clone files from a remote repository, cloning videos or images can take a lot of time when there is very little code there. The same is true here. This is one of the main advantages of such an application.

Also, on the client in the browser, if we take the loading of the application, it can load for several seconds when the user first enters the site. He can close this resource and go to another, so in terms of money this can save you a budget in certain cases.

This approach is server-oriented, but not server side rendering, since the components are rendered on the client and robots will not see the result.

In any case, there is such a way to create a website today and it is quite convenient and has its advantages. Quite a lot of libraries today implement similar functionality. One of these is HMPL.

## The development process and the code itself

First of all, you need to choose the platforms on which the application will be written. By platforms we mean **Express.js** for the backend, and in general **Node.js**, respectively, and on the client we will have a simple **Webpack** assembly.

## Client-side

There are different approaches to where to start first. From the server or from the client. In our case, it would be better to start from the client, because on the server we know that the list of images and the title will already be generated, but how to best integrate them into the DOM - this is exactly what we need to figure out first.

Let's move on to the original HTML file:

**index.html**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Gallery App</title>
  </head>
  <body></body>
</html>
```

It would seem that there is nothing here, and yes, you are right. Components that will be the content will be loaded into this file. We will create them in `.hmpl` extension files, which slightly expand the capabilities of html.

To do this, we will create a `components` folder, where these files will be stored. We will connect each of them to the page via JavaScript. Their markup:

**Gallery.hmpl**

```html
<div>
  <div class="gallery-initial" id="gallery-initial">
    { 
      { 
        src: "http://localhost:8000/api/images", 
        method: "POST" 
      } 
    }
  </div>
  <div class="gallery" id="gallery">
    { 
      { 
        src: "http://localhost:8000/api/images", 
        after:
        "click:.navigation-button", 
        method: "POST" 
      } 
    }
  </div>

  <div class="pagination">
    <button class="navigation-button" data-page="1" id="previous" disabled>
      Previous
    </button>
    <button class="navigation-button" data-page="2" id="next">Next</button>
  </div>

  <div class="modal" id="modal">
    <img
      src="https://raw.githubusercontent.com/hmpl-language/media/refs/heads/main/logo.png"
      alt=""
    />
  </div>
</div>
```

It is worth noting that there are two objects marked here. The first one is triggered when the page is loaded, while the second one is triggered after clicking on the navigation buttons.

**Title.hmpl**

```html
<h1 id="title">{% raw %}{{#request src="http://localhost:8000/api/title"}}{{/request}}{% endraw %}</h1>
```

Here, the objects will be changed to HTML from the server. Now, they should be connected. To do this, import them into main.js:

```javascript
import "./index.scss";
import GalleryTemplate from "./components/Gallery/Gallery.hmpl";
import TitleTemplate from "./components/Title/Title.hmpl";

const { response: Title } = TitleTemplate();

const { response: Gallery } = GalleryTemplate(({ request: { event } }) => {
  return {
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      page: event ? Number(event.target.getAttribute("data-page")) : 1,
    }),
  };
});

document.body.append(Title);
document.body.append(Gallery);

const gallery = document.querySelector("#gallery");
const galleryInitial = document.querySelector("#gallery-initial");
const modal = document.querySelector("#modal");
const modalImg = modal.querySelector("img");
const navigationButtons = document.querySelectorAll(".navigation-button");

const setActive = (e) => {
  if (e.target.tagName === "IMG") {
    modalImg.src = e.target.src;
    modal.classList.add("active");
  }
};

modal.addEventListener("click", () => {
  modal.classList.remove("active");
});

galleryInitial.addEventListener("click", (e) => {
  setActive(e);
});

gallery.addEventListener("click", (e) => {
  setActive(e);
});

for (let i = 0; i < navigationButtons.length; i++) {
  const btn = navigationButtons[i];
  btn.addEventListener("click", () => {
    if (!galleryInitial.classList.contains("hidden"))
      galleryInitial.classList.add("hidden");
    btn.setAttribute("disabled", "");
    navigationButtons[i === 0 ? 1 : 0].removeAttribute("disabled");
  });
}
```

Also, in `main.js` we will describe the logic of the application. Here we send a request to the server and receive HTML, which we have not prepared yet, but will prepare during the development process. Since the server HTML is in the `div` block, we can easily add components to the DOM without waiting for a response.

Here you need to add another switch between the `disabled` attribute for the buttons. Ideally, it would be worth getting the number of pages from the server and focusing on that, but since the application itself is small and all the constants are known in advance, it is better not to overload it with additional code. By the way, the image change itself will happen automatically, upon request to the API.

And it will also be necessary to show the image on click - this is done by hanging an event on the wrapper tag and determining that if it is a click on the image, then the block must be made active accordingly.

The styles we include look like this:

**index.scss**

```scss
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f4f4f4;
}

h1 {
  margin: 20px 0;
  color: #333;
}

.gallery-initial.active {
  display: flex;
}

.gallery,
.gallery-initial {
  display: flex;
  gap: 20px;
  width: 90%;
  max-width: 1000px;

  @media (max-width:1023px) {
   display: grid;
   grid-template-columns: repeat(2, 1fr);
   max-width: unset;
   justify-content: center;
   align-items: center;
   width: 100%;
  }
}

.hidden {
  display: none;
}

.gallery img,
.gallery-initial img {
  width: 150px;
  height: 100px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s;
}

.gallery img:hover,
.gallery-initial img:hover {
  transform: scale(1.05);
}

.modal {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  justify-content: center;
  align-items: center;
}

.modal img {
  max-width: 90%;
  max-height: 90%;
  border-radius: 10px;
}

.modal.active {
  display: flex;
}

.pagination {
  margin: 20px 0;
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
}

.pagination button {
  padding: 10px 20px;
  border: none;
  background-color: #333;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.pagination button:hover {
  background-color: #555;
}

.pagination button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
```

The styles are minimal, just so that the gallery looks more or less presentable.

Also, I usually use ready-made webpack assemblies that I made a long time ago (I had to make a website for the framework), but now there is no point in dwelling on each point of what is responsible for what in `webpack.config.js`. The file can be viewed [here](https://github.com/hmpl-language/examples/blob/main/gallery-app/main/webpack.config.js).

Now, it's time to move on to the backend.

## Backend

When creating a backend, we can now calmly look at the client and, based on this, create the routes needed for it. Let's say I created a gallery - great, then I need to download the pictures and set up the route described there.

We see that the route that needs to be created is `/api/images`:

```html
src: "http://localhost:8000/api/images", 
```

Now, for it, you just need to prepare the HTML markup that would be issued in response. Moreover, the method for the route will be `POST`, because in the `body` of `RequestInit` you need to pass `page` with the required value. Let's set a similar route:

**routes/post.js**

```javascript
const express = require("express");
const expressRouter = express.Router();

const imagePaths = [
  "http://localhost:8000/images/img1.jpg",
  "http://localhost:8000/images/img2.jpg",
  "http://localhost:8000/images/img3.jpg",
  "http://localhost:8000/images/img4.jpg",
  "http://localhost:8000/images/img5.jpg",
  "http://localhost:8000/images/img6.jpg",
  "http://localhost:8000/images/img7.jpg",
  "http://localhost:8000/images/img8.jpg",
  "http://localhost:8000/images/img9.jpg",
  "http://localhost:8000/images/img10.jpg",
];

const imagesController = (req, res) => {
  const { page } = req.body;

  if (!page || isNaN(page)) {
    return res.status(400).send("Page number error");
  }

  const pageNumber = parseInt(page);
  const itemsPerPage = 5;
  const startIndex = (pageNumber - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  if (startIndex >= imagePaths.length || pageNumber < 1) {
    return res.status(404).send("Page not found");
  }

  const imagesForPage = imagePaths.slice(startIndex, endIndex);

  const htmlResponse = `
      ${imagesForPage
        .map((img, index) => `<img src="${img}" alt="Image${index}"/>`)
        .join("\n")}
  `;

  res.send(htmlResponse);
};

expressRouter.post("/images", imagesController);

module.exports = expressRouter;
```

It is important that we generate images dynamically, depending on the page. Also, it is worth noting that the path for the images will not be addressed to folders, but to the address itself. In the `app.js` file, we will do just this so that the images are loaded from the folder.

Now, it's super simple. When we make a `GET` request to get the title, we'll send a simple html file. Here's what it will look like in code:

**routes/get.js**

```javascript
const express = require("express");
const expressRouter = express.Router();
const path = require("path");

const titleController = (req, res) => {
  res.sendFile(path.join(__dirname, "../components/GET/title.html"));
};

expressRouter.use("/title", titleController);

module.exports = expressRouter;
```

In the html file we will just have a `span` with the text _Gallery App_ and that's it. In principle, it would be possible to make a `POST` request and add multilingualism to the application, but this, again, is a load on the application. I wanted to make it more or less simple, but at the same time beautiful and functional.

Now, all that remains is to connect all of this into one file and launch our server. To do this, let's import our files and create an express application:

**app.js**

```javascript
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");

const PORT = 8000;
const app = express();

const getRoutes = require("./routes/get");
const postRoutes = require("./routes/post");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({ origin: true, credentials: true }));

const imagesFolder = path.join(__dirname, "./images");
app.use("/images", express.static(imagesFolder));

app.use(express.static(path.join(__dirname, "src")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "src/index.html"));
});

app.use("/api", getRoutes);
app.use("/api", postRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
```

Here we set up `CORS` so that we can send a request from another `localhost` port, and also load images from a folder. Specifically, we do this here:

```javascript
const imagesFolder = path.join(__dirname, "./images");
app.use("/images", express.static(imagesFolder));
```

Also, you can specify your `PORT` for the server, but I specified the default `8000`. You also need to configure `bodyParser` for convenient work with HTML and, in fact, just connect the routes to the api. And now, I think, you can safely use the application!

## Conclusion

The application, even such a seemingly small one, turned out to be quite complex given that the minimum functionality was implemented. But, this is also cool, because there is ground for modifications, high-quality assembly, and simply modern modules. You can implement the backend in PHP or something else, the meaning for the client will not change much, so I think that this application can even go well as a pet project.

Thank you all very much for reading the article! It turned out to be quite large, even in the case that I tried to shorten the narrative somewhere, somewhere not to cover the subtleties, but even so it turned out to be a lot, but, I hope, interesting and useful for you!
