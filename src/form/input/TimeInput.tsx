import React, { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import DateTimePicker from '../DateTimePicker';
import ErrorMessage from '../ErrorMessage';
import Label from '../Label';

export interface TimeInputProps {
  name: string;
  label?: React.ReactNode;
  disabled?: boolean;
  className?: string;
  requiredAsterisk?: boolean;
  defaultValue: string;
  reverseDisplayOrder: boolean;
  isPast: boolean;
  isFuture: boolean;
  clock: 24 | 12;
}

/**
 * @author coder966
 */
const TimeInput: FC<TimeInputProps> = (props) => {
  const { name, disabled } = props;

  const formContext = useFormContext();
  formContext.register({ name });

  return (
    <div className={props.className ? props.className : 'form-group'}>
      <Label inputName={props.name} label={props.label} requiredAsterisk={props.requiredAsterisk} />
      <DateTimePicker type='time' onChange={(value) => formContext.setValue(name, value)} defaultValue={props.defaultValue} reverseDisplayOrder={props.reverseDisplayOrder} isFuture={props.isFuture} isPast={props.isPast} clock={props.clock} disabled={disabled} />
      <ErrorMessage inputName={name} />
    </div>
  );
};

export default TimeInput;
