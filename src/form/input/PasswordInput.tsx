import React, { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import ErrorMessage from '../ErrorMessage';
import Label from '../Label';

export interface PasswordInputProps {
  /**  */
  name: string;

  /**  */
  label?: React.ReactNode;

  /**  */
  disabled?: boolean;

  /**  */
  className?: string;

  /**  */
  requiredAsterisk?: boolean;

  /**  */
  placeholder?: string;

  /**  */
  dir?: 'auto' | 'ltr' | 'rtl';

  /**  */
  maxLength?: number;
}

/**
 * @author coder966
 */
const PasswordInput: FC<PasswordInputProps> = (props) => {
  const { name, disabled, maxLength, placeholder } = props;

  const formContext = useFormContext();

  return (
    <div className={props.className ? props.className : 'form-group'}>
      <Label inputName={props.name} label={props.label} requiredAsterisk={props.requiredAsterisk} />
      <input
        ref={formContext.register}
        name={name}
        disabled={disabled}
        maxLength={maxLength}
        placeholder={placeholder}
        dir={props.dir}
        type='password'
        className={'form-control ' + (formContext.errors[name] ? 'is-invalid' : '')}
      />
      <ErrorMessage inputName={name} />
    </div>
  );
};

export default PasswordInput;
