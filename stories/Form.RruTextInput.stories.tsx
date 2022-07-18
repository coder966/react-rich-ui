import { action } from '@storybook/addon-actions';
import { Meta } from '@storybook/react';
import React from 'react';
import * as yup from 'yup';
import {
  RruForm, RruTextInput
} from '../src/index';

const storyMeta: Meta = {
  title: 'Form: RruTextInput',
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
