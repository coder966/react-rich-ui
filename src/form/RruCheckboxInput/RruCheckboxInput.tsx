import React, { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import ErrorMessage from '../common/ErrorMessage';
import RruCheckboxInputProps from './types/RruCheckboxInputProps';

/**
 * @author coder966
 */
const RruCheckboxInput: FC<RruCheckboxInputProps> = (props) => {
  const { name, label } = props;

  const formContext = useFormContext();

  return (
    <div className='form-group'>
      <div className='custom-control custom-checkbox m-1'>
        <input
          {...props}
          id={'checkbox_' + name}
          name={name}
          ref={(input) => {
            formContext.register(input);
          }}
          type='checkbox'
          className={'custom-control-input ' + (formContext.errors[name] ? 'is-invalid' : '')}
        />
        <label htmlFor={'checkbox_' + name} className='custom-control-label'>
          {label}
        </label>
      </div>
      <ErrorMessage inputName={name} />
    </div>
  );
};

export { RruCheckboxInput };
