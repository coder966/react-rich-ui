import React, { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import ErrorMessage from '../ErrorMessage';
import Label from '../Label';
import Option from './types/Option';

export interface RadioInputProps {

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
  options: Option[];

  /** Display all radio buttons in the same line */
  inline: boolean;

}

/**
 * @author coder966
 */
const RadioInput: FC<RadioInputProps> = (props) => {
  const { name, options, disabled } = props;

  const formContext = useFormContext();

  return (
    <div className={props.className ? props.className : 'form-group'}>
      <Label inputName={props.name} label={props.label} requiredAsterisk={props.requiredAsterisk} />
      <div className={props.inline ? 'form-check-inline' : undefined}>
        {options.map((o) => (
          <div key={`${name}_${o.id}`} className={'form-check' + disabled ? ' disabled' : undefined}>
            <input type='radio' ref={formContext.register} name={name} disabled={disabled} value={o.id} id={`${name}_${o.id}`} />
            <label className='form-check-label' htmlFor={`${name}_${o.id}`}>
              {o.label}
            </label>
          </div>
        ))}
      </div>
      <ErrorMessage inputName={name} />
    </div>
  );
};

export default RadioInput;
