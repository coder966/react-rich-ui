/*
 * Copyright 2020 Khalid H. Alharisi
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { FC, useEffect, useState } from 'react';
import Select from 'react-select';
import { retainAll } from '../../utils/utils';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { useField } from '../hooks/useField';
import Label from '../Label/Label';
import RruOption from '../types/RruOption';
import RruMultiSelectInputProps from './types/RruMultiSelectInputProps';

const RruMultiSelectInput: FC<RruMultiSelectInputProps> = (props) => {
  const field = useField(props.name);
  const [hasBeenInitialized, setHasBeenInitialized] = useState<boolean>(false);
  const [selectedOptions, setSelectedOptions] = useState<readonly RruOption[]>([]);

  const findOptions = (optionsValuesArray: any): readonly RruOption[] => {
    return retainAll(props.options, optionsValuesArray, (opt, val) => (opt.value + '' === val + ''));
  }

  const onSelectChange = (options: readonly RruOption[], touched: boolean) => {
    setSelectedOptions(options);
    field.setValue(options.map(opt => opt.value), touched);

    if (props.onChange) {
      props.onChange(options.map(opt => opt.value));
    }
  };

  useEffect(() => {
    field.register();
    const initialValue = field.getValue() || [];
    const options = findOptions(initialValue);
    onSelectChange(options, false);
    setHasBeenInitialized(true);

    return () => field.unregister();
  }, []);

  useEffect(() => {
    if (hasBeenInitialized) {
      const options = findOptions(selectedOptions.map(opt => opt.value));
      onSelectChange(options, true);
    }
  }, [props.options]);

  return (
    <div className='form-group'>
      <Label inputName={props.name} label={props.label} requiredAsterisk={props.requiredAsterisk} />
      <Select
        name={props.name}
        isMulti={true}
        value={selectedOptions}
        onChange={options => onSelectChange(options, true)}
        options={props.options}
        isDisabled={props.disabled}
        styles={{
          container: (provided, state) => ({
            ...provided,
            width: '100%',
          }),
          control: (provided, state) => ({
            ...provided,
            [field.error ? 'borderColor' : 'not-valid-css-property']: '#dc3545',
          }),
        }}
      />
      <ErrorMessage inputName={props.name} />
    </div>
  );
};

export default RruMultiSelectInput;

