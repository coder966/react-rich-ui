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
import { deepEqual } from '../../utils/utils';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Label from '../Label/Label';
import { useField } from '../hooks/useField';
import './style.css';
import RruFileInputProps from './types/RruFileInputProps';

const RruFileInput: FC<RruFileInputProps> = (props) => {
  const [value, setValue] = useState<any>(null);
  const [key, setKey] = useState<number>(0);

  const field = useField(props.name, (serializedValue) => {
    if (!deepEqual(serializedValue, value)) {
      setValue(serializedValue);
    }
  });

  // init
  useEffect(() => {
    field.register((initialValue) => {
      setNewValue(initialValue !== undefined ? initialValue : null);
    });

    return () => field.unregister();
  }, []);

  const setNewValue = (newValue: any) => {
    if (newValue && newValue instanceof FileList) {
      newValue = newValue[0];
    }

    field.setValue(newValue);
    setValue(newValue);

    if (props.onChange) {
      props.onChange(newValue);
    }
  };

  const getLabel = () => {
    let label = value ? value.name : props.chooseFileLabel ?? 'Choose File';
    return label === undefined || label === null || label.trim() === '' ? ' ' : label;
  };

  return (
    <div className='form-group' data-field-name={props.name} data-field-value={value} data-field-error={field.error ? field.error.message : ''}>
      <Label label={props.label} requiredAsterisk={props.requiredAsterisk}></Label>
      <label style={{ display: 'block' }}>
        <div className={`form-control rru-file-input__file-name-label ${field.error ? 'is-invalid' : ''}`}>
          {getLabel()}
        </div>
        <input
          key={props.shouldTriggerOnChangeOnSameFile ? key : 0}
          aria-label='Upload'
          type='file'
          className={`form-control rru-file-input__actual-input ${field.error ? 'is-invalid' : ''}`}
          name={props.name}
          onChange={(e) => {
            setNewValue(e.target.files);
            setKey(k => k + 1);
          }}
          onBlur={field.onBlur}
          disabled={props.disabled}
          accept={props.accept}
        />
      </label>
      <ErrorMessage error={field.error} />
    </div>
  );
};

export default RruFileInput;
