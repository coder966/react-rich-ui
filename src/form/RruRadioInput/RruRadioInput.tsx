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
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { useField } from '../hooks/useField';
import Label from '../Label/Label';
import RruOption from '../types/RruOption';
import { findOption, isOptionsGroup } from '../utils/options-utils';
import RruRadioInputProps from './types/RruRadioInputProps';

const RruRadioInput: FC<RruRadioInputProps> = (props) => {
  const field = useField(props.name);
  const [hasBeenInitialized, setHasBeenInitialized] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<RruOption | null>(null);

  const onSelectChange = (option: RruOption | null) => {
    setSelectedOption(option);
    field.setValue(option ? option.value : null);

    if (props.onChange) {
      props.onChange(option ? option.value : null);
    }
  };

  useEffect(() => {
    field.register((initialValue) => {
      const option = findOption(props.options, initialValue);
      onSelectChange(option);
      setHasBeenInitialized(true);
    });

    return () => field.unregister();
  }, []);

  useEffect(() => {
    if (hasBeenInitialized) {
      const option = selectedOption ? findOption(props.options, selectedOption.value) : null;
      onSelectChange(option);
    }
  }, [props.options]);

  const isChecked = (option: RruOption): boolean => {
    return selectedOption ? selectedOption.value === option.value : false;
  };

  const renderRadio = (option: RruOption) => {
    const key = `radio_${props.name}_${option.value}`;
    return (
      <div key={key} className={`form-check ${props.inline ? 'form-check-inline' : ''}`}>
        <input
          id={key}
          name={props.name}
          value={option.value}
          checked={isChecked(option)}
          onChange={(e) => onSelectChange(option)}
          onBlur={field.onBlur}
          type='radio'
          className={`form-check-input ${field.error ? 'is-invalid' : ''}`}
          disabled={props.disabled}
        />
        <label htmlFor={key} className='form-check-label'>
          {option.label}
        </label>
      </div>
    );
  };

  return (
    <div className='form-group'>
      <Label inputName={props.name} label={props.label} requiredAsterisk={props.requiredAsterisk} />
      <div>
        {props.options.map((option) => {
          if (isOptionsGroup(option)) {
            return (
              <div key={option.label} className='rru-form-grouped-options-container'>
                <label className='rru-form-grouped-options-label'>{option.label}</label>
                {option.options.map((opt) => renderRadio(opt))}
              </div>
            );
          } else {
            return renderRadio(option);
          }
        })}
      </div>
      <ErrorMessage error={field.error} />
    </div>
  );
};

export default RruRadioInput;
