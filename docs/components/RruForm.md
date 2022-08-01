[Docs](/docs) > [Forms](/docs/components/RruForm)

# RruForm

## Example

Click "Open Sandbox" to see the example source code

<iframe src="https://codesandbox.io/embed/rrutextinput-jh0gse?autoresize=1&fontsize=14&theme=dark&view=preview"
  style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
  title="RruTextInput"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

## Props

| Name                | Description                                                                                                                    | Required |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------ | -------- |
| onSubmit            | A function which takes the form data object. Will be called when the user submits the form if there is no validation violation | Yes      |
| initialValues       | An object containing the form default values.                                                                                  | No       |
| yupValidationSchema | [`yup`](https://www.npmjs.com/package/yup){:target="\_blank"} validation schema                                                | No       |
| id                  | The form `id`. This can be used if your submit button is outside the form                                                      | No       |

## Input Components

### Text

- [RruTextInput](/docs/components/RruTextInput)
- [RruTextareaInput](/docs/components/RruTextareaInput)

### Date and Time

- [RruDateTimeInput](/docs/components/RruDateTimeInput)

### Select

- [RruSelectInput](/docs/components/RruSelectInput)
- [RruMultiSelectInput](/docs/components/RruMultiSelectInput)

### Checkbox

- [RruCheckboxInput](/docs/components/RruCheckboxInput)
- [RruMultiCheckboxInput](/docs/components/RruMultiCheckboxInput)

### Radio

- [RruRadioInput](/docs/components/RruRadioInput)

### Files

- [RruFileInput](/docs/components/RruFileInput)
