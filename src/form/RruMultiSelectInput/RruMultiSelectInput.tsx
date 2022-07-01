import React, { FC, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import Select from 'react-select';
import ErrorMessage from '../common/ErrorMessage';
import Label from '../common/Label';
import RruOption from '../types/RruOption';

export interface RruMultiSelectInputProps {
  /**  */
  name: string;

  /**  */
  label?: React.ReactNode;

  /**  */
  disabled?: boolean;

  /**  */
  requiredAsterisk?: boolean;

  /**  */
  options: RruOption[];

  /**  */
  defaultValue?: string[];
}

/**
 * @author coder966
 */
const RruMultiSelectInput: FC<RruMultiSelectInputProps> = (props) => {
  const { name, options, disabled, defaultValue } = props;

  const [selectControlValue, setSelectControlValue] = useState<readonly RruOption[]>();
  const formContext = useFormContext();
  formContext.register({ name });

  const onSelectChange = (opt: readonly RruOption[] | null) => {
    // react-select option datatype
    setSelectControlValue(opt || []);
    formContext.setValue(name, opt ? opt.map((o) => o.value) : []);
  };

  // because controlled fields (registered through formContext.register) need to call setValue for the initial value
  useEffect(() => {
    let defaultOptions: RruOption[] = [];
    if (defaultValue) {
      defaultOptions = options.filter((o) => defaultValue.includes(o.value + ''));
    }
    onSelectChange(defaultOptions);
  }, []);

  useEffect(() => {
    const currentValue = formContext.getValues()[name];
    if (currentValue) {
      onSelectChange(
        options.filter((o) => currentValue.includes(o.value + ''))
      );
    }
  }, [options]);

  return (
    <div className='form-group'>
      <Label inputName={props.name} label={props.label} requiredAsterisk={props.requiredAsterisk} />
      {selectControlValue ? (
        <Select
          name={name}
          isMulti={true}
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

export { RruMultiSelectInput };

