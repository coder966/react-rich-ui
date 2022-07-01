import React, { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import ErrorMessage from '../common/ErrorMessage';
import Label from '../common/Label';
import RruOption from '../types/RruOption';

type InputProps = JSX.IntrinsicElements['input'];

export interface RruRadioInputProps extends InputProps {
  /**  */
  name: string;

  /**  */
  label?: React.ReactNode;

  /**  */
  requiredAsterisk?: boolean;

  /**  */
  options: RruOption[];

  /** Display all radio buttons in the same line */
  inline?: boolean;
}

/**
 * @author coder966
 */
const RruRadioInput: FC<RruRadioInputProps> = (props) => {
  const { name, options } = props;

  const formContext = useFormContext();

  return (
    <div className='form-group'>
      <Label inputName={props.name} label={props.label} requiredAsterisk={props.requiredAsterisk} />
      <div className={props.inline ? 'form-check-inline' : undefined}>
        {options.map((o) => (
          <div key={`${name}_${o.value}`} className={'form-check' + props.disabled ? ' disabled' : undefined}>
            <input
              {...props}
              type='radio'
              ref={(input) => {formContext.register(input)}}
              name={name}
              value={o.value}
              id={`${name}_${o.value}`}
            />
            <label className='form-check-label' htmlFor={`${name}_${o.value}`}>
              {o.label}
            </label>
          </div>
        ))}
      </div>
      <ErrorMessage inputName={name} />
    </div>
  );
};

export { RruRadioInput };

