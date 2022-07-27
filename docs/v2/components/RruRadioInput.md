[Docs](/) > [V2](/docs/v2/get-started) > [Forms](/docs/v2/components/RruForm) > [RruRadioInput](/docs/v2/components/RruRadioInput)

# RruRadioInput

<iframe src="https://codesandbox.io/embed/rruradioinput-posrvp?autoresize=1&fontsize=14&theme=dark&view=preview"
  style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
  title="RruRadioInput"
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
| inline           | Set to `true` to display the radio buttons in one line                   | No       |
| disabled         | Controls whether the input field is disabled or not                      | No       |
| onChange         | A callback function. This is useful if you need to watch the field value | No       |

## RruOption

| Name  | Description                                           | Required |
| ----- | ----------------------------------------------------- | -------- |
| value | The option value                                      | Yes      |
| label | The option label. Cloud be a string or any valid JSX. | Yes      |
