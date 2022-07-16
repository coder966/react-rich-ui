[Docs](/) > [V2](/docs/v2/get-started) > [Forms](/docs/v2/components/RruForm) > [RruDateInput](/docs/v2/components/RruDateInput)

# RruDateInput

## API

| Prop             | Description                                                                                              | Required |
| ---------------- | -------------------------------------------------------------------------------------------------------- | -------- |
| name             | Unique form element name                                                                                 | Yes      |
| label            | The form element label                                                                                   | No       |
| requiredAsterisk | Display an asterisk to indicate the field is required                                                    | No       |
| disabled         | Set to `true` to disable the editing of the form element                                                 | No       |
| mode             | The mode of the input, can be either 'datetime' or 'date'. Default is 'datetime'.                        | No       |
| minYear          | The minium selectable year                                                                               | No       |
| maxYear          | The maximum selectable year                                                                              | No       |
| isHijri          | For `Hijri` calendar. By default is it `Gregorian`                                                       | No       |
| filterDates      | An optional function that determines whether a given date (yyyy-mm-dd) is allowed to be selected or not. | No       |
