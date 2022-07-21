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
  const [checkedOptions, setCheckedOptions] = useState<RruOption[]>([]);

  const setNewValue = (options: RruOption[]) => {
    setCheckedOptions(options);
    formContext.setValue(props.name, options.map(opt => opt.value));
  }

  useEffect(() => {
    formContext.register(props.name);
    const initialValue = formContext.getValues()[props.name];

    let resultArray: RruOption[] = [];
    if (initialValue && Array.isArray(initialValue)) {
      resultArray = retainAll(props.options, initialValue, (opt, val) => opt.value === val);
    }

    setNewValue(resultArray);
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const option = props.options.find(opt => opt.value === e.target.value);
    if (option) {
      let newCheckedOptions;
      if (e.target.checked) {
        newCheckedOptions = checkedOptions.concat([option]);
      } else {
        newCheckedOptions = checkedOptions.filter(opt => opt.value !== option.value);
      }
      setNewValue(newCheckedOptions);
    }
  }

  const isChecked = (option: RruOption): boolean => {
    return checkedOptions.find(opt => opt.value === option.value) !== undefined
  }

  return (
    <div className='form-group'>
      <Label inputName={props.name} label={props.label} requiredAsterisk={props.requiredAsterisk} />
      <div>
        {props.options.map((option) => (
          <div key={`checkbox_${props.name}_${option.value}`} className='form-check'>
            <input
              id={`checkbox_${props.name}_${option.value}`}
              name={props.name}
              value={option.value}
              checked={isChecked(option)}
              onChange={onChange}
              type='checkbox'
              className='form-check-input'
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

