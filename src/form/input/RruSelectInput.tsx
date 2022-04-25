import React, { FC, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import Select from 'react-select';
import ErrorMessage from '../ErrorMessage';
import Label from '../Label';
import IReactSelectOption from './types/IReactSelectOption';

export interface RruSelectInputProps {
  /**  */
  name: string;

  /**  */
  label?: React.ReactNode;

  /**  */
  disabled?: boolean;

  /**  */
  requiredAsterisk?: boolean;

  /**  */
  options: IReactSelectOption[];

  /**  */
  defaultValue: string;
}

/**
 * @author coder966
 */
const RruSelectInput: FC<RruSelectInputProps> = (props) => {
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
  useEffect(() => {
    let defaultOption;
    if (props.defaultValue) {
      defaultOption = options.find((o) => o.value + '' === props.defaultValue + '');
    } else {
      defaultOption = options[0];
    }
    defaultOption = defaultOption || { value: '', label: '' };
    onSelectChange(defaultOption);
  }, []);

  useEffect(() => {
    const currentValue = formContext.getValues()[name];
    if (currentValue && !options.find((o) => o.value + '' === currentValue + '')) {
      onSelectChange({ value: '', label: '' });
    }
  }, [options]);

  return (
    <div className='form-group'>
      <Label inputName={props.name} label={props.label} requiredAsterisk={props.requiredAsterisk} />
      {selectControlValue ? (
        <Select
          name={name}
          isMulti={false}
          isDisabled={disabled}
          value={selectControlValue}
          onChange={onSelectChange}
          options={options}
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

export { RruSelectInput };

