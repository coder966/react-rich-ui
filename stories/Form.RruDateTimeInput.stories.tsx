import { action } from '@storybook/addon-actions';
import { Meta } from '@storybook/react';
import React from 'react';
import * as yup from 'yup';
import { RruDateTimeInput, RruDateTimeInputDateConfig, RruForm } from '../src/index';

const storyMeta: Meta = {
  title: 'Form: RruDateTimeInput',
};

export default storyMeta;

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
