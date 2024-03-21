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
import 'react-rich-ui/dist/style.css';
```

### Or from a CDN

Add the following tag to your index.html file: (replace `2.3.0` in the URL with the version you are using)

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/react-rich-ui@2.3.0/dist/style.css" />
```

## Import Bootstrap (CSS + JS)

Please refer to Bootstrap official website on how to setup [Bootstrap >= v5.3.x](https://getbootstrap.com/docs/5.3/getting-started/introduction/).

## Optional peer dependencies

- [`yup`](https://www.npmjs.com/package/yup){:target="\_blank"}: For form validation. See `RruForm` section for more details.

## Components

- [Form](/docs/components/RruForm)
- [DataTable](/docs/components/RruDataTable)
- [StepsWizard](/docs/components/RruStepsWizard)
- [ModalButton](/docs/components/RruModalButton)
