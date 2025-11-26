[Components](/docs/components) > [Forms](/docs/components/RruForm) > [RruTextareaInput](/docs/components/RruTextareaInput)

# RruTextareaInput

## Example

Click "Open Sandbox" to see the example source code

<iframe src="https://codesandbox.io/embed/rrutextareainput-33b0m2?autoresize=1&fontsize=14&theme=dark&view=preview"
  style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
  title="RruTextareaInput"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

## Props

| Name             | Description                                                                                                                                                                                                                                                                              | Required |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| name             | Unique form element name                                                                                                                                                                                                                                                                 | Yes      |
| label            | The form element label                                                                                                                                                                                                                                                                   | No       |
| requiredAsterisk | Display an asterisk to indicate the field is required                                                                                                                                                                                                                                    | No       |
| disabled         | Controls whether the input field is disabled or not                                                                                                                                                                                                                                      | No       |
| dir              | Text direction. Valid values: `auto`, `ltr`, and `rtl`.                                                                                                                                                                                                                                  | No       |
| placeholder      | A short hint that describes the expected value                                                                                                                                                                                                                                           | No       |
| maxLength        | The maximum number of characters allowed                                                                                                                                                                                                                                                 | No       |
| autoComplete     | Provides guidance to the browser as to the type of information expected in the field, this could allow the browser to provide automated assistance in filling out the form field. More info at [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete) | No       |
| rows             | Specifies the visible number of lines in the textarea                                                                                                                                                                                                                                    | No       |
| cols             | Specifies the visible width of the textarea                                                                                                                                                                                                                                              | No       |
| wrap             | Specifies how the text is to be wrapped when submitted in a form. More info at [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#attr-wrap)                                                                                                              | No       |
| onChange         | A callback function. This is useful if you need to watch the field value                                                                                                                                                                                                                 | No       |

## Default field value

If you read the value of a field of this type, and the field did not have an initial value nor it was filled/entered by the user; then the default value is `null`.
