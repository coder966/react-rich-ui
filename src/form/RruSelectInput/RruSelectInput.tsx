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
import RruSelectInputProps from './types/RruSelectInputProps';

const RruSelectInput: FC<RruSelectInputProps> = (props) => {
  const field = useField(props.name);
  const [hasBeenInitialized, setHasBeenInitialized] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<RruOption | null>(null);

  const findOption = (optionValue: any): RruOption | null => {
    return props.options.find(opt => opt.value + '' === optionValue + '') || null;
  }

  const onSelectChange = (option: RruOption | null, touched: boolean) => {
    setSelectedOption(option);
    field.setValue(option ? option.value : null, touched);

    if (props.onChange) {
      props.onChange(option ? option.value : null);
    }
  };

  useEffect(() => {
    field.register();
    const initialValue = field.getValue();
    const option = findOption(initialValue);
    onSelectChange(option, false);
    setHasBeenInitialized(true);

    return () => field.unregister();
  }, []);

  useEffect(() => {
    if (hasBeenInitialized) {
      const option = findOption(selectedOption?.value);
      onSelectChange(option, true);
    }
  }, [props.options]);

  const getReactSelectControlStyle = (provided: any, state: any) => {
    if (field.error && !state.menuIsOpen) {
      return {
        ...provided,
        borderColor: '#dc3545 !important',
      }
    } else {
      return provided;
    }
  }

  return (
    <div className='form-group'>
      <Label inputName={props.name} label={props.label} requiredAsterisk={props.requiredAsterisk} />
      <Select
        name={props.name}
        isMulti={false}
        value={selectedOption}
        onChange={option => onSelectChange(option, true)}
        options={props.options}
        isDisabled={props.disabled}
        styles={{ control: getReactSelectControlStyle }}
      />
      <ErrorMessage error={field.error} />
    </div>
  );
};

export default RruSelectInput;

