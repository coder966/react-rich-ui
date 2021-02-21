A set of commonly-used React components with super friendly API

> **_NOTE:_**  Previously known as [@coder966/react-rich-ui](https://www.npmjs.com/package/@coder966/react-rich-ui)

## Installation

```bash
$ npm i --save react-rich-ui
```

You must have `bootstrap` stylesheet loaded. Either by importing it from the npm package, or from a CDN. Example:
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css" integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l" crossorigin="anonymous">
```

## Optional peer dependencies:
- `axios`: If you want to use it instead of `fetch`, which is the default HTTP Client used by `RruPageableTable`.
- `yup`: For form validation. See `RruForm` section for more details.
- `font-awesome`: You must load `font-awesome` for icons to work.
