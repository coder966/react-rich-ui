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
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Label from '../Label/Label';
import RruOption from '../types/RruOption';
import RruRadioInputProps from './types/RruRadioInputProps';

const RruRadioInput: FC<RruRadioInputProps> = (props) => {
  const formContext = useFormContext();
  const [hasBeenInitialized, setHasBeenInitialized] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<RruOption | null>(null);

  const findOption = (optionValue: any): RruOption | null => {
    return props.options.find(opt => opt.value + '' === optionValue + '') || null;
  }

  const onSelectChange = (option: RruOption | null) => {
    setSelectedOption(option);
    formContext.setValue(props.name, option ? option.value : null);
  }

  useEffect(() => {
    formContext.register({ name: props.name });
    const initialValue = formContext.getValues()[props.name];
    const option = findOption(initialValue);
    onSelectChange(option);
    setHasBeenInitialized(true);

    return () => formContext.unregister(props.name);
  }, []);

  useEffect(() => {
    if (hasBeenInitialized) {
      const option = findOption(selectedOption?.value);
      onSelectChange(option);
    }
  }, [props.options]);

  const isChecked = (option: RruOption): boolean => {
    return selectedOption ? selectedOption.value === option.value : false
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
              onChange={e => onSelectChange(option)}
              type='radio'
              className={`form-check-input ${formContext.errors[props.name] ? 'is-invalid' : ''}`}
              disabled={props.disabled}
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

export default RruRadioInput;

