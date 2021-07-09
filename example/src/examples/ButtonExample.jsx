import React from 'react';
import { RruButton, RruFormElement } from 'react-rich-ui';
import * as yup from 'yup';

const ButtonExample = props => {

  const validationSchema = yup.object().shape({
    reason: yup.string().required(),
  });

  const initialValues = {
    reason: 'default reason'
  }

  const onConfirm = (form, setShow) => {
    console.log(form);

    // simulate delay or maybe perform API operation and then show error or proceed
    setTimeout(() => {
      setShow(false);
    }, 5000);
    return false;
  }

  return (
    <>
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
    </>
  );
};

export default ButtonExample;
