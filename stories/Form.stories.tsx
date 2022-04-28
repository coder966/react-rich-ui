import { action } from '@storybook/addon-actions';
import { Meta } from '@storybook/react';
import React, { useState } from 'react';
import * as yup from 'yup';
import {
  RruCheckboxInput,
  RruDateInput,
  RruFileInput,
  RruForm,
  RruMultiCheckboxInput,
  RruMultiSelectInput,
  RruPasswordInput,
  RruRadioInput,
  RruSelectInput,
  RruTextareaInput,
  RruTextInput,
  RruTimeInput
} from '../src/index';

const storyMeta: Meta = {
  title: 'Form',
  component: RruForm,
};

export default storyMeta;

export const Text = (args) => {

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
      <RruTextInput name='name' label='Name' />
      <RruTextInput name='email' label='Email' requiredAsterisk />
      <button type='submit'>Submit</button>
    </RruForm>
  );

};

export const Password = (args) => {

  const initialValues = {

  }

  const validationSchema = yup.object().shape({

  });

  const onSubmit = form => {
    action('submitting the form')(form);
  };

  return (
    <RruForm initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} {...args}>
      <RruPasswordInput name='password' label='Password' />
      <button type='submit'>Submit</button>
    </RruForm>
  );

};

export const Textarea = (args) => {

  const initialValues = {

  }

  const validationSchema = yup.object().shape({

  });

  const onSubmit = form => {
    action('submitting the form')(form);
  };

  return (
    <RruForm initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} {...args}>
      <RruTextareaInput name='content' label='Content' />
      <button type='submit'>Submit</button>
    </RruForm>
  );

};

export const Select = (args) => {

  const colors = [
    { value: 'RED', label: 'Red' },
    { value: 'BLUE', label: 'Blue' },
    { value: 'GREEN', label: 'Green' },
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
      <RruSelectInput name='color' label='Color' options={colors} defaultValue='BLUE' />
      <button type='submit'>Submit</button>
    </RruForm>
  );

};

export const MultiSelect = (args) => {

  const colors = [
    { value: 'RED', label: 'Red' },
    { value: 'BLUE', label: 'Blue' },
    { value: 'GREEN', label: 'Green' },
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
      <RruMultiSelectInput name='color' label='Color' options={colors} defaultValue={['RED', 'GREEN']} />
      <button type='submit'>Submit</button>
    </RruForm>
  );

};

export const Checkbox = (args) => {

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
      <RruCheckboxInput name='agreed' label='Agree' />
      <button type='submit'>Submit</button>
    </RruForm>
  );

};

export const MultiCheckbox = (args) => {

  const colors = [
    { value: 'RED', label: 'Red' },
    { value: 'BLUE', label: 'Blue' },
    { value: 'GREEN', label: 'Green' },
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
      <RruMultiCheckboxInput name='color' label='Color' options={colors} />
      <button type='submit'>Submit</button>
    </RruForm>
  );

};

export const Radio = (args) => {

  const colors = [
    { value: 'RED', label: 'Red' },
    { value: 'BLUE', label: 'Blue' },
    { value: 'GREEN', label: 'Green' },
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
      <RruRadioInput name='color' label='Color' options={colors} />
      <button type='submit'>Submit</button>
    </RruForm>
  );

};

export const Date = (args) => {

  const initialValues = {

  }

  const validationSchema = yup.object().shape({

  });

  const onSubmit = form => {
    action('submitting the form')(form);
  };

  return (
    <RruForm initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} {...args}>
      <RruDateInput name='birthDate' label='Birth Date' isPast isHijri />
      <button type='submit'>Submit</button>
    </RruForm>
  );

};

export const Time = (args) => {

  const initialValues = {

  }

  const validationSchema = yup.object().shape({

  });

  const onSubmit = form => {
    action('submitting the form')(form);
  };

  return (
    <RruForm initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} {...args}>
      <RruTimeInput name='appointmentTime' label='Appointment Time' />
      <button type='submit'>Submit</button>
    </RruForm>
  );

};

export const File = (args) => {

  const initialValues = {

  }

  const validationSchema = yup.object().shape({

  });

  const onSubmit = form => {
    action('submitting the form')(form);
  };

  return (
    <RruForm initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} {...args}>
      <RruFileInput name='attachment' label='Attachment' accept='.txt' />
      <button type='submit'>Submit</button>
    </RruForm>
  );

};

export const Watcher = (args) => {
  const [color, setColor] = useState();

  const colors = [
    { value: 'RED', label: 'Red' },
    { value: 'BLUE', label: 'Blue' },
    { value: 'GREEN', label: 'Green' },
  ];

  const initialValues = {

  }

  const validationSchema = yup.object().shape({

  });

  const watcher = form => {
    setColor(form.color);
  };

  const onSubmit = form => {
    action('submitting the form')(form);
  };

  return (
    <RruForm initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} watch={['color']} watcher={watcher} {...args}>
      <RruSelectInput name='color' label='Color' options={colors} defaultValue='BLUE' />
      {color === 'GREEN' && <p>Great choice.</p>}
      <button type='submit'>Submit</button>
    </RruForm>
  );

};

export const TwoFormsInOnePage = (args) => {

  const initialValues1 = {
    name: 'Khalid',
  }

  const initialValues2 = {
    favoriteNumber: '10',
  }

  const validationSchema1 = yup.object().shape({
    name: yup.string().min(3).max(10),
  });

  const validationSchema2 = yup.object().shape({
    favoriteNumber: yup.number().min(0),
  });

  const onSubmit1 = form => {
    action('submitting the form 1')(form);
  };

  const onSubmit2 = form => {
    action('submitting the form 2')(form);
  };

  return (
    <>
      <RruForm initialValues={initialValues1} validationSchema={validationSchema1} onSubmit={onSubmit1} {...args}>
        <RruTextInput name='name' label='Name' />
        <button type='submit'>Submit</button>
      </RruForm>
      <br></br>
      <RruForm initialValues={initialValues2} validationSchema={validationSchema2} onSubmit={onSubmit2} {...args}>
        <RruTextInput name='favoriteNumber' label='Favorite Number' />
        <button type='submit'>Submit</button>
      </RruForm>
    </>
  );

};
