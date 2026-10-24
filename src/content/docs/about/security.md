---
title: Security
description: Security considerations for HMPL
head:
  - tag: meta
    attrs:
      name: keywords
      content: hmpl security, xss protection, sanitize html, dompurify usage, disallowed tags, secure templates
---

When loading HTML from untrusted sources, you may encounter the problem of XSS attacks. By default, any content checks are disabled in the module, since it is assumed that all HTML will be loaded with a full understanding of what is coming, but nevertheless, to protect the project from unwanted risks, you can use the following functionality.

## Removing potentially dangerous tags from server response

Thanks to the [disallowedTags](https://spec.hmpl-lang.dev/#sec-disallowedtags-property) property, you can do this by passing the appropriate array:

```javascript
const templateFn = hmpl.compile(
  `<div>
    {{#request
      src="https://some-extermal-api.example/getHTML"
      disallowedTags=["script", "iframe"]
    }}
    {{/request}}
  </div>`
);
```

This will remove unwanted tags from the server response, but again, this method cannot provide complete protection, since there are also scripts that work through the `on` attributes in tags, broken images, etc.

## Sanitization

For complete protection against XSS attacks, in version `2.2.5` the [DOMPurify](https://npmjs.com/package/dompurify) module was introduced, which removes all potentially dangerous loopholes in HTML through which viruses can be loaded or simply steal your data.

To enable this functionality, you can set the `sanitize` property to `true`.

```javascript
const templateFn = hmpl.compile(
  `<div>
    {{#request
      src="https://some-extermal-api.example/getHTML"
      sanitize=true
    }}
    {{/request}}
  </div>`
);
```

Under the hood, it uses the `DOMPurify.sanitize` method.

## Specifying the correct `Content-Types`

By default, the module only processes responses with the `text/html` type, which makes the module more secure and minimizes risks, but if you use a non-default [allowedContentTypes](https://spec.hmpl-lang.dev/#sec-disallowedtags-property) property, it is better to avoid this.

## Other tips not related to the module

### Content-Security-Policy (CSP)

Content Security Policy (CSP) is a powerful tool for protecting web applications against Cross-Site Scripting (XSS) attacks. Here’s an example of CSP rules that can help safeguard your application from XSS attacks:

```http
Content-Security-Policy:
    default-src 'self';                    /* Allow loading resources only from the same origin */
    script-src 'self' 'nonce-<random-nonce>' 'strict-dynamic' https://apis.example.example; /* Allow scripts from the same origin, with a specified nonce and from a specific API */
    object-src 'none';                     /* Disallow the use of <object>, <embed>, <applet> */
    base-uri 'self';                       /* Allow base URIs only from the same origin */
    frame-ancestors 'none';                /* Prevent the page from being embedded in an iframe */
    img-src 'self' data: https://images.example.example; /* Allow loading images from the same origin, data URIs, and a specified host */
    style-src 'self' 'unsafe-inline';     /* Allow styles from the same origin and inline styles (if necessary) */
    font-src 'self' https://fonts.example.example; /* Allow loading fonts from the same origin and a specified host */
    connect-src 'self' https://api.example.example; /* Allow connections (e.g., AJAX requests) to the same origin and a specified API */
```

#### Explanation of the rules:

1. **default-src 'self'**: Allows loading resources only from the same origin.
2. **script-src**: Allows execution of scripts only from the same origin, specifying a nonce for dynamically created scripts and from a certain API.
3. **object-src 'none'**: Disallows loading objects to prevent vulnerabilities in plugins.
4. **base-uri 'self'**: Allows changing the base URI only from the same origin.
5. **frame-ancestors 'none'**: Prevents the page from being embedded in an iframe, protecting against clickjacking attacks.
6. **img-src**: Allows loading images only from the same origin, data URIs (e.g., for base64 images), and a specified host.
7. **style-src**: Allows loading styles from the same origin and inline styles (if necessary, but it is recommended to avoid using them).
8. **font-src**: Allows loading fonts from the same origin and a specified host.
9. **connect-src**: Allows connections (e.g., AJAX requests) to the same origin and a specified API.

#### Practical Tips:

- Regularly update your CSP policy in accordance with changes in your application.
- Use tools to check your CSP to ensure it does not block necessary resources.
- Be cautious with the use of `'unsafe-inline'` and `'unsafe-eval'`, as they make your policy less secure.

These rules can be adapted based on the specific requirements of your application and its architecture.

Certainly! Here’s a rule that describes how to set the `HttpOnly` and `Secure` flags for cookies in PHP, along with an example.

### HTTPOnly and Secure flags for cookies

When setting cookies in your web application, always use the `HttpOnly` and `Secure` flags to enhance security. The `HttpOnly` flag prevents JavaScript from accessing the cookie, thus mitigating the risk of client-side script attacks such as Cross-Site Scripting (XSS). The `Secure` flag ensures that the cookie is only sent over secure HTTPS connections, protecting it from being intercepted during transmission.

#### PHP Example:

```php
<?php
// Set cookie parameters
$cookie_name = "example_cookie";
$cookie_value = "example_value";
$cookie_lifetime = time() + (86400 * 30); // 30 days
$cookie_path = "/";
$cookie_domain = ""; // Set to your domain if needed
$cookie_secure = true; // Only send cookie over HTTPS
$cookie_httponly = true; // Prevent access to cookie via JavaScript

// Set the cookie with HttpOnly and Secure flags
setcookie($cookie_name, $cookie_value, $cookie_lifetime, $cookie_path, $cookie_domain, $cookie_secure, $cookie_httponly);

// Output a message to inform that the cookie has been set
if (isset($_COOKIE[$cookie_name])) {
    echo "Cookie '{$cookie_name}' is set!";
} else {
    echo "Cookie '{$cookie_name}' has been created.";
}
?>
```

#### Explanation:

- **`setcookie()`** function is used to create a cookie.
- **`$cookie_secure`** is set to `true`, which will ensure that the cookie is sent only over HTTPS connections.
- **`$cookie_httponly`** is set to `true`, which will prevent JavaScript from accessing the cookie.
- The lifetime of the cookie is set to 30 days in this example, but you can adjust it according to your needs.

Make sure that your server is configured to use HTTPS to utilize the `Secure` flag effectively.
