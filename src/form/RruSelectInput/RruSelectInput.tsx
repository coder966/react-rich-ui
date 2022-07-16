import React, { FC, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import Select from 'react-select';
import ErrorMessage from '../common/ErrorMessage';
import Label from '../common/Label';
import RruOption from '../types/RruOption';
import RruSelectInputProps from './types/RruSelectInputProps';


/**
 * @author coder966
 */
const RruSelectInput: FC<RruSelectInputProps> = (props) => {
  const { name, options, disabled } = props;

  const [selectControlValue, setSelectControlValue] = useState<RruOption | null>(null);
  const formContext = useFormContext();
  formContext.register({ name });

  const onSelectChange = (opt: RruOption | null) => {
    // react-select option datatype
    setSelectControlValue({ value: opt ? opt.value : '', label: opt ? opt.label : '' });
    formContext.setValue(name, opt ? opt.value : '');
  };

  // because controlled fields (registered through formContext.register) need to call setValue for the initial value
  useEffect(() => {
    let defaultOption;
    const initialValue = formContext.getValues()[props.name];
    if (initialValue) {
      defaultOption = options.find((o) => o.value + '' === initialValue + '');
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

export default RruSelectInput;

