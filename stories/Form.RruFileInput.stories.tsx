import { action } from '@storybook/addon-actions';
import { Meta } from '@storybook/react';
import React from 'react';
import * as yup from 'yup';
import {
  RruFileInput,
  RruForm
} from '../src/index';

const storyMeta: Meta = {
  title: 'Form: RruFileInput',
};

export default storyMeta;

export const Basic = (args) => {

  const initialValues = {

  }

  const validationSchema = yup.object().shape({
    attachment: yup.mixed().nullable()
      .test('test is file present', 'Attachment is required', (file) => {
        console.log(file)
        return file !== null;
      }).test('test is file size too big', 'File size is too big', (file) => {
        return file && file.size < 100 * 1024; // 100 kB
      }),
  });

  const onSubmit = form => {
    action('submitting the form')(form);
  };

  return (
    <RruForm initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      <RruFileInput name='attachment' label='Attachment' accept='image/*,.pdf' />
      <button type='submit'>Submit</button>
    </RruForm>
  );

};
