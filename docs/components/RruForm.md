[Docs](/docs) > [Forms](/docs/components/RruForm)

# RruForm

## Example

Click "Open Sandbox" to see the example source code

<iframe src="https://codesandbox.io/embed/rrutextinput-jh0gse?autoresize=1&fontsize=14&theme=dark&view=preview"
  style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
  title="RruTextInput"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

## Props

| Name                | Description                                                                                                                                                            | Required |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| onSubmit            | A function which takes the form data object as an argument. Will be called when the user submits the form if there is no validation violation                          | Yes      |
| initialValues       | An object containing the form default values.                                                                                                                          | No       |
| yupValidationSchema | [`yup`](https://www.npmjs.com/package/yup){:target="\_blank"} validation schema                                                                                        | No       |
| id                  | The form `id`. This can be used if your submit button is outside the form                                                                                              | No       |
| context             | If you want to programmatically access the form fields, you can use `useRruForm()` hook and pass its returned context here. More information further down in the docs. | No       |

## Nested Fields

You can have nested field names, for example:

```html
<RruTextInput name="name" label="Name" />
<RruTextInput name="age" label="Age" />
<RruTextInput name="address.city" label="City" />
<RruTextInput name="address.street" label="Street" />
```

Would result in the following form values object:

```javascript
{
  name: 'Khalid',
  age: 100,
  address: {
    city: 'Riyadh',
    street: 'Olya St.'
  }
}
```

#### Note

Please note that the field names should not start with a digit.
If you want to represent an array of objects, prefix the name with any string.

```html
<!-- won't work properly ❌ -->
<RruTextInput name="owner.1.name" label="Owner Name" />

<!-- good ✅ -->
<RruTextInput name="owner.item_1.name" label="Owner Name" />
```

## Read and write field values programmatically

To read or write a field value programmatically, you need to declare the form context and supply it to the form element.

```js
const context = useRruForm();

const triggerManualAccess = () => {
  console.log('trigger manual access');
  console.log('read all form fields', context.getFieldsValues());
  console.log('read email', context.getFieldValue('email'));
  context.setFieldValue('email', 'new@form.test');
  context.setFieldValue('notes', null);
};

return (
  <RruForm context={context} onSubmit={onSubmit}>
    <RruTextInput name='email' label='Email' />
    <RruTextareaInput name='notes' label='Notes' />

    <button onClick={triggerManualAccess} className='btn btn-primary mt-4 me-4'>
      Trigger manual access
    </button>

    <button type='submit' className='btn btn-primary mt-4'>
      Submit
    </button>
  </RruForm>
);
```

## Input Components

### Text

- [RruTextInput](/docs/components/RruTextInput)
- [RruTextareaInput](/docs/components/RruTextareaInput)

### Date and Time

- [RruDateTimeInput](/docs/components/RruDateTimeInput)

### Select

- [RruSelectInput](/docs/components/RruSelectInput)
- [RruMultiSelectInput](/docs/components/RruMultiSelectInput)

### Checkbox

- [RruCheckboxInput](/docs/components/RruCheckboxInput)
- [RruMultiCheckboxInput](/docs/components/RruMultiCheckboxInput)

### Radio

- [RruRadioInput](/docs/components/RruRadioInput)

### Files

- [RruFileInput](/docs/components/RruFileInput)
