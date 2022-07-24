[Docs](/) > [V2](/docs/v2/get-started) > [Forms](/docs/v2/components/RruForm) > [RruDateTimeInput](/docs/v2/components/RruDateTimeInput)

# RruDateTimeInput

## Props

| Name             | Description                                                                                                                                                    | Required |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| name             | Unique form element name                                                                                                                                       | Yes      |
| label            | The form element label                                                                                                                                         | No       |
| requiredAsterisk | Display an asterisk to indicate the field is required                                                                                                          | No       |
| disabled         | Set to `true` to disable the editing of the form element                                                                                                       | No       |
| mode             | The mode of the input, can be either 'datetime' or 'date'. Default is 'datetime'.                                                                              | No       |
| calendarType     | `gregorian` or `islamic-umalqura`. Default is `gregorian`                                                                                                      | No       |
| getDateConfig    | An optional function that customizes the supplied date (in the format yyyy-mm-dd) by returning an optional config object of Type `RruDateTimeInputDateConfig`. | No       |

## RruDateTimeInputDateConfig

| Name       | Description           | Required |
| ---------- | --------------------- | -------- |
| isDisabled | Is the date disabled. | No       |
| className  | Class name.           | No       |
| style      | Custom style.         | No       |
