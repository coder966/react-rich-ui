[Docs](/docs) > [Forms](/docs/components/RruForm) > [RruMultiCheckboxInput](/docs/components/RruMultiCheckboxInput)

# RruMultiCheckboxInput

## Example

Click "Open Sandbox" to see the example source code

<iframe src="https://codesandbox.io/embed/rrumulticheckboxinput-vd5rdf?autoresize=1&fontsize=14&theme=dark&view=preview"
  style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
  title="RruMultiCheckboxInput"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

## Props

| Name             | Description                                                                         | Required |
| ---------------- | ----------------------------------------------------------------------------------- | -------- |
| name             | Unique form element name                                                            | Yes      |
| label            | The form element label                                                              | No       |
| requiredAsterisk | Display an asterisk to indicate the field is required                               | No       |
| options          | An array of options. [Click here for details](/docs/components/RruOptionsPropType). | Yes      |
| inline           | Set to `true` to display the checkboxes in one line                                 | No       |
| disabled         | Controls whether the input field is disabled or not                                 | No       |
| onChange         | A callback function. This is useful if you need to watch the field value            | No       |

## Default field value

If you read the value of a field of this type, and the field did not have an initial value nor it was filled/entered by the user; then the default value is `[]`.
