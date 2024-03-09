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
import RruTextInputProps from './types/RruTextInputProps';

const RruTextInput: FC<RruTextInputProps> = (props) => {
  const [value, setValue] = useState<string | null>(null);

  const field = useField(props.name, (serializedValue) => {
    if (serializedValue !== value) {
      setValue(serializedValue);
    }
  });

  const setNewValue = (val: string | null) => {
    field.setValue(val);
    setValue(val);

    if (props.onChange) {
      props.onChange(val);
    }
  };

  useEffect(() => {
    field.register((initialValue) => {
      setNewValue(initialValue === undefined ? null : initialValue);
    });

    return () => field.unregister();
  }, []);

  return (
    <div className='form-group' data-field-name={props.name} data-field-value={value}>
      <Label label={props.label} requiredAsterisk={props.requiredAsterisk}></Label>
      <input
        name={props.name}
        value={value || ''}
        onChange={(e) => setNewValue(e.target.value)}
        onBlur={field.onBlur}
        type={props.isPassword ? 'password' : 'text'}
        className={`form-control ${field.error ? 'is-invalid' : ''}`}
        disabled={props.disabled}
        dir={props.dir || 'auto'}
        placeholder={props.placeholder}
        maxLength={props.maxLength}
        autoComplete={props.autoComplete}
        list={props.list}
      />
      <ErrorMessage error={field.error} />
    </div>
  );
};

export default RruTextInput;
