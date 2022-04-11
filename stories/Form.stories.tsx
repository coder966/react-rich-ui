import { action } from '@storybook/addon-actions';
import { Meta } from '@storybook/react';
import React from 'react';
import * as yup from 'yup';
import { RruForm, RruFormElement, RruFormProps } from '../src/form/react-rich-ui-form';

const storyMeta: Meta = {
  title: 'Form',
  component: RruForm,
};

export default storyMeta;

export const Text = (args: RruFormProps) => {

  const initialValues = {
    name: 'Khalid',
  }

  const validationSchema = yup.object().shape({
    email: yup.string().matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,7}$/, 'The email is incorrect'),
  });

  const onSubmit = form => {
    action('submitting the form')(form);
  };

  return (
    <RruForm initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} {...args}>
      <RruFormElement type='text' name='name' label='Name' />
      <RruFormElement type='text' name='email' label='Email' requiredAsterisk />
      <button type='submit'>Submit</button>
    </RruForm>
  );

};

export const Password = (args: RruFormProps) => {

  const initialValues = {

  }

  const validationSchema = yup.object().shape({

  });

  const onSubmit = form => {
    action('submitting the form')(form);
  };

  return (
    <RruForm initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} {...args}>
      <RruFormElement type='password' name='password' label='Password' />
      <button type='submit'>Submit</button>
    </RruForm>
  );

};

export const Textarea = (args: RruFormProps) => {

  const initialValues = {

  }

  const validationSchema = yup.object().shape({

  });

  const onSubmit = form => {
    action('submitting the form')(form);
  };

  return (
    <RruForm initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} {...args}>
      <RruFormElement type='textarea' name='content' label='Content' />
      <button type='submit'>Submit</button>
    </RruForm>
  );

};

export const Select = (args: RruFormProps) => {

  const colors = [
    { id: 'RED', label: 'Red' },
    { id: 'BLUE', label: 'Blue' },
    { id: 'GREEN', label: 'Green' },
  ];

  const initialValues = {

  }

  const validationSchema = yup.object().shape({

  });

  const onSubmit = form => {
    action('submitting the form')(form);
  };

  return (
    <RruForm initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} {...args}>
      <RruFormElement type='select' name='color' label='Color' options={colors} defaultValue='BLUE' />
      <button type='submit'>Submit</button>
    </RruForm>
  );

};

export const MultiSelect = (args: RruFormProps) => {

  const colors = [
    { id: 'RED', label: 'Red' },
    { id: 'BLUE', label: 'Blue' },
    { id: 'GREEN', label: 'Green' },
  ];

  const initialValues = {

  }

  const validationSchema = yup.object().shape({

  });

  const onSubmit = form => {
    action('submitting the form')(form);
  };

  return (
    <RruForm initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} {...args}>
      <RruFormElement type='multi-select' name='color' label='Color' options={colors} defaultValue={['RED', 'GREEN']} />
      <button type='submit'>Submit</button>
    </RruForm>
  );

};

export const Checkbox = (args: RruFormProps) => {

  const initialValues = {
    agreed: true,
  }

  const validationSchema = yup.object().shape({

  });

  const onSubmit = form => {
    action('submitting the form')(form);
  };

  return (
    <RruForm initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} {...args}>
      <RruFormElement type='checkbox' name='agreed' label='Agree' />
      <button type='submit'>Submit</button>
    </RruForm>
  );

};

export const MultiCheckbox = (args: RruFormProps) => {

  const colors = [
    { id: 'RED', label: 'Red' },
    { id: 'BLUE', label: 'Blue' },
    { id: 'GREEN', label: 'Green' },
  ];

  const initialValues = {

  }

  const validationSchema = yup.object().shape({

  });

  const onSubmit = form => {
    action('submitting the form')(form);
  };

  return (
    <RruForm initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} {...args}>
      <RruFormElement type='multi-checkbox' name='color' label='Color' options={colors} />
      <button type='submit'>Submit</button>
    </RruForm>
  );

};

export const GroupedMultiCheckbox = (args: RruFormProps) => {

  const groupedOptions = [
    {
      label: 'Colors',
      items: [
        { id: 'RED', label: 'Red' },
        { id: 'BLUE', label: 'Blue' },
        { id: 'GREEN', label: 'Green' },
      ]
    },
    {
      label: 'Fruits',
      items: [
        { id: 'apple', label: 'Apple' },
        { id: 'banana', label: 'Banana' },
        { id: 'orange', label: 'Orange' },
      ]
    },
  ];

  const initialValues = {

  }

  const validationSchema = yup.object().shape({

  });

  const onSubmit = form => {
    action('submitting the form')(form);
  };

  return (
    <RruForm initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} {...args}>
      <RruFormElement type='grouped-multi-checkbox' name='color' label='Color' options={groupedOptions} />
      <button type='submit'>Submit</button>
    </RruForm>
  );

};

export const Radio = (args: RruFormProps) => {

  const colors = [
    { id: 'RED', label: 'Red' },
    { id: 'BLUE', label: 'Blue' },
    { id: 'GREEN', label: 'Green' },
  ];

  const initialValues = {

  }

  const validationSchema = yup.object().shape({

  });

  const onSubmit = form => {
    action('submitting the form')(form);
  };

  return (
    <RruForm initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} {...args}>
      <RruFormElement type='radio' name='color' label='Color' options={colors} />
      <button type='submit'>Submit</button>
    </RruForm>
  );

};

export const Date = (args: RruFormProps) => {

  const initialValues = {

  }

  const validationSchema = yup.object().shape({

  });

  const onSubmit = form => {
    action('submitting the form')(form);
  };

  return (
    <RruForm initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} {...args}>
      <RruFormElement type='date' name='birthDate' label='Birth Date' isPast isHijri />
      <button type='submit'>Submit</button>
    </RruForm>
  );

};

export const Time = (args: RruFormProps) => {

  const initialValues = {

  }

  const validationSchema = yup.object().shape({

  });

  const onSubmit = form => {
    action('submitting the form')(form);
  };

  return (
    <RruForm initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} {...args}>
      <RruFormElement type='time' name='appointmentTime' label='Appointment Time' />
      <button type='submit'>Submit</button>
    </RruForm>
  );

};

export const File = (args: RruFormProps) => {

  const initialValues = {

  }

  const validationSchema = yup.object().shape({

  });

  const onSubmit = form => {
    action('submitting the form')(form);
  };

  return (
    <RruForm initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} {...args}>
      <RruFormElement type='file' name='attachment' label='Attachment' />
      <button type='submit'>Submit</button>
    </RruForm>
  );

};
