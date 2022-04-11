[Docs](/) > [v1](/docs/v1/get-started) > [Forms](/docs/v1/components/RruForm)


# RruForm

## API

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
| type | Available types: `text (default), password, textarea, select, multi-select, radio, checkbox, multi-checkbox, grouped-multi-checkbox (deprecated), date, time, file` | Yes | All |
| className | Column class name | No | All |
| options | An array of objects of the form:<br>`{id: string, label: ReactNode}`<br>But if the type is `grouped-multi-checkbox` the form is:<br>`{label: string, items: [{id: string, label: ReactNode}]}`| Yes if type in `select, radio, multi-checkbox, grouped-multi-checkbox` | `select, multi-select, radio, multi-checkbox, grouped-multi-checkbox` |
| placeholder | A place holder | No | `text`, `textarea`, `password`, `file` |
| dir | Text direction | No | `text`, `textarea`, `password` |
| maxLength | Maximum length | No | `text`, `textarea`, `password` |
| disabled | Set to `true` to disable the editing of the form element | No | All |
| isHijri | For `Hijri` calendar. By default is it `Gregorian` | No | `date` |
| isFuture | Display only future years | No | `date` |
| isPast | Display only past years | No | `date` |
| clock | Clock style either 12-hours or 24-hours | No | `time` |
| maxYearLength | Max number of years +- current year | No | `date` |
| reverseDisplayOrder | Reverse the render order of the date or time selectors | No | `date, time` |
| inline | Set to `true` to display `radio` buttons in one line | No | `radio` |
| accept | Specify the accepted data-types of file extensions. Note that the user can still bypass this. | No | `file` |
| requiredAsterisk | Display an asterisk to indicate the field is required | No | All |

