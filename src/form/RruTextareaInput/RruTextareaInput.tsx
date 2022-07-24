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
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Label from '../Label/Label';
import RruTextareaInputProps from './types/RruTextareaInputProps';

const RruTextareaInput: FC<RruTextareaInputProps> = (props) => {
  const [value, setValue] = useState<string | null>(null);
  const formContext = useFormContext();

  const setNewValue = (val: string | null) => {
    formContext.setValue(props.name, val);
    setValue(val);

    if (props.onChange) {
      props.onChange(val);
    }
  }

  useEffect(() => {
    formContext.register(props.name);
    const initialValue = formContext.getValues()[props.name];
    setNewValue(initialValue || null);

    return () => formContext.unregister(props.name);
  }, []);

  return (
    <div className='form-group'>
      <Label inputName={props.name} label={props.label} requiredAsterisk={props.requiredAsterisk} />
      <textarea
        name={props.name}
        value={value || undefined}
        onChange={e => setNewValue(e.target.value)}
        className={`form-control ${formContext.errors[props.name] ? 'is-invalid' : ''}`}
        disabled={props.disabled}
        placeholder={props.placeholder}
        maxLength={props.maxLength}
        autoComplete={props.autoComplete}
        rows={props.rows}
        cols={props.cols}
        wrap={props.wrap}
      />
      <ErrorMessage inputName={props.name} />
    </div>
  );
};

export default RruTextareaInput;

