[Components](/docs/components) > [Forms](/docs/components/RruForm)

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

## Nested Fields

You can have nested field names, for example:

```html
<RruTextInput name="name" label="Name" />
<RruTextInput name="age" label="Age" />
<RruTextInput name="address.city" label="City" />
<RruTextInput name="address.street" label="Street" />
```

Would result in the following form values object:

```json
{
  "name": "Khalid",
  "age": 100,
  "address": {
    "city": "Riyadh",
    "street": "Olya St."
  }
}
```

## Array Fields

You can have a dynamic array of fields, for example:

```html
<RruTextInput name="name" label="Name" />
<RruTextInput name="age" label="Age" />
<RruTextInput name="basket[0].name" label="Item Name" />
<RruTextInput name="basket[0].quantity" label="Item Quantity" />
<RruTextInput name="basket[1].name" label="Item Name" />
<RruTextInput name="basket[2].quantity" label="Item Quantity" />
```

Would result in the following form values object:

```json
{
  "name": "Khalid",
  "age": 100,
  "basket": [
    {
      "name": "Apple", "quantity": 5
    },
    {
      "name": "Mango", "quantity": 2
    }
  ]
}
```

You can also have a dynamic array size by adding or removing items at runtime like this:

```js
const TestComponent = () => {
  const formContext = useRruForm();

  const onSubmit = (form) => {
    console.log('form', form);
  }

  const initialValues = {
    email: 'user@example.com',
    basket: [{ name: 'Apple', quantity: 5 }],
  }

  const validationSchema = yup.object({
    email: yup.string().email('Invalid email').required('Email is required'),
    basket: yup.array().of(
      yup.object({
        name: yup.string().required('Item name is required'),
        quantity: yup.number().min(1, 'Quantity must be at least 1').required('Quantity is required'),
      })
    ),
  });

  return (
    <RruForm context={formContext} onSubmit={onSubmit} initialValues={initialValues} yupValidationSchema={validationSchema}>

      <RruTextInput name='email' label='Email' />
      
      {(formContext.getFieldValue('basket') ?? []).map((_, index) => (
        <div key={index}>

          <RruTextInput name={`basket[${index}].name`} label={`Item #${index} Name`} />
          <RruTextInput name={`basket[${index}].quantity`} label={`Item #${index} Quantity`} />

          <button type='button' onClick={() => formContext.removeItemFromFieldArray('basket', index)}>
            Remove item #{index}
          </button>

        </div>
      ))}

      <button type='button' onClick={() => formContext.addItemToFieldArray('basket')}>
        Add new item
      </button>

      <button type='submit'>Submit</button>

    </RruForm>
  );
};
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
