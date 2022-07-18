import { action } from '@storybook/addon-actions';
import { Meta } from '@storybook/react';
import React from 'react';
import * as yup from 'yup';
import {
  RruForm, RruTextareaInput
} from '../src/index';

const storyMeta: Meta = {
  title: 'Form: RruTextareaInput',
};

export default storyMeta;

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
