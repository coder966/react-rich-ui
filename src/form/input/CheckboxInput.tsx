import React, { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import ErrorMessage from '../ErrorMessage';

export interface CheckboxInputProps {
  /**  */
  name: string;

  /**  */
  label?: React.ReactNode;

  /**  */
  disabled?: boolean;

  /**  */
  className?: string;
}

/**
 * @author coder966
 */
const CheckboxInput: FC<CheckboxInputProps> = (props) => {
  const { name, label, disabled } = props;

  const formContext = useFormContext();

  return (
    <div className={props.className ? props.className : 'form-group'}>
      <div className='custom-control custom-checkbox m-1'>
        <input id={'checkbox_' + name} name={name} ref={formContext.register} type='checkbox' className={'custom-control-input ' + (formContext.errors[name] ? 'is-invalid' : '')} disabled={disabled} />
        <label htmlFor={'checkbox_' + name} className='custom-control-label'>
          {label}
        </label>
      </div>
      <ErrorMessage inputName={name} />
    </div>
  );
};

export default CheckboxInput;
