import React from 'react';
import {FormattedMessage} from 'react-intl';
import * as yup from 'yup';
import { RruFormElement, RruButton } from 'react-rich-ui';

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
        label={<FormattedMessage id='delete' />}
        initialValues={initialValues}
        validationSchema={validationSchema}
        formElements={
          <RruFormElement type='text' name='reason' label={<FormattedMessage id='reason' />} />
        }
        confirmationTitle={<FormattedMessage id='delete' />}
        confirmationDesc={<FormattedMessage id='deleteConfirmation' />}
        confirmLabel={<FormattedMessage id='confirm' />}
        cancelLabel={<FormattedMessage id='cancel' />} />
    </>
  );
};

export default ButtonExample;
