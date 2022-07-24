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
import Select from 'react-select';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Label from '../Label/Label';
import RruOption from '../types/RruOption';
import RruSelectInputProps from './types/RruSelectInputProps';

const RruSelectInput: FC<RruSelectInputProps> = (props) => {
  const formContext = useFormContext();
  const [hasBeenInitialized, setHasBeenInitialized] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<RruOption | null>(null);

  const findOption = (optionValue: any): RruOption | null => {
    return props.options.find(opt => opt.value + '' === optionValue + '') || null;
  }

  const onSelectChange = (option: RruOption | null) => {
    setSelectedOption(option);
    formContext.setValue(props.name, option ? option.value : null);
  };

  useEffect(() => {
    formContext.register({ name: props.name });
    const initialValue = formContext.getValues()[props.name];
    const option = findOption(initialValue);
    onSelectChange(option);
    setHasBeenInitialized(true);
  }, []);

  useEffect(() => {
    if (hasBeenInitialized) {
      const option = findOption(selectedOption?.value);
      onSelectChange(option);
    }
  }, [props.options]);

  return (
    <div className='form-group'>
      <Label inputName={props.name} label={props.label} requiredAsterisk={props.requiredAsterisk} />
      <Select
        name={props.name}
        isMulti={false}
        isDisabled={props.disabled}
        value={selectedOption}
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

