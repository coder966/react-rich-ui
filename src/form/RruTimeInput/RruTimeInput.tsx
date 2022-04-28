import React, { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import DateTimePicker from '../common/DateTimePicker';
import ErrorMessage from '../common/ErrorMessage';
import Label from '../common/Label';

export interface RruTimeInputProps {
  /**  */
  name: string;

  /**  */
  label?: React.ReactNode;

  /**  */
  disabled?: boolean;

  /**  */
  requiredAsterisk?: boolean;

  /** hh:mm */
  defaultValue?: string;

  /** Reverse the render order of the time parts selectors */
  reverseDisplayOrder?: boolean;

  /** Clock style either 24-hours or 12-hours */
  clock?: 24 | 12;
}

/**
 * @author coder966
 */
const RruTimeInput: FC<RruTimeInputProps> = (props) => {
  const { name, disabled } = props;

  const formContext = useFormContext();
  formContext.register({ name });

  return (
    <div className='form-group'>
      <Label inputName={props.name} label={props.label} requiredAsterisk={props.requiredAsterisk} />
      <DateTimePicker
        type='time'
        onChange={(value) => formContext.setValue(name, value)}
        defaultValue={props.defaultValue}
        reverseDisplayOrder={props.reverseDisplayOrder}
        clock={props.clock}
        disabled={disabled}
      />
      <ErrorMessage inputName={name} />
    </div>
  );
};

export { RruTimeInput };

