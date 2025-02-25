# Request

The main thing in hmpl syntax is string interpolation. In most frameworks, such as Cample and others, string interpolation occurs using double curly braces, but since it is not convenient to do three curly braces together with a request object, a single brace was chosen. The format in which string interpolation works is as follows - `{${request}}`.

> When working with request, all `script` tags are removed by the module.

The main way to send a request to the server is through a request object. This object includes the properties described below in documentation.

```hmpl
{
  {
     "src":"/api/test"
  }
}
```

This object is parsed using `JSON5.parse`, so for convenience you can use the `stringify` function by passing the object that needs to be inserted into the string:

```javascript
const request = stringify({
  src: "/api/test"
});

const templateFn = compile(`{${request}}`);
```

This object is replaced with HTML that comes from the server using the `template` tag.

Until the request is sent, there will be a comment in place of the request object that looks like this:

```html
<!--hmpl1-->
```

This comment is replaced with HTML that comes from the server.

## src

This property specifies the url to which the request will be sent. Property `src` is required.

```hmpl
{
  {
     "src":"http://localhost:5000/api/test"
  }
}
```

It is worth considering that if there is no hostname (protocol etc.) in the url, the hostname (protocol etc.) of the address from which the request is sent will be substituted.

```hmpl
{
  {
     "src":"/api/test"
  }
}
```

## method

This property specifies the request method that is sent to the server. The default value is the `get` method.

```hmpl
{
  {
     "method":"get"
  }
}
```

The supported methods are `GET`, `POST`, `PUT`, `PATCH` or `DELETE`.

## after

The `after` property specifies after which event the request will be sent to the server. The value of the property is the string of the following construction `${event}:${selectors}`, where event is the event after which the request will be sent. and selectors are the targets to which event handlers will be assigned

```hmpl
{
  {
     "after":"click:.target"
  }
}
```

> Selectors are not looked for in the `document`, but in the template string.

The HTML that comes from the server will change to a new one each time in the DOM if events are triggered.

## repeat

The `repeat` property receives a boolean value. If `true`, the request will be sent every time the event is processed on the `selectors` from the `after` property, and if `false`, the request will be sent only once, and after that all event listeners will be removed.

```hmpl
{
  {
     repeat:false
  }
}
```

By default, the value is `true`.

## indicators

The indicators property is intended to determine what HTML should be shown for a particular request status. The HTML markup in indicators is not extended by the module (it is not hmpl). The value is an object or an array of objects of type [HMPLIndicator](/types.md#hmplindicator).

```hmpl
{
  {
    "indicators": [
       {
         "trigger": "pending",
         "content": "<p>Loading...</p>"
       },
       {
         "trigger": "rejected",
         "content": "<p>Error</p><button>reload</button>"
       }
    ]
  }
}
```

The value of the `content` property is a string containing HTML markup.

The `trigger` values ​​are [http codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status) without success (because they come from html), as well as values ​​based on the `rejected` and `pending` [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) states, and a generic `error` value for all errors.

To avoid writing an indicator for each error, the `error` value is triggered by `rejected` errors and error codes (from 400 to 599).

The values ​​of the http codes that indicate errors (from 400 to 599), as well as the value `rejected`, overlap the value `error`.

## autoBody

Specifies automatic generation for the body property in [HMPLRequestInit](/types.md#hmplrequestinit). Takes a Boolean value or an [HMPLAutoBodyOptions](/types.md#hmplautobodyoptions) object.

```hmpl
<div>
  <form onsubmit="function prevent(e){e.preventDefault();};return prevent(event);" id="form">
    <div class="form-example">
      <label for="name">Enter your email: </label>
      <input type="text" name="email" id="email" required />
    </div>
    <div class="form-example">
      <input type="submit" value="Subscribe!" />
    </div>
  </form>
  {
    {
      "src":"/api/subscribe",
      "after":"submit:#form",
      "autoBody":true
    }
  }
</div>
```

```javascript
const elementObj = templateFn({
  // body: new FormData(event.target, event.submitter)
});
```

If this value is enabled, it overwrites the old body value, but only if [HMPLRequestInit](/types.md#hmplrequestinit) is not obtained from the [RequestInit function](/hmpl.md#requestinit-function).

If `true`, the property value will be the following object:

```javascript
{
  formData: true,
}
```

If `false`, the property value will be the following object:

```javascript
{
  formData: false,
}
```

For now, automatic generation is supported only for `FormData` in forms, but future versions are also expected to implement functionality for `input`, `progress` and other tags where generation is useful.

The `FormData` generation function looks like this:

```javascript
const body = new FormData(event.target, event.submitter);
```

It is worth considering that automatic generation will only work for the `form` tag and the [SubmitEvent](https://developer.mozilla.org/en-US/docs/Web/API/SubmitEvent) type event.

## memo

Enables request memoization. Allows you to optimize the application without re-rendering the DOM again. This process can be compared to `no-cache` for [`RequestСache`](https://developer.mozilla.org/en-US/docs/Web/API/Request/cache#value).

```hmpl
{
  {
     memo:true
  }
}
```

By default, the value is `false`.

The memoization process itself looks like this:

<img  src="/images/memo.png" alt="memoization" >

Also, response memoization only works with [repeat](#repeat) enabled.

[More about memo](https://blog.hmpl-lang.dev/2024/10/03/memoization-in-hmpl.html)

## initId

The `initId` property references the `id` of the [HMPLRequestInit](/types.md#hmplrequestinit) dictionary and determines what initialization the request will have. The value accepts both a `number` and a `string`.

```hmpl
<div>
  {
    {
      "src":"/api/test",
      "initId":"1"
    }
  }
  {
    {
      "src":"/api/test",
      "initId":2
    }
  }
</div>
```

```javascript
const requestInits = [
  { id: "1", value: {...} },
  { id: 2, value: {...} },
];
const instance = templateFn(requestInits);
```

One dictionary can be referenced by several requests at once. This can be compared to the implementation of keys in databases

## allowedContentTypes

Sets the list of allowed `Content-Types` in the `headers` in the response to a request to the server. The value is either an asterix `*` or an array of strings. If the array is empty, as with asterix, all types that support the `text` method will be passed.

> For security reasons of working with the server, it is better not to change this property. When processing routes with an unknown `Content-Type`, there is a risk of getting uncontrolled behavior in the application. Let's say if this is an `application/octet-stream`, then the simple phrase `Hello, World!` will come in the format `48 65 6C 6C 6F 2C 20 77 6F 72 6C 64 21`

```hmpl
{
  {
     "allowedContentTypes":["application/json; charset=utf-8", "text/plain"]
  }
}
```

The default value of the property is `["text/html"]`. On the [Server Configuration](/server-configuration.md) pages you can see information on how to configure the backend for convenient work with the module.
