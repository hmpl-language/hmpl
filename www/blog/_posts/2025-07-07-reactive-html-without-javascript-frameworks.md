---
layout: post
title: "Reactive HTML Without JavaScript Frameworks"
date: 2025-07-07 2:10 PM
categories: blog
tags: [HMPL, JavaScript, reactive, frameworks, performance, web-development, HTML, lightweight]
---

Hello everyone! In this article, I'll show you how to create reactive HTML interfaces without relying on heavy JavaScript frameworks like Vue or Angular. We'll explore how HMPL.js provides a lightweight alternative that achieves reactivity through server-side rendering while keeping your client-side code minimal.

## The Problem with JavaScript Frameworks

In the modern web development landscape, JavaScript frameworks like Vue and Angular dominate discussions about reactive interfaces. However, they come with significant drawbacks that can impact your project:

### Common Framework Issues

- **Boilerplate Code**: Developers often write repetitive setup code before implementing actual features
- **Overly Complex Architecture**: Frameworks impose their own architecture that can be too complex for simple projects
- **Performance Overhead**: Large runtime libraries bundle unnecessary code
- **Vendor Lock-in**: Makes it harder to switch technologies later
- **Bundle Size**: Many projects use only a fraction of a framework's features yet pay the full cost

For smaller applications, a lightweight alternative like HMPL.js can often achieve reactivity **without unnecessary bloat**.

## The HMPL.js Solution

HMPL.js takes a different approach by leveraging server-side rendering while maintaining reactivity on the client. Instead of loading heavy frameworks, you can create reactive interfaces with just a few script tags.

### Key Benefits

1. **Minimal Client Code**: Only a few kilobytes of JavaScript
2. **Server-Oriented**: Components are rendered on the server and loaded dynamically
3. **No Framework Dependencies**: Pure HTML with lightweight HMPL.js
4. **Reusable Components**: Components can be shared across different web applications

## Getting Started with HMPL.js

Let's look at a simple example that demonstrates how to create reactive HTML without heavy frameworks:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Reactive HTML Example</title>
  </head>
  <body>
    <main>
      <template hmpl>
        <div>
          {{#request src="/api/header.html"}}
            {{#indicator trigger="error"}}
              <p class="indicator">Header loading error</p>
            {{/indicator}}
          {{/request}}
        </div>
      </template>
      
      <div class="content"></div>
      
      <template hmpl>
        <div>
          {{#request src="/api/footer.html"}}
            {{#indicator trigger="error"}}
              <p class="indicator">Footer loading error</p>
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

### How It Works

1. **Server-Side Components**: Your components are stored as HTML files on the server
2. **Dynamic Loading**: HMPL.js fetches components from the server when needed
3. **Error Handling**: Built-in error indicators for failed requests
4. **Minimal Dependencies**: Only requires a few lightweight libraries

## Server-Side Implementation

On your server, you can serve components as simple HTML files:

**/api/header.html**
```html
<header class="site-header">
  <nav>
    <a href="/">Home</a>
    <a href="/about">About</a>
    <a href="/contact">Contact</a>
  </nav>
</header>
```

**/api/footer.html**
```html
<footer class="site-footer">
  <p>&copy; 2025 Your Website. All rights reserved.</p>
</footer>
```

## Advanced Features

### Reactive Data Binding

HMPL.js supports reactive data binding without the complexity of full frameworks:

```html
<template hmpl>
  <div>
    {{#request src="/api/user-profile.html" data="userData"}}
      <div class="user-profile">
        <h2>{{userData.name}}</h2>
        <p>{{userData.email}}</p>
      </div>
    {{/request}}
  </div>
</template>
```

### Event Handling

You can handle user interactions with simple event listeners:

```html
<button onclick="updateProfile()">Update Profile</button>

<script>
function updateProfile() {
  // HMPL.js will automatically re-render the component
  hmpl.request('/api/user-profile.html', { userId: 123 });
}
</script>
```

## Performance Benefits

### Bundle Size Comparison

| Framework | Bundle Size | HMPL.js |
|-----------|-------------|---------|
| Vue.js | ~33KB | ~5KB |
| Angular | ~135KB | ~5KB |

### Loading Performance

- **Initial Load**: Only loads essential HMPL.js libraries
- **Component Loading**: Components are loaded on-demand
- **Caching**: Server-side components can be cached effectively
- **SEO Friendly**: Content is available to search engines

## When to Use HMPL.js

### Perfect For:
- **Simple to Medium Applications**: Where full frameworks are overkill
- **Content-Heavy Sites**: Blogs, documentation, marketing sites
- **Prototypes**: Quick development without framework setup
- **Legacy Integration**: Adding reactivity to existing HTML sites

### Consider Alternatives When:
- **Complex State Management**: Applications with complex state requirements
- **Real-time Features**: Applications requiring WebSocket connections
- **Large Teams**: Teams already invested in specific frameworks

## Comparison with Other Solutions

### vs. HTMX
- **HMPL.js**: More focused on component-based architecture
- **HTMX**: Better for full-page updates and form handling

### vs. Alpine.js
- **HMPL.js**: Server-oriented with minimal client code
- **Alpine.js**: Client-side reactivity with more JavaScript

### vs. Vanilla JavaScript
- **HMPL.js**: Provides structure and conventions
- **Vanilla JS**: Complete freedom but requires more boilerplate

## Best Practices

### 1. Component Organization
```
/api/
  ├── header.html
  ├── footer.html
  ├── sidebar.html
  └── components/
      ├── user-card.html
      └── product-list.html
```

### 2. Error Handling
Always include error indicators in your templates:

```html
{{#request src="/api/component.html"}}
  {{#indicator trigger="error"}}
    <p class="error">Failed to load component</p>
  {{/indicator}}
  {{#indicator trigger="loading"}}
    <p class="loading">Loading...</p>
  {{/indicator}}
{{/request}}
```

### 3. Performance Optimization
- **Cache Components**: Use server-side caching for frequently accessed components
- **Minimize Requests**: Group related components when possible
- **Lazy Loading**: Load components only when needed

## Conclusion

JavaScript frameworks provide powerful solutions but often introduce unnecessary complexity, boilerplate code, and performance overhead for simpler applications. Lightweight alternatives like HMPL.js demonstrate that reactivity can be achieved without heavy dependencies, offering a more efficient approach for many use cases.

By carefully evaluating project needs, developers can choose the right balance between functionality and simplicity, avoiding over-engineering while still delivering dynamic user experiences.

### Key Takeaways

1. **Server-Oriented Approach**: Components are rendered on the server and loaded dynamically
2. **Minimal Client Code**: Only a few kilobytes of JavaScript required
3. **No Framework Lock-in**: Pure HTML with lightweight HMPL.js
4. **Better Performance**: Smaller bundle sizes and faster loading
5. **SEO Friendly**: Content is available to search engines

HMPL.js represents a practical middle ground between full frameworks and vanilla JavaScript, providing the reactivity you need without the complexity you don't.

---

*This article is based on the original tutorial by Anthony Max, available on [Dev.to](https://dev.to/anthonymax/reactive-html-without-javascript-frameworks-1anh).* 
