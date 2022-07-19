import React, { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import ErrorMessage from '../common/ErrorMessage';
import Label from '../common/Label';
import RruRadioInputProps from './types/RruRadioInputProps';


/**
 * @author coder966
 */
const RruRadioInput: FC<RruRadioInputProps> = (props) => {
  const formContext = useFormContext();

  return (
    <div className='form-group'>
      <Label inputName={props.name} label={props.label} requiredAsterisk={props.requiredAsterisk} />
      <div className={props.inline ? 'form-check-inline' : undefined}>
        {props.options.map((o) => (
          <div key={`${props.name}_${o.value}`} className={'form-check' + props.disabled ? ' disabled' : undefined}>
            <input
              {...props}
              type='radio'
              ref={formContext.register}
              name={props.name}
              value={o.value}
              id={`${props.name}_${o.value}`}
            />
            <label className='form-check-label' htmlFor={`${props.name}_${o.value}`}>
              {o.label}
            </label>
          </div>
        ))}
      </div>
      <ErrorMessage inputName={props.name} />
    </div>
  );
};

export default RruRadioInput;

