import { action } from '@storybook/addon-actions';
import { Meta } from '@storybook/react';
import React from 'react';
import * as yup from 'yup';
import {
  RruForm, RruMultiSelectInput
} from '../src/index';

const storyMeta: Meta = {
  title: 'Form: RruMultiSelectInput',
};

export default storyMeta;

export const Basic = (args) => {

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
