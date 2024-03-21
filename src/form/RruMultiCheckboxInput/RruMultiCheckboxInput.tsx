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
import { deepEqual } from '../../utils/utils';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Label from '../Label/Label';
import { useField } from '../hooks/useField';
import RruOption from '../types/RruOption';
import { findOptions, isOptionsGroup } from '../utils/options-utils';
import RruMultiCheckboxInputProps from './types/RruMultiCheckboxInputProps';

const RruMultiCheckboxInput: FC<RruMultiCheckboxInputProps> = (props) => {
  const [value, setValue] = useState<string | null>(null);

  const field = useField(props.name, (serializedValue) => {
    if (!deepEqual(serializedValue, value)) {
      setValue(serializedValue);
    }
  });

  const [hasBeenInitialized, setHasBeenInitialized] = useState<boolean>(false);
  const [selectedOptions, setSelectedOptions] = useState<readonly RruOption[]>([]);

  const onSelectChange = (options: readonly RruOption[]) => {
    setSelectedOptions(options);
    field.setValue(options.map((opt) => opt.value));

    if (props.onChange) {
      props.onChange(options.map((opt) => opt.value));
    }
  };

  useEffect(() => {
    field.register((initialValue) => {
      const options = findOptions(props.options, initialValue || []);
      onSelectChange(options);
      setHasBeenInitialized(true);
    });

    return () => field.unregister();
  }, []);

  useEffect(() => {
    if (hasBeenInitialized) {
      const options = findOptions(
        props.options,
        selectedOptions.map((opt) => opt.value)
      );
      onSelectChange(options);
    }
  }, [props.options]);

  const onChange = (option: RruOption, isChecked: boolean) => {
    let newSelectedOptions;
    if (isChecked) {
      newSelectedOptions = selectedOptions.concat([option]);
    } else {
      newSelectedOptions = selectedOptions.filter((opt) => opt.value !== option.value);
    }
    onSelectChange(newSelectedOptions);
  };

  const isChecked = (option: RruOption): boolean => {
    return selectedOptions.includes(option);
  };

  const renderCheckBox = (option: RruOption) => {
    const key = `checkbox_${props.name}_${option.value}`;
    return (
      <div
        key={key}
        className={`form-check ${props.inline ? 'form-check-inline' : ''}`}
        role='checkbox'
        aria-checked={isChecked(option)}>
        <Label label={option.label}>
          <input
            name={props.name}
            value={option.value}
            checked={isChecked(option)}
            onChange={(e) => onChange(option, e.target.checked)}
            onBlur={field.onBlur}
            type='checkbox'
            className={`form-check-input ${field.error ? 'is-invalid' : ''}`}
            disabled={props.disabled}
          />
        </Label>
      </div>
    );
  };

  return (
    <div className='form-group' data-field-name={props.name} data-field-value={value}>
      <Label label={props.label} requiredAsterisk={props.requiredAsterisk}></Label>
      <div>
        {props.options.map((option) => {
          if (isOptionsGroup(option)) {
            return (
              <div key={option.label?.toString()} className='rru-form-grouped-options-container'>
                <label className='rru-form-grouped-options-label'>{option.label}</label>
                {option.options.map((opt) => renderCheckBox(opt))}
              </div>
            );
          } else {
            return renderCheckBox(option);
          }
        })}
      </div>
      <ErrorMessage error={field.error} />
    </div>
  );
};

export default RruMultiCheckboxInput;
