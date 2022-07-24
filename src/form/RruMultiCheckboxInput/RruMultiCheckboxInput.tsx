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
import { useFormContext } from 'react-hook-form';
import { retainAll } from '../../utils/utils';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Label from '../Label/Label';
import RruOption from '../types/RruOption';
import RruMultiCheckboxInputProps from './types/RruMultiCheckboxInputProps';

const RruMultiCheckboxInput: FC<RruMultiCheckboxInputProps> = (props) => {
  const formContext = useFormContext();
  const [hasBeenInitialized, setHasBeenInitialized] = useState<boolean>(false);
  const [selectedOptions, setSelectedOptions] = useState<readonly RruOption[]>([]);

  const findOptions = (optionsValuesArray: any): readonly RruOption[] => {
    return retainAll(props.options, optionsValuesArray, (opt, val) => (opt.value + '' === val + ''));
  }

  const onSelectChange = (options: readonly RruOption[]) => {
    setSelectedOptions(options);
    formContext.setValue(props.name, options.map(opt => opt.value));
  }

  useEffect(() => {
    formContext.register({ name: props.name });
    const initialValue = formContext.getValues()[props.name] || [];
    const options = findOptions(initialValue);
    onSelectChange(options);
    setHasBeenInitialized(true);
  }, []);

  useEffect(() => {
    if (hasBeenInitialized) {
      const options = findOptions(selectedOptions.map(opt => opt.value));
      onSelectChange(options);
    }
  }, [props.options]);

  const onChange = (option: RruOption, isChecked: boolean) => {
    let newSelectedOptions;
    if (isChecked) {
      newSelectedOptions = selectedOptions.concat([option]);
    } else {
      newSelectedOptions = selectedOptions.filter(opt => opt.value !== option.value);
    }
    onSelectChange(newSelectedOptions);
  }

  const isChecked = (option: RruOption): boolean => {
    return selectedOptions.includes(option);
  }

  return (
    <div className='form-group'>
      <Label inputName={props.name} label={props.label} requiredAsterisk={props.requiredAsterisk} />
      <div>
        {props.options.map((option) => (
          <div
            key={`checkbox_${props.name}_${option.value}`}
            className={`form-check ${props.inline ? 'form-check-inline' : ''}`}>
            <input
              id={`checkbox_${props.name}_${option.value}`}
              name={props.name}
              value={option.value}
              checked={isChecked(option)}
              onChange={e => onChange(option, e.target.checked)}
              type='checkbox'
              className={`form-check-input ${formContext.errors[props.name] ? 'is-invalid' : ''}`}
            />
            <label htmlFor={`checkbox_${props.name}_${option.value}`} className='form-check-label'>
              {option.label}
            </label>
          </div>
        ))}
      </div>
      <ErrorMessage inputName={props.name} />
    </div>
  );
};

export default RruMultiCheckboxInput;

