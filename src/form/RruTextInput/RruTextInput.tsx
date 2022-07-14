import React, { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import ErrorMessage from '../common/ErrorMessage';
import Label from '../common/Label';

type InputProps = JSX.IntrinsicElements['input'];

export interface RruTextInputProps extends InputProps {
  /**  */
  name: string;

  /**  */
  label?: React.ReactNode;

  /**  */
  requiredAsterisk?: boolean;

  /**  */
  isPassword?: boolean;
}

/**
 * @author coder966
 */
const RruTextInput: FC<RruTextInputProps> = (props) => {
  const { name } = props;

  const formContext = useFormContext();

  return (
    <div className='form-group'>
      <Label inputName={props.name} label={props.label} requiredAsterisk={props.requiredAsterisk} />
      <input
        {...props}
        ref={(input) => {formContext.register(input)}}
        name={name}
        type={props.isPassword ? 'password' : 'text'}
        className={`form-control ${formContext.errors[props.name] ? 'is-invalid' : ''}`}
      />
      <ErrorMessage inputName={name} />
    </div>
  );
};

export { RruTextInput };

