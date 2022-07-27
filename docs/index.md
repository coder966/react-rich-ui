[Docs](/docs) > [Get Started](/docs)

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
  href="https://cdn.jsdelivr.net/npm/react-rich-ui@2.0.0/dist/index.css"
  integrity="sha384-5VVvy00iWm+zoH7Pm5sxyZW+mpa5lyg+uvJqTcSJHHrLr2nvjFeYTVjtX18SoUBg"
  crossorigin="anonymous"
/>
```

## Import Bootstrap v5.x (CSS + JS)

Please refer to Bootstrap official website on how to setup [Bootstrap v5.x](https://getbootstrap.com/docs/5.2/getting-started/introduction/).

## Optional peer dependencies

- `yup`: For form validation. See `RruForm` section for more details.

## Components

- [Form](/docs/components/RruForm)
- [DataTable](/docs/components/RruDataTable)
- [StepsWizard](/docs/components/RruStepsWizard)
- [ModalButton](/docs/components/RruModalButton)
