[Docs](/docs) > [Forms](/docs/components/RruForm) > [RruTextInput](/docs/components/RruTextInput)

# RruTextInput

## Example
Click "Open Sandbox" to see the example source code

<iframe src="https://codesandbox.io/embed/rrutextinput-jh0gse?autoresize=1&fontsize=14&theme=dark&view=preview"
  style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
  title="RruTextInput"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

## Props

| Name             | Description                                                                                                                                                                                                                                                                              | Required |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| name             | Unique form element name                                                                                                                                                                                                                                                                 | Yes      |
| label            | The form element label                                                                                                                                                                                                                                                                   | No       |
| requiredAsterisk | Display an asterisk to indicate the field is required                                                                                                                                                                                                                                    | No       |
| isPassword       | Sets the type of the input to 'password'                                                                                                                                                                                                                                                 | No       |
| disabled         | Controls whether the input field is disabled or not                                                                                                                                                                                                                                      | No       |
| dir              | Text direction. Valid values: `auto`, `ltr`, and `rtl`.                                                                                                                                                                                                                                  | No       |
| placeholder      | A short hint that describes the expected value                                                                                                                                                                                                                                           | No       |
| maxLength        | The maximum number of characters allowed                                                                                                                                                                                                                                                 | No       |
| autoComplete     | Provides guidance to the browser as to the type of information expected in the field, this could allow the browser to provide automated assistance in filling out the form field. More info at [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete) | No       |
| list             | The id of a <datalist> element located in the same document. The <datalist> provides a list of predefined values to suggest to the user for this input. The values provided are suggestions, not requirements: users can select from this predefined list or provide a different value.  | No       |
| onChange         | A callback function. This is useful if you need to watch the field value                                                                                                                                                                                                                 | No       |
