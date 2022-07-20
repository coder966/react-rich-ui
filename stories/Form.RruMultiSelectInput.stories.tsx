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
    colors: ['RED', 'GREEN']
  }

  const validationSchema = yup.object().shape({
    colors: yup.array()
      .min(1, 'You must select at least one')
      .max(2, 'You cannot select more than two')
  });

  const onSubmit = form => {
    action('submitting the form')(form);
  };

  return (
    <RruForm initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      <RruMultiSelectInput name='colors' label='Color' options={colors} />
      <button type='submit'>Submit</button>
    </RruForm>
  );

};
