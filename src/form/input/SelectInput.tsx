import React, { FC, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import Select from 'react-select';
import ErrorMessage from '../ErrorMessage';
import Label from '../Label';
import IReactSelectOption from './types/IReactSelectOption';
import Option from './types/Option';

export interface SelectInputProps {
  name: string;
  label?: React.ReactNode;
  disabled?: boolean;
  className?: string;
  requiredAsterisk?: boolean;
  options: Option[];
  defaultValue: string;
}

/**
 * @author coder966
 */
const SelectInput: FC<SelectInputProps> = (props) => {
  const { name, options, disabled } = props;

  const [selectControlValue, setSelectControlValue] = useState<IReactSelectOption | null>(null);
  const formContext = useFormContext();
  formContext.register({ name });

  const onSelectChange = (opt: IReactSelectOption | null) => {
    // react-select option datatype
    setSelectControlValue({ value: opt ? opt.value : '', label: opt ? opt.label : '' });
    formContext.setValue(name, opt ? opt.value : '');
  };

  // because controlled fields (registered through formContext.register) need to call setValue for the initial value
  // this issue is also present in date and time but is handled in the DateTimePicker constructor
  useEffect(() => {
    let defaultOption;
    if (props.defaultValue) {
      defaultOption = options.find((o) => o.id + '' === props.defaultValue + '');
    } else {
      defaultOption = options[0];
    }
    defaultOption = defaultOption || { id: '', label: '' };
    onSelectChange({
      value: defaultOption.id,
      label: defaultOption.label,
    });
  }, []);

  useEffect(() => {
    const currentValue = formContext.getValues()[name];
    if (currentValue && !options.find((o) => o.id + '' === currentValue + '')) {
      onSelectChange({ value: '', label: '' });
    }
  }, [options]);

  return (
    <div className={props.className ? props.className : 'form-group'}>
      <Label inputName={props.name} label={props.label} requiredAsterisk={props.requiredAsterisk} />
      {selectControlValue ? (
        <Select
          name={name}
          isMulti={false}
          isDisabled={disabled}
          value={selectControlValue}
          onChange={onSelectChange}
          options={options.map((o) => ({ value: o.id, label: o.label }))}
          styles={{
            container: (provided, state) => ({
              ...provided,
              width: '100%',
            }),
            control: (provided, state) => ({
              ...provided,
              [formContext.errors[name] ? 'borderColor' : 'dummy']: '#dc3545',
            }),
          }}
        />
      ) : null}
      <ErrorMessage inputName={name} />
    </div>
  );
};

export default SelectInput;
