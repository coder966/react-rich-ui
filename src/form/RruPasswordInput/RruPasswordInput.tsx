import React, { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import ErrorMessage from '../common/ErrorMessage';
import Label from '../common/Label';

type InputProps = JSX.IntrinsicElements['input'];

export interface RruPasswordInputProps extends InputProps {
  /**  */
  name: string;

  /**  */
  label?: React.ReactNode;

  /**  */
  requiredAsterisk?: boolean;

}

/**
 * @author coder966
 */
const RruPasswordInput: FC<RruPasswordInputProps> = (props) => {
  const { name } = props;

  const formContext = useFormContext();

  return (
    <div className='form-group'>
      <Label inputName={props.name} label={props.label} requiredAsterisk={props.requiredAsterisk} />
      <input
        {...props}
        ref={formContext.register}
        name={name}
        type='password'
        className={'form-control ' + (formContext.errors[name] ? 'is-invalid' : '')}
      />
      <ErrorMessage inputName={name} />
    </div>
  );
};

export { RruPasswordInput };

