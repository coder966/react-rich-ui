[Docs](/) > [V2](/docs/v2/get-started) > [Get Started](/docs/v2/get-started)


# Getting Started

## Installation

### Install the NPM package:
```bash
$ npm i --save react-rich-ui
```

### Import the library stylesheet:
1- Add the following to your React app index file:
```js
import 'react-rich-ui/dist/index.css';
```

2- You must have `bootstrap` stylesheet loaded as well. Either by importing it from the npm package (similar to the code above), or from a CDN. Example (CDN):
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css" integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l" crossorigin="anonymous">
```

## Optional peer dependencies:
- `axios`: If you want to use it instead of `fetch`, which is the default HTTP Client used by `RruPageableTable`.
- `yup`: For form validation. See `RruForm` section for more details.

## Components:
- [Forms](/docs/v2/components/RruForm)
- [Tables](/docs/v2/components/RruPageableTable)
- [Wizards](/docs/v2/components/RruStepsWizard)
- [Buttons](/docs/v2/components/RruButton)

