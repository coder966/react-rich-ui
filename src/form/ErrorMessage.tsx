import React, { FC } from 'react';
import { useFormContext } from 'react-hook-form';

export interface ErrorMessageProps {
  inputName: string,
}

/**
  * @author coder966
  */
const ErrorMessage: FC<ErrorMessageProps> = props => {
    const formContext = useFormContext();
    const error = formContext.errors[props.inputName];
    const message = error && error['message'];

    return message ?
        <span className='rru-form-input-error-message'>{message}</span>
    : null;
};

export default ErrorMessage;
