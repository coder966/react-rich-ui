import React, { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import DateTimePicker from '../DateTimePicker';
import ErrorMessage from '../ErrorMessage';
import Label from '../Label';

export interface DateInputProps {
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

  /** yyyy-mm-dd */
  defaultValue?: string;

  /**  */
  isHijri: boolean;

  /** Display only past years */
  isPast: boolean;

  /** Display future past years */
  isFuture: boolean;

  /** The maximum number of years +/- current year that will be available in the select menus */
  maxYearLength: number;

  /** Reverse the render order of the date parts selectors */
  reverseDisplayOrder?: boolean;
}

/**
 * @author coder966
 */
const DateInput: FC<DateInputProps> = (props) => {
  const { name, disabled } = props;

  const formContext = useFormContext();
  formContext.register({ name });

  return (
    <div className={props.className ? props.className : 'form-group'}>
      <Label inputName={props.name} label={props.label} requiredAsterisk={props.requiredAsterisk} />
      <DateTimePicker type='date' onChange={(value) => formContext.setValue(name, value)} defaultValue={props.defaultValue} reverseDisplayOrder={props.reverseDisplayOrder} isHijri={props.isHijri} isFuture={props.isFuture} isPast={props.isPast} maxYearLength={props.maxYearLength} disabled={disabled} />
      <ErrorMessage inputName={name} />
    </div>
  );
};

export default DateInput;
