import React, { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import ErrorMessage from '../common/ErrorMessage';
import Label from '../common/Label';

type TextareaProps = JSX.IntrinsicElements['textarea'];

export interface RruTextareaInputProps extends TextareaProps {
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
const RruTextareaInput: FC<RruTextareaInputProps> = (props) => {
  const { name } = props;

  const formContext = useFormContext();

  return (
    <div className='form-group'>
      <Label inputName={props.name} label={props.label} requiredAsterisk={props.requiredAsterisk} />
      <textarea
        {...props}
        ref={(textarea) => { formContext.register(textarea) }}
        name={name}
        className={`form-control ${formContext.errors[props.name] ? 'is-invalid' : ''}`}
      />
      <ErrorMessage inputName={name} />
    </div>
  );
};

export { RruTextareaInput };

