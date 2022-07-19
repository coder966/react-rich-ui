import React, { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import ErrorMessage from '../common/ErrorMessage';
import Label from '../common/Label';
import RruTextareaInputProps from './types/RruTextareaInputProps';

/**
 * @author coder966
 */
const RruTextareaInput: FC<RruTextareaInputProps> = (props) => {
  const formContext = useFormContext();

  return (
    <div className='form-group'>
      <Label inputName={props.name} label={props.label} requiredAsterisk={props.requiredAsterisk} />
      <textarea
        {...props}
        ref={formContext.register}
        name={props.name}
        className={`form-control ${formContext.errors[props.name] ? 'is-invalid' : ''}`}
      />
      <ErrorMessage inputName={props.name} />
    </div>
  );
};

export default RruTextareaInput;

