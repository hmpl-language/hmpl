---
title: Server Configuration
description: Setting up your server for HMPL
head:
  - tag: meta
    attrs:
      name: keywords
      content: hmpl server configuration, content-type text/html, express setup, allowed content types, server templates
---

Since version `2.2.2`, a very important feature has been added in working with the server, which will make working with the web application much safer. Now, for each route that outputs HTML, you need to specify the `Content-Type`, which has the value `text/html`.

Let's say if we set up the server using Express.js, then you can specify it as follows in the response:

```javascript
const express = require("express");
const expressRouter = express.Router();
const path = require("path");

const customController = (req, res) => {
  res.type("text/html");
  // or res.set("Content-Type", "text/html");
  res.sendFile(path.join(__dirname, "../custom.html"));
};

expressRouter.use("/getCustomHTML", customController);

module.exports = expressRouter;
```

The same setup applies if you, for example, make an API in php and use Laravel:

```php
namespace App\Http\Controllers;

use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Response;

class CustomController extends Controller
{
    public function showCustomHTML()
    {
        $filePath = resource_path('views/custom.html');

        if (!File::exists($filePath)) {
            return response('File not found', 404);
        }

        $content = File::get($filePath);

        return Response::make($content, 200)
            ->header('Content-Type', 'text/html');
    }
}
```

If you try to send a file of a different format via the API, say, an image or a JSON object, you will receive the following message:

```bash
BadResponseError: Expected "text/html" but received "application/json"
```

However, if there is a need to use all types that support the `text` method as before, then you can specify [allowedContentTypes](https://spec.hmpl-lang.dev/#sec-allowedcontenttypes-property).
