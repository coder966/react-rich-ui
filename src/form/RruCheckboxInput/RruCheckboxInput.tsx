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
import RruCheckboxInputProps from './types/RruCheckboxInputProps';

const RruCheckboxInput: FC<RruCheckboxInputProps> = (props) => {
  const [value, setValue] = useState<boolean>(false);

  const field = useField(props.name, (serializedValue) => {
    if (!deepEqual(serializedValue, value)) {
      setValue(serializedValue);
    }
  });

  const setNewValue = (val: boolean) => {
    field.setValue(val);
    setValue(val);

    if (props.onChange) {
      props.onChange(val);
    }
  };

  useEffect(() => {
    field.register((initialValue) => {
      setNewValue(Boolean(initialValue));
    });

    return () => field.unregister();
  }, []);

  return (
    <div className='form-group' data-field-name={props.name} data-field-value={value}>
      <div className={`form-check ${props.isSwitch ? 'form-switch' : ''}`} role='checkbox' aria-checked={value}>
        <Label label={props.label}>
          <input
            name={props.name}
            checked={value}
            onChange={(e) => setNewValue(e.target.checked)}
            onBlur={field.onBlur}
            type='checkbox'
            className={'form-check-input ' + (field.error ? 'is-invalid' : '')}
            disabled={props.disabled}
          />
        </Label>
      </div>
      <ErrorMessage error={field.error} />
    </div>
  );
};

export default RruCheckboxInput;
