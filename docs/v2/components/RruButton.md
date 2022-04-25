[Docs](/) > [V2](/docs/v2/get-started) > [Buttons](/docs/v2/components/RruButton)


# RruButton

## API

| Prop | Description | Required |
|-|-|-|
| label | Button label | Yes |
| variant | Bootstrap `button` variant | No |
| onClick | A function | Yes if no `onConfirm` |
| onConfirm | If you want to have a confirmation dialog<br>just use this prop instead of `onClick`.<br> It is a function which receives the form data object (if `formElements` is used) and a function `setShow(bool)` to control dialogue visibility. You can return false to stop refuse the confirmation and keep the dialogue open | No |
| confirmationTitle | Confirmation dialog title | No |
| confirmationDesc | Confirmation dialog description | No |
| confirmLabel | Confirmation dialog confirm button label | No |
| cancelLabel | Confirmation dialog cancel button label | No |
| formElements | see `RruForm` section | No |
| initialValues | see `RruForm` section | No |
| validationSchema | see `RruForm` section | No |
| watch | see `RruForm` section | No |
| watcher | see `RruForm` section | No |