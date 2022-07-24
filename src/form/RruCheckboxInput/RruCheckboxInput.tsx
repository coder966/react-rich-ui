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
import RruCheckboxInputProps from './types/RruCheckboxInputProps';

const RruCheckboxInput: FC<RruCheckboxInputProps> = (props) => {
  const [value, setValue] = useState<boolean>();
  const formContext = useFormContext();

  const setNewValue = (val: boolean) => {
    formContext.setValue(props.name, val);
    setValue(val);
  }

  useEffect(() => {
    formContext.register(props.name);
    const initialValue = Boolean(formContext.getValues()[props.name]);
    setNewValue(initialValue);
  }, []);

  return (
    <div className='form-group'>
      <div className='form-check'>
        <input
          {...props}
          id={'checkbox_' + props.name}
          name={props.name}
          checked={value}
          onChange={e => setNewValue(e.target.checked)}
          type='checkbox'
          className={'form-check-input ' + (formContext.errors[props.name] ? 'is-invalid' : '')}
        />
        <label htmlFor={'checkbox_' + props.name} className='form-check-label'>
          {props.label}
        </label>
      </div>
      <ErrorMessage inputName={props.name} />
    </div>
  );
};

export default RruCheckboxInput;
