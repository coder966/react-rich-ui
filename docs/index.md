# Getting Started

## Installation

```bash
$ npm i --save react-rich-ui
```

## Import the library stylesheet

### From the npm package

Add the following import to your React app index.js file:

```js
import 'react-rich-ui/dist/style.css';
```

### Or from a CDN

Add the following tag to your index.html file: (replace `2.5.1` in the URL with the version you are using)

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/react-rich-ui@2.5.1/dist/style.css" />
```

### Saudi DGA Platforms Design CSS
A ready-made css stylesheet compatible with DGA requirements is available <a href="https://github.com/coder966/react-rich-ui/blob/master/.storybook/dga.css" target="_blank">here</a>.
Please note that you need to load this CSS file along with the base CSS file mentioned above. NOT this alone.


## Import Bootstrap (CSS + JS)

Please refer to Bootstrap official website on how to setup [Bootstrap >= v5.3.x](https://getbootstrap.com/docs/5.3/getting-started/introduction/).

## Optional peer dependencies

- [`yup`](https://www.npmjs.com/package/yup){:target="\_blank"}: For form validation. See `RruForm` section for more details.
