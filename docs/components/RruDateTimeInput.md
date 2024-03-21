[Docs](/docs) > [Forms](/docs/components/RruForm) > [RruDateTimeInput](/docs/components/RruDateTimeInput)

# RruDateTimeInput

## Example

Click "Open Sandbox" to see the example source code

<iframe src="https://codesandbox.io/embed/rrudatetimeinput-njtj56?autoresize=1&fontsize=14&theme=dark&view=preview"
  style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
  title="RruDateTimeInput"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

## Props

| Name             | Description                                                                                                                                                    | Required |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| name             | Unique form element name                                                                                                                                       | Yes      |
| label            | The form element label                                                                                                                                         | No       |
| requiredAsterisk | Display an asterisk to indicate the field is required                                                                                                          | No       |
| mode             | The mode of the input, can be either 'datetime' or 'date'. Default is 'datetime'.                                                                              | No       |
| calendarType     | `gregorian` or `islamic-umalqura`. Default is `gregorian`                                                                                                      | No       |
| getDateConfig    | An optional function that customizes the supplied date (in the format yyyy-mm-dd) by returning an optional config object of Type `RruDateTimeInputDateConfig`. | No       |
| disabled         | Controls whether the input field is disabled or not                                                                                                            | No       |
| onChange         | A callback function. This is useful if you need to watch the field value                                                                                       | No       |

## RruDateTimeInputDateConfig

| Name      | Description           | Required |
| --------- | --------------------- | -------- |
| disabled  | Is the date disabled. | No       |
| className | Class name.           | No       |
| style     | Custom style.         | No       |

## Default field value

If you read the value of a field of this type, and the field did not have an initial value nor it was filled/entered by the user; then the default value is `null`.
