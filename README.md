# React Rich UI

A set of advanced React components with super friendly API featuring forms, pagable tables, and dialogue buttons.

> **_NOTE:_**  Previously known as [@coder966/react-rich-ui](https://www.npmjs.com/package/@coder966/react-rich-ui)

## Installation

```bash
$ npm i --save react-rich-ui
```

Optional peer dependencies: `axios`, `yup`.

You must have `bootstrap` stylesheet loaded.
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">
```

You must load `font-awesome` for icons to work.
```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css" integrity="sha512-+4zCK9k+qNFUR5X+cKL9EIR+ZOhtIloNl9GIKS57V1MyNsYpYcUrUeQc9vNfzsWfV28IaLL3i96P9sdNyeRssA==" crossorigin="anonymous" />
```


## Example

There is an example app that you can try https://github.com/coder966/react-rich-ui/blob/master/src/example/App.js


## API

---

### RruPageableTable

| Prop | Description | Required |
|-|-|-|
| id | ID| No |
| endpoint | The endpoint which returns `org.springframework.data.domain.Page` | Yes|
| columns| An array of column objects| Yes|
| actions| An array of action objects| No |
| search | The search parameters the will be sent to the endpoint specified| No |
| onResponse | A callback function. `data => void` | No |
| userPrivileges | An array of the user's privileges. This is used to only show permitted actions. | No |
| pageSize | The page size. The default value is `10`| No |
| disableSorting | Set to false to disable sorting feature.| No |
| actionsLabel | The action's column header label. | No |
| previousLabel| This is the label for `previous` button in pagination.| No |
| nextLabel | This is the label for `next` button in pagination. | No |
| noDataLabel | This is the label used when no data is available. | No |

### RruPageableTable Columns

| Prop | Description | Required |
|-|-|-|
| label | Header label | Yes |
| value | The value the should be displayed in each row.<br>This could be either a property path in row object<br>or a function which takes the row object and returns cell value | Yes |
| sortable | Set false to disable sorting for this column. | No |
| sortKey | Property path in row object. By dafault same as `value` if it is also a property path. | No |
| display | Set false to hide this column | No |

### RruPageableTable Actions

| Prop | Description | Required |
|-|-|-|
| icon | Refer to `RruButton` section| Yes |
| action | A function which takes the row object | Yes |
| display | A function which takes the row object and<br>returns a `boolean` whether the action should be available for this row. | No |
| privileges | An array of the required privilege for this actions. The `userPrivileges` provided in the table will be used. | No |
| onConfirm | If you want to have a confirmation dialog<br>for an action, just use this prop instead of `action`.<br> The is also a function same as `action` but will<br>only be called when the user confirms the action | No |
| confirmationTitle | Confirmation dialog title | No |
| confirmationDesc | Confirmation dialog description | No |
| confirmLabel | Confirmation dialog confirm button label | No |
| cancelLabel | Confirmation dialog cancel button label | No |

---

### RruForm

| Prop | Description | Required |
|-|-|-|
| onSubmit | A function which takes the form data object.<br>Will be called if the user submits the form if there is no validation violation | Yes |
| initialValues | An object containing the form default values.<br>Note: for types `date`, `time`, `select`, and `multi-select` use `defaultValue` prop. For multi-checkbox you can pass a flat array of ids or an array of options, or even a mix of both.  | No |
| validationSchema | `Yup` validation schema | No |
| watch(func) | DEPRECATED (use watch(array)) A function which takes a function that you can run to listen to form data changes. | No |
| watch(array) | An array of the field names you want to monitor | No |
| watcher | A function which takes the form data. Can be used only in combination with watch(array). | No |
| className | `form` class name | No |

### RruFormElement

| Prop | Description | Required | Type
|-|-|-|-|
| label | The form element label | Yes | All |
| name | Unique form element name | Yes | All |
| type | Available types: `text (default), password, textarea, select, multi-select, radio, checkbox, multi-checkbox, grouped-multi-checkbox, date, time, file` | Yes | All |
| prepend | Anything to render before the form element component | No | All |
| append | Anything to render after the form element component | No | All |
| className | Column class name | No | All |
| labelClassName | `label` class name | No | All |
| inputClassName | `input` class name | No | All |
| options | An array of objects of the form:<br>`{id: string label: string}`<br>But if the type is `grouped-multi-checkbox` the form is:<br>`{label: string, items: [...]}`| Yes if type in `select, radio, multi-checkbox, grouped-multi-checkbox` | `select, multi-select, radio, multi-checkbox, grouped-multi-checkbox` |
| placeholder | A place holder | No |  |
| maxLength | Maximum length | No |  |
| disabled | Set to `true` to disable the editing of the form element | No | All |
| isHijri | For `Hijri` calendar. By default is it `Gregorian` | No | `date` |
| isFuture | Display only future years | No | `date` |
| isPast | Display only past years | No | `date` |
| clock | Clock style either 12-hours or 24-hours | No | `time` |
| clock | Clock style either 12-hours or 24-hours | No | `time` |
| maxYearLength | Max number of years +- current year | No | `date` |
| reverseDisplayOrder | Reverse the render order of the date or time selectors | No | `date, time` |
| inline | Set to `true` to display `radio` buttons in one line | No | `radio` |

---

### RruButton

| Prop | Description | Required |
|-|-|-|
| label | Button label | Yes |
| variant | Bootstrap `button` variant | No |
| icon | Can be class name for an icon (i.e. `font-awesome` icons) or one of the predefined icons `view, edit, lock, unlock, delete, add, remove, check, times, pdf, excel, download` | No |
| userPrivileges | An array of the user's privileges. This is used to only show permitted buttons. | No |
| allowedPrivileges | An array of the required privileges | No |
| onClick | A function | Yes if no `onConfirm` |
| onConfirm | If you want to have a confirmation dialog<br>just use this prop instead of `onClick`.<br> It is a function which receives the form data object (if `formElements` is used) and a function `setShow(bool)` to control dialogue visibility. You can return false to stop refuse the confirmation and keep the dialogue open | No |
| confirmationTitle | Confirmation dialog title | No |
| confirmationDesc | Confirmation dialog description | No |
| confirmLabel | Confirmation dialog confirm button label | No |
| cancelLabel | Confirmation dialog cancel button label | No |
| formElements | see `RruForm` section | No |
| validationSchema | see `RruForm` section | No |
| watcher | see `RruForm` section | No |

---

## License

```txt
Copyright 2016 Khalid H. Alharisi

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```
