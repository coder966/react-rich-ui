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
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { useField } from '../hooks/useField';
import Label from '../Label/Label';
import RruOption from '../types/RruOption';
import { findOptions } from '../utils/options-utils';
import RruMultiSelectInputProps from './types/RruMultiSelectInputProps';

const RruMultiSelectInput: FC<RruMultiSelectInputProps> = (props) => {
  const field = useField(props.name);
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
    field.register();
    const initialValue = field.getValue() || [];
    const options = findOptions(props.options, initialValue);
    onSelectChange(options);
    setHasBeenInitialized(true);

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

  const getReactSelectControlStyle = (provided: any, state: any) => {
    if (field.error && !state.menuIsOpen) {
      return {
        ...provided,
        borderColor: 'var(--bs-danger) !important',
      };
    } else {
      return provided;
    }
  };

  return (
    <div className='form-group'>
      <Label inputName={props.name} label={props.label} requiredAsterisk={props.requiredAsterisk} />
      <Select
        name={props.name}
        isMulti={true}
        value={selectedOptions}
        onChange={(options) => onSelectChange(options)}
        onBlur={field.onBlur}
        options={props.options}
        isDisabled={props.disabled}
        styles={{ control: getReactSelectControlStyle }}
      />
      <ErrorMessage error={field.error} />
    </div>
  );
};

export default RruMultiSelectInput;
