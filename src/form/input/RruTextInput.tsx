import React, { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import ErrorMessage from '../ErrorMessage';
import Label from '../Label';

export interface RruTextInputProps {
  /**  */
  name: string;

  /**  */
  label?: React.ReactNode;

  /**  */
  disabled?: boolean;

  /**  */
  requiredAsterisk?: boolean;

  /**  */
  maxLength?: number;

  /**  */
  placeholder?: string;

  /**  */
  dir?: 'auto' | 'ltr' | 'rtl';

}

/**
 * @author coder966
 */
const RruTextInput: FC<RruTextInputProps> = (props) => {
  const { name, disabled, maxLength, placeholder } = props;

  const formContext = useFormContext();

  return (
    <div className='form-group'>
      <Label inputName={props.name} label={props.label} requiredAsterisk={props.requiredAsterisk} />
      <input
        ref={formContext.register}
        name={name}
        disabled={disabled}
        maxLength={maxLength}
        placeholder={placeholder}
        dir={props.dir}
        type='text'
        className={'form-control ' + (formContext.errors[name] ? 'is-invalid' : '')}
      />
      <ErrorMessage inputName={name} />
    </div>
  );
};

export { RruTextInput };

