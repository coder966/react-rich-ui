import React, { FC, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import Select from 'react-select';
import ErrorMessage from '../ErrorMessage';
import Label from '../Label';
import IReactSelectOption from './types/IReactSelectOption';
import Option from './types/Option';

export interface MultiSelectInputProps {
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

  /**  */
  defaultValue?: string[];
}

/**
 * @author coder966
 */
const MultiSelectInput: FC<MultiSelectInputProps> = (props) => {
  const { name, options, disabled, defaultValue } = props;

  const [selectControlValue, setSelectControlValue] = useState<readonly IReactSelectOption[]>();
  const formContext = useFormContext();
  formContext.register({ name });

  const onSelectChange = (opt: readonly IReactSelectOption[] | null) => {
    // react-select option datatype
    setSelectControlValue(opt || []);
    formContext.setValue(name, opt ? opt.map((o) => o.value) : []);
  };

  // because controlled fields (registered through formContext.register) need to call setValue for the initial value
  // this issue is also present in date and time but is handled in the DateTimePicker constructor
  useEffect(() => {
    let defaultOptions: IReactSelectOption[] = [];
    if (defaultValue) {
      defaultOptions = options
        .filter((o) => defaultValue.includes(o.id + ''))
        .map((o) => ({ value: o.id, label: o.label }));
    }
    onSelectChange(defaultOptions);
  }, []);

  useEffect(() => {
    const currentValue = formContext.getValues()[name];
    if (currentValue) {
      onSelectChange(
        options.filter((o) => currentValue.includes(o.id + '')).map((o) => ({ value: o.id, label: o.label }))
      );
    }
  }, [options]);

  return (
    <div className={props.className ? props.className : 'form-group'}>
      <Label inputName={props.name} label={props.label} requiredAsterisk={props.requiredAsterisk} />
      {selectControlValue ? (
        <Select
          name={name}
          isMulti={true}
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

export default MultiSelectInput;
