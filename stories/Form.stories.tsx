import { action } from '@storybook/addon-actions';
import { Meta } from '@storybook/react';
import React, { useState } from 'react';
import * as yup from 'yup';
import {
  RruCheckboxInput, RruDateTimeInput, RruDateTimeInputDateConfig, RruFileInput,
  RruForm,
  RruMultiCheckboxInput,
  RruMultiSelectInput, RruRadioInput,
  RruSelectInput,
  RruTextareaInput,
  RruTextInput
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
    <RruForm initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      <RruTextInput name='name' label='Name' />
      <RruTextInput name='email' label='Email' requiredAsterisk />
      <RruTextInput name='password' label='Password' isPassword requiredAsterisk />
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
    <RruForm initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
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
    color: 'BLUE'
  }

  const validationSchema = yup.object().shape({

  });

  const onSubmit = form => {
    action('submitting the form')(form);
  };

  return (
    <RruForm initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      <RruSelectInput name='color' label='Color' options={colors} />
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
    color: ['RED', 'GREEN']
  }

  const validationSchema = yup.object().shape({

  });

  const onSubmit = form => {
    action('submitting the form')(form);
  };

  return (
    <RruForm initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      <RruMultiSelectInput name='color' label='Color' options={colors} />
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
    <RruForm initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
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
    <RruForm initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
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
    <RruForm initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      <RruRadioInput name='color' label='Color' options={colors} />
      <button type='submit'>Submit</button>
    </RruForm>
  );

};

export const Date = (args) => {

  const initialValues = {
    // birthDate: '2020-07-01'
  }

  const validationSchema = yup.object().shape({
    birthDate: yup.date().nullable()
      // .required('The date is required')
      .min('2020-01-01', 'The date is too old')
      .max('2024-01-01', 'The date is too new')
  });

  const getDateConfig = (date: string): RruDateTimeInputDateConfig | null => {
    if (date === '2022-07-12') {
      return { isDisabled: true };
    }
    if (date === '2022-07-13') {
      return { style: { 'color': 'red' } };
    }
    if (date === '2022-07-14') {
      return { className: 'my-custom-class-1' };
    }
    return null;
  }

  const onSubmit = form => {
    action('submitting the form')(form);
  };

  return (
    <RruForm initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      <RruDateTimeInput
        mode='date'
        name='birthDate'
        label='Birth Date'
        getDateConfig={getDateConfig}
      />
      <button type='submit'>Submit</button>
    </RruForm>
  );

};

export const DateTime = (args) => {

  const initialValues = {
    // birthDate: '2020-07-01 15:10:00'
  }

  const validationSchema = yup.object().shape({
    birthDate: yup.date().nullable()
      // .required('The date is required')
      .min('2020-01-01', 'The date is too old')
      .max('2024-01-01', 'The date is too new')
  });

  const getDateConfig = (date: string): RruDateTimeInputDateConfig | null => {
    if (date === '2022-07-12') {
      return { isDisabled: true };
    }
    return null;
  }

  const onSubmit = form => {
    action('submitting the form')(form);
  };

  return (
    <RruForm initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      <RruDateTimeInput
        mode='datetime'
        name='birthDate'
        label='Birth Date'
        getDateConfig={getDateConfig}
      />
      <button type='submit'>Submit</button>
    </RruForm>
  );

};


export const File = (args) => {

  const initialValues = {

  }

  const validationSchema = yup.object().shape({
    attachment: yup.mixed()
      .test('test is file present', 'Attachment is required', (value) => {
        return value.length === 1;
      }).test('test is file size too big', 'File size is too big', (value) => {
        return value[0] && value[0].size < 100 * 1024; // 100 kB
      }),
  });

  const onSubmit = form => {
    action('submitting the form')(form);
  };

  return (
    <RruForm initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      <RruFileInput name='attachment' label='Attachment' />
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
    color: 'BLUE'
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
    <RruForm initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} watch={['color']} watcher={watcher}>
      <RruSelectInput name='color' label='Color' options={colors} />
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
      <RruForm initialValues={initialValues1} validationSchema={validationSchema1} onSubmit={onSubmit1}>
        <RruTextInput name='name' label='Name' />
        <button type='submit'>Submit</button>
      </RruForm>
      <br></br>
      <RruForm initialValues={initialValues2} validationSchema={validationSchema2} onSubmit={onSubmit2}>
        <RruTextInput name='favoriteNumber' label='Favorite Number' />
        <button type='submit'>Submit</button>
      </RruForm>
    </>
  );

};
