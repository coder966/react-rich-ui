[Docs](/) > [V2](/docs/v2/get-started) > [Forms](/docs/v2/components/RruForm)


# RruForm

## API

| Prop | Description | Required |
|-|-|-|
| onSubmit | A function which takes the form data object.<br>Will be called if the user submits the form if there is no validation violation | Yes |
| initialValues | An object containing the form default values.<br>Note: for types `date`, `time`, `select`, and `multi-select` use `defaultValue` prop. For multi-checkbox you can pass a flat array of ids or an array of options, or even a mix of both.  | No |
| validationSchema | `Yup` validation schema | No |
| watch(func) | DEPRECATED (use watch(array)) A function which takes a function that you can run to listen to form data changes. | No |
| watch(array) | An array of the field names you want to monitor | No |
| watcher | A function which takes the form data. Can be used only in combination with watch(array). | No |
| className | `form` class name | No |

## Input Components

### Text
- [RruTextInput](/docs/v2/components/RruTextInput)
- [RruTextareaInput](/docs/v2/components/RruTextareaInput)
- [RruPasswordInput](/docs/v2/components/RruPasswordInput)

### Date and Time
- [RruDateInput](/docs/v2/components/RruDateInput)
- [RruTimeInput](/docs/v2/components/RruTimeInput)

### Select
- [RruSelectInput](/docs/v2/components/RruSelectInput)
- [RruMultiSelectInput](/docs/v2/components/RruMultiSelectInput)

### Checkbox
- [RruCheckboxInput](/docs/v2/components/RruCheckboxInput)
- [RruMultiCheckboxInput](/docs/v2/components/RruMultiCheckboxInput)
- [RruGroupedMultiCheckboxInput](/docs/v2/components/RruGroupedMultiCheckboxInput)

### Radio
- [RruRadioInput](/docs/v2/components/RruRadioInput)

### Files
- [RruFileInput](/docs/v2/components/RruFileInput)

