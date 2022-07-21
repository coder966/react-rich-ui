[Docs](/) > [V2](/docs/v2/get-started) > [Get Started](/docs/v2/get-started)

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

## Import Bootstrap CSS + JS

Please refer to Bootstrap official website on how to setup Bootstrap.
For [Bootstrap v4.x](https://getbootstrap.com/docs/4.6/getting-started/introduction/) and for [Bootstrap v5.x](https://getbootstrap.com/docs/5.2/getting-started/introduction/).

## Optional peer dependencies

- `axios`: If you want to use it instead of `fetch`, which is the default HTTP Client used by `RruPageableTable`.
- `yup`: For form validation. See `RruForm` section for more details.

## Components

- [Forms](/docs/v2/components/RruForm)
- [Tables](/docs/v2/components/RruPageableTable)
- [Wizards](/docs/v2/components/RruStepsWizard)
- [ModalButton](/docs/v2/components/RruModalButton)
