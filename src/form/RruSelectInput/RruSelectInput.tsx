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
  // register to RHF
  const formContext = useFormContext();
  useEffect(() => {
    formContext.register({ name: props.name });
  }, []);

  const [selectControlValue, setSelectControlValue] = useState<RruOption | null>(null);

  const onSelectChange = (opt: RruOption | null) => {
    setSelectControlValue(opt);
    formContext.setValue(props.name, opt ? opt.value : null);
  };

  useEffect(() => {
    const allOptions = props.options || [];
    const selectedOptionValue = formContext.getValues()[props.name];
    const searchResult = allOptions.find((o) => o.value + '' === selectedOptionValue + '') || null;
    onSelectChange(searchResult);
  }, [props.options]);

  return (
    <div className='form-group'>
      <Label inputName={props.name} label={props.label} requiredAsterisk={props.requiredAsterisk} />
      <Select
        name={props.name}
        isMulti={false}
        isDisabled={props.disabled}
        value={selectControlValue}
        onChange={onSelectChange}
        options={props.options}
        styles={{
          container: (provided, state) => ({
            ...provided,
            width: '100%',
          }),
          control: (provided, state) => ({
            ...provided,
            [formContext.errors[props.name] ? 'borderColor' : 'not-valid-css-property']: '#dc3545',
          }),
        }}
      />
      <ErrorMessage inputName={props.name} />
    </div>
  );
};

export default RruSelectInput;

