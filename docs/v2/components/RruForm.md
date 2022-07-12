[Docs](/) > [V2](/docs/v2/get-started) > [Forms](/docs/v2/components/RruForm)


# RruForm

## API

| Prop | Description | Required |
|-|-|-|
| onSubmit | A function which takes the form data object.<br>Will be called if the user submits the form if there is no validation violation | Yes |
| initialValues | An object containing the form default values.<br>Note: for types `date`, and `time` use `defaultValue` prop. For multi-checkbox you can pass a flat array of ids or an array of options, or even a mix of both.  | No |
| validationSchema | `Yup` validation schema | No |
| watch(array) | An array of the field names you want to monitor | No |
| watcher | A function which gets called when the watched fields get updated. Can be used only in combination with watch(array). | No |

## Input Components

### Text
- [RruTextInput](/docs/v2/components/RruTextInput)
- [RruTextareaInput](/docs/v2/components/RruTextareaInput)

### Date and Time
- [RruDateInput](/docs/v2/components/RruDateInput)

### Select
- [RruSelectInput](/docs/v2/components/RruSelectInput)
- [RruMultiSelectInput](/docs/v2/components/RruMultiSelectInput)

### Checkbox
- [RruCheckboxInput](/docs/v2/components/RruCheckboxInput)
- [RruMultiCheckboxInput](/docs/v2/components/RruMultiCheckboxInput)

### Radio
- [RruRadioInput](/docs/v2/components/RruRadioInput)

### Files
- [RruFileInput](/docs/v2/components/RruFileInput)

