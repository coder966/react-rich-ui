[Docs](/) > [v1](/docs/v1/get-started) > [Get Started](/docs/v1/get-started)

# Getting Started

## Installation

```bash
$ npm i --save react-rich-ui
```

## Import the library stylesheet

### From the npm package

Add the following import to your React app index.js file:

```js
import 'react-rich-ui/dist/index.css';
```

### Or from a CDN

Add the following tag to your index.html file:

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/react-rich-ui@1.6.3/dist/index.css"
  integrity="sha384-CrKK9CcPYhApdIxMGxMZBvlXZ5Mf2fLIGbDmgbOOwtSVACYVWlYhaqxDbfNOMnPT"
  crossorigin="anonymous"
/>
```

## Import Bootstrap v4.x CSS

Please refer to Bootstrap official website on how to setup [Bootstrap v4.x](https://getbootstrap.com/docs/4.6/getting-started/introduction/).

## Optional peer dependencies

- `axios`: If you want to use it instead of `fetch`, which is the default HTTP Client used by `RruPageableTable`.
- `yup`: For form validation. See `RruForm` section for more details.
- `font-awesome`: You must load `font-awesome` stylesheet for icons to work.

## Components:

- [Forms](/docs/v1/components/RruForm)
- [Tables](/docs/v1/components/RruPageableTable)
- [Wizards](/docs/v1/components/RruStepsWizard)
- [Buttons](/docs/v1/components/RruButton)
