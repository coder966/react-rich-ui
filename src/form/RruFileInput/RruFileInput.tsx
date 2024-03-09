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
import Label from '../Label/Label';
import { useField } from '../hooks/useField';
import './style.css';
import RruFileInputProps from './types/RruFileInputProps';

const RruFileInput: FC<RruFileInputProps> = (props) => {
  const [value, setValue] = useState<any>(null);

  const field = useField(props.name, (serializedValue) => {
    if (serializedValue !== value) {
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

  return (
    <div className='form-group'>
      <Label label={props.label} requiredAsterisk={props.requiredAsterisk}></Label>
      <label style={{ display: 'block' }}>
        <div className={`form-control rru-file-input__file-name-label ${field.error ? 'is-invalid' : ''}`}>
          {value ? value.name : props.chooseFileLabel ?? 'Choose File'}
        </div>
        <input
          aria-label='Upload'
          type='file'
          className={`form-control rru-file-input__actual-input ${field.error ? 'is-invalid' : ''}`}
          name={props.name}
          onChange={(e) => setNewValue(e.target.files)}
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
