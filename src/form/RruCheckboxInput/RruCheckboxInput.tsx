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
import { useField } from '../hooks/useField';
import RruCheckboxInputProps from './types/RruCheckboxInputProps';

const RruCheckboxInput: FC<RruCheckboxInputProps> = (props) => {
  const [value, setValue] = useState<boolean>(false);
  const field = useField(props.name);

  const setNewValue = (val: boolean, touched: boolean) => {
    field.setValue(val, touched);
    setValue(val);

    if (props.onChange) {
      props.onChange(val);
    }
  }

  useEffect(() => {
    field.register();
    const initialValue = Boolean(field.getValue());
    setNewValue(initialValue, false);

    return () => field.unregister();
  }, []);

  return (
    <div className='form-group'>
      <div className='form-check'>
        <input
          id={'checkbox_' + props.name}
          name={props.name}
          checked={value}
          onChange={e => setNewValue(e.target.checked, true)}
          type='checkbox'
          className={'form-check-input ' + (field.error ? 'is-invalid' : '')}
          disabled={props.disabled}
        />
        <label htmlFor={'checkbox_' + props.name} className='form-check-label'>
          {props.label}
        </label>
      </div>
      <ErrorMessage error={field.error} />
    </div>
  );
};

export default RruCheckboxInput;
