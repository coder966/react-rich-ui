import { action } from '@storybook/addon-actions';
import { Meta } from '@storybook/react';
import React from 'react';
import * as yup from 'yup';
import { RruButton, RruButtonProps } from '../src/button/react-rich-ui-button';
import { RruFormElement } from '../src/form/react-rich-ui-form';

const storyMeta: Meta = {
  title: 'Button',
  component: RruButton,
};

export default storyMeta;

export const Normal = (args: RruButtonProps) => {

  const onClick = () => {
    action('action click')();
  }

  return (
    <RruButton 
      variant='info'
      onClick={onClick}
      label='OK' />
  );
};

export const Confirmation = (args: RruButtonProps) => {

  const validationSchema = yup.object().shape({
    reason: yup.string().required(),
  });

  const initialValues = {
    reason: 'default reason'
  }

  const onConfirm = (form, setShow) => {
    action('action confirmed')(form);
    return true;
  }

  return (
    <RruButton 
      variant='danger'
      onConfirm={onConfirm}
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

