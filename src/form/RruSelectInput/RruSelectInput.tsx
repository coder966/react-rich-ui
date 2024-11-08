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

import { FC, useEffect, useState } from 'react';
import { createFilter } from 'react-select';
import { AsyncPaginate } from 'react-select-async-paginate';
import { deepEqual } from '../../utils/utils';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Label from '../Label/Label';
import { useField } from '../hooks/useField';
import RruOption from '../types/RruOption';
import { findOption, loadPageOptions } from '../utils/options-utils';
import RruSelectInputProps from './types/RruSelectInputProps';

const RruSelectInput: FC<RruSelectInputProps> = (props) => {
  const [value, setValue] = useState<string | null>(null);

  const field = useField(props.name, (serializedValue) => {
    if (!deepEqual(serializedValue, value)) {
      setValue(serializedValue);

      if (!deepEqual(serializedValue, selectedOption?.value)) {
        setTimeout(() => {
          const option = findOption(props.options, serializedValue);
          onSelectChange(option);
        }, 0);
      }
    }
  });

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
    <div className='form-group' data-field-name={props.name} data-field-value={value}>
      <Label label={props.label} requiredAsterisk={props.requiredAsterisk}></Label>
      <AsyncPaginate
        name={props.name}
        isMulti={false}
        isClearable={true}
        placeholder={props.placeholder || ''}
        value={selectedOption}
        onChange={(option) => onSelectChange(option)}
        // @ts-ignore
        loadOptions={loadPageOptions(props.options)}
        additional={{ page: 1 }}
        filterOption={createFilter({ ignoreAccents: false })}
        onBlur={field.onBlur}
        isDisabled={props.disabled}
        styles={{ control: getReactSelectControlStyle }}
      />
      <ErrorMessage error={field.error} />
    </div>
  );
};

export default RruSelectInput;
