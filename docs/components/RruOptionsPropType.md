[Components](/docs/components) > [Forms](/docs/components/RruForm) > [RruOptionsPropType](/docs/components/RruOptionsPropType)

# RruOptionsPropType

RruOptionsPropType is a mixed array of these two types:

## RruOption

| Name  | Description                                           | Required |
| ----- | ----------------------------------------------------- | -------- |
| label | The option label. Cloud be a string or any valid JSX. | Yes      |
| value | The option value                                      | Yes      |

## RruOptionsGroup

| Name    | Description                      | Required |
| ------- | -------------------------------- | -------- |
| label   | The group label. Must be string. | Yes      |
| options | Array of RruOption objects       | Yes      |

## Example - Only Flat Options

```js
const colorsOptions = [
  { label: 'Red', value: 'RED' },
  { label: 'Blue', value: 'BLUE' },
  { label: 'Green', value: 'GREEN' },
];

<SomeInputComponent options={colorsOptions} />;
```

## Example - Grouped Options

```js
const colorsOptions = [
  { label: 'Red', value: 'RED' },
  { label: 'Blue', value: 'BLUE' },
  { label: 'Green', value: 'GREEN' },
];

const animalsOptions = [
  { label: 'Cat', value: 'CAT' },
  { label: 'Dog', value: 'DOG' },
  { label: 'Lion', value: 'LION' },
];

const groupedOptions = [
  {
    label: 'Animals',
    options: animalsOptions,
  },
  {
    label: 'Colors',
    options: colorsOptions,
  },
];

<SomeInputComponent options={groupedOptions} />;
```
