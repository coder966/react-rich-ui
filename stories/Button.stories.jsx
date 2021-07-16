import { action } from '@storybook/addon-actions';
import React from 'react';
import * as yup from 'yup';
import RruButton from '../src/button/react-rich-ui-button';
import { RruFormElement } from '../src/form/react-rich-ui-form';

export default {
  title: 'Button',
  component: RruButton,
};

export const ButtonExample = props => {

  const validationSchema = yup.object().shape({
    reason: yup.string().required(),
  });

  const initialValues = {
    reason: 'default reason'
  }

  return (
    <RruButton 
      variant='danger'
      onConfirm={action('Confirmed')}
      label='Delete'
      initialValues={initialValues}
      validationSchema={validationSchema}
      formElements={
        <RruFormElement type='text' name='reason' label='Reason' />
      }
      confirmationTitle='Delete'
      confirmationDesc='Are you sure you want to delete ?'
      confirmLabel='Confirm'
      cancelLabel='Cancel' />
  );
};
