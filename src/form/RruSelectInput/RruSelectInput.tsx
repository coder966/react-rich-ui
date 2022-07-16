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

  // register to RHF
  const formContext = useFormContext();
  useEffect(() => {
    formContext.register({ name: props.name });
  }, []);

  const [selectControlValue, setSelectControlValue] = useState<RruOption | null>(null);

  const onSelectChange = (opt: RruOption | null) => {
    setSelectControlValue(opt);
    formContext.setValue(name, opt ? opt.value : null);
  };

  useEffect(() => {
    const allOptions = options || [];
    const selectedOptionValue = formContext.getValues()[name];
    const searchResult = allOptions.find((o) => o.value + '' === selectedOptionValue + '') || null;
    onSelectChange(searchResult);
  }, [options]);

  return (
    <div className='form-group'>
      <Label inputName={props.name} label={props.label} requiredAsterisk={props.requiredAsterisk} />
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
            [formContext.errors[name] ? 'borderColor' : 'not-valid-css-property']: '#dc3545',
          }),
        }}
      />
      <ErrorMessage inputName={name} />
    </div>
  );
};

export default RruSelectInput;

