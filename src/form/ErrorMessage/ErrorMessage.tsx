import React, { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { isObjKey } from '../../utils/utils';
import './style.css';

export interface ErrorMessageProps {
  /**  */
  inputName: string;
}

/**
 * @author coder966
 */
const ErrorMessage: FC<ErrorMessageProps> = (props) => {
  const formContext = useFormContext();
  const error = formContext.errors[props.inputName];
  const messageKey = 'message';
  const message = error && isObjKey(error, messageKey) && error[messageKey];

  return message ? <span className='rru-form-error-message'>{message}</span> : null;
};

export default ErrorMessage;
