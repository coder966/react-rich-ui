import React, { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import ErrorMessage from '../ErrorMessage';
import Label from '../Label';

export interface TextInputProps {
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
  maxLength: number;

  /**  */
  placeholder: string;

  /**  */
  dir?: 'auto' | 'ltr' | 'rtl';

}

/**
 * @author coder966
 */
const TextInput: FC<TextInputProps> = (props) => {
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
        type='text'
        className={'form-control ' + (formContext.errors[name] ? 'is-invalid' : '')}
      />
      <ErrorMessage inputName={name} />
    </div>
  );
};

export default TextInput;
