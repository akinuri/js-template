# Simple JS Templating

A lightweight JavaScript utility for managing and rendering HTML templates with dynamic data insertion and placeholder replacement.

## Usage

### Define a template

```html
<template data-name="greeting">
  <div>Hello, {{ name }}!</div>
</template>
```

### Put a placeholder

```html
<div data-template="greeting">World</div>
<greeting>World</greeting>
```

### Run/render globally

```js
renderTemplateInstances();
```

### The output

```html
<div>Hello, World!</div>
```
