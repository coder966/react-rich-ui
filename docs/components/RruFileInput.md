[Components](/docs/components) > [Forms](/docs/components/RruForm) > [RruFileInput](/docs/components/RruFileInput)

# RruFileInput

## Example

Click "Open Sandbox" to see the example source code

<iframe src="https://codesandbox.io/embed/rrufileinput-h5gfbj?autoresize=1&fontsize=14&theme=dark&view=preview"
  style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
  title="RruFileInput"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

## Props

| Name                            | Description                                                                                                                                                                                                            | Required |
|---------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------| -------- |
| name                            | Unique form element name                                                                                                                                                                                               | Yes      |
| label                           | The form element label                                                                                                                                                                                                 | No       |
| chooseFileLabel                 | The label that tells the user to select a file to upload. This label will be replaced by the file name after the user selects one.                                                                                     | No       |
| requiredAsterisk                | Display an asterisk to indicate the field is required                                                                                                                                                                  | No       |
| disabled                        | Controls whether the input field is disabled or not                                                                                                                                                                    | No       |
| accept                          | Comma-separated list of one or more file types, or unique file type specifiers, describing which file types to allow. More info at [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/accept) | No       |
| onChange                        | A callback function. This is useful if you need to watch the field value                                                                                                                                               | No       |
| shouldTriggerOnChangeOnSameFile | Whether you would like `onChange` to trigger on each file choosing event, even when the user chooses the same file again. Default is false.                                                                            | No       |

## Default field value

If you read the value of a field of this type, and the field did not have an initial value nor it was filled/entered by the user; then the default value is `null`.
