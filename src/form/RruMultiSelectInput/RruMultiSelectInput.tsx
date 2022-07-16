import React, { FC, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import Select from 'react-select';
import { retainAll } from '../../utils/utils';
import ErrorMessage from '../common/ErrorMessage';
import Label from '../common/Label';
import RruOption from '../types/RruOption';
import RruMultiSelectInputProps from './types/RruMultiSelectInputProps';

/**
 * @author coder966
 */
const RruMultiSelectInput: FC<RruMultiSelectInputProps> = (props) => {
  const { name, options, disabled } = props;

  // register to RHF
  const formContext = useFormContext();
  useEffect(() => {
    formContext.register({ name: props.name });
  }, []);

  const [selectControlValue, setSelectControlValue] = useState<readonly RruOption[] | null>();

  const onSelectChange = (opt: readonly RruOption[] | null) => {
    setSelectControlValue(opt);
    formContext.setValue(name, opt ? opt.map((o) => o.value) : []);
  };

  useEffect(() => {
    const allOptions = options || [];
    const selectedOptionsValues = formContext.getValues()[props.name] || [];
    const comparator = (opt: RruOption, val: any) => (opt.value + '' === val + '');
    const intersection = retainAll(allOptions || [], selectedOptionsValues, comparator);
    onSelectChange(intersection);
  }, [options]);

  return (
    <div className='form-group'>
      <Label inputName={props.name} label={props.label} requiredAsterisk={props.requiredAsterisk} />
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
            [formContext.errors[name] ? 'borderColor' : 'not-valid-css-property']: '#dc3545',
          }),
        }}
      />
      <ErrorMessage inputName={name} />
    </div>
  );
};

export default RruMultiSelectInput;

