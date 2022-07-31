[Docs](/docs) > [Forms](/docs/components/RruForm) > [RruMultiSelectInput](/docs/components/RruMultiSelectInput)

# RruMultiSelectInput

## Example

Click "Open Sandbox" to see the example source code

<iframe src="https://codesandbox.io/embed/rrumultiselectinput-ey1c52?autoresize=1&fontsize=14&theme=dark&view=preview"
  style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
  title="RruMultiSelectInput"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

## Props

| Name             | Description                                                              | Required |
| ---------------- | ------------------------------------------------------------------------ | -------- |
| name             | Unique form element name                                                 | Yes      |
| label            | The form element label                                                   | No       |
| requiredAsterisk | Display an asterisk to indicate the field is required                    | No       |
| options          | An array of `RruOption` objects                                          | Yes      |
| disabled         | Controls whether the input field is disabled or not                      | No       |
| onChange         | A callback function. This is useful if you need to watch the field value | No       |

## RruOption

| Name  | Description                                           | Required |
| ----- | ----------------------------------------------------- | -------- |
| value | The option value                                      | Yes      |
| label | The option label. Cloud be a string or any valid JSX. | Yes      |
