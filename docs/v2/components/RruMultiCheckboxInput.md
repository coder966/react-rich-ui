[Docs](/) > [V2](/docs/v2/get-started) > [Forms](/docs/v2/components/RruForm) > [RruMultiCheckboxInput](/docs/v2/components/RruMultiCheckboxInput)

# RruMultiCheckboxInput

## Props

| Name             | Description                                                              | Required |
| ---------------- | ------------------------------------------------------------------------ | -------- |
| name             | Unique form element name                                                 | Yes      |
| label            | The form element label                                                   | No       |
| requiredAsterisk | Display an asterisk to indicate the field is required                    | No       |
| options          | An array of `RruOption` objects                                          | Yes      |
| inline           | Set to `true` to display the checkboxes in one line                      | No       |
| disabled         | Controls whether the input field is disabled or not                      | No       |
| onChange         | A callback function. This is useful if you need to watch the field value | No       |

## RruOption

| Name  | Description                                           | Required |
| ----- | ----------------------------------------------------- | -------- |
| value | The option value                                      | Yes      |
| label | The option label. Cloud be a string or any valid JSX. | Yes      |
