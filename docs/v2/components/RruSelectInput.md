[Docs](/) > [V2](/docs/v2/get-started) > [Forms](/docs/v2/components/RruForm) > [RruSelectInput](/docs/v2/components/RruSelectInput)

# RruSelectInput

## Props

| Name             | Description                                                                 | Required |
| ---------------- | --------------------------------------------------------------------------- | -------- |
| name             | Unique form element name                                                    | Yes      |
| label            | The form element label                                                      | No       |
| requiredAsterisk | Display an asterisk to indicate the field is required                       | No       |
| options          | An array of objects of the form:<br>`{value: string, label: ReactNode}`<br> | Yes      |
| disabled         | Controls whether the input field is disabled or not                         | No       |
| onChange         | A callback function. This is useful if you need to watch the field value    | No       |
