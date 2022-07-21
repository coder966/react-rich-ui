import React, { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Label from '../Label/Label';
import RruTextInputProps from './types/RruTextInputProps';

/**
 * @author coder966
 */
const RruTextInput: FC<RruTextInputProps> = (props) => {
  const formContext = useFormContext();

  return (
    <div className='form-group'>
      <Label inputName={props.name} label={props.label} requiredAsterisk={props.requiredAsterisk} />
      <input
        {...props}
        ref={formContext.register}
        name={props.name}
        type={props.isPassword ? 'password' : 'text'}
        className={`form-control ${formContext.errors[props.name] ? 'is-invalid' : ''}`}
      />
      <ErrorMessage inputName={props.name} />
    </div>
  );
};

export default RruTextInput;

