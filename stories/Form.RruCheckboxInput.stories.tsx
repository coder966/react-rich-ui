import { action } from '@storybook/addon-actions';
import { Meta } from '@storybook/react';
import React from 'react';
import * as yup from 'yup';
import {
  RruCheckboxInput, RruForm
} from '../src/index';

const storyMeta: Meta = {
  title: 'Form: RruCheckboxInput',
};

export default storyMeta;

export const Basic = (args) => {

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
