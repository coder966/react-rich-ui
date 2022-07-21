import React, { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import RruCheckboxInputProps from './types/RruCheckboxInputProps';

/**
 * @author coder966
 */
const RruCheckboxInput: FC<RruCheckboxInputProps> = (props) => {
  const formContext = useFormContext();

  return (
    <div className='form-group'>
      <div className='custom-control custom-checkbox m-1'>
        <input
          {...props}
          id={'checkbox_' + props.name}
          name={props.name}
          ref={formContext.register}
          type='checkbox'
          className={'custom-control-input ' + (formContext.errors[props.name] ? 'is-invalid' : '')}
        />
        <label htmlFor={'checkbox_' + props.name} className='custom-control-label'>
          {props.label}
        </label>
      </div>
      <ErrorMessage inputName={props.name} />
    </div>
  );
};

export default RruCheckboxInput;
