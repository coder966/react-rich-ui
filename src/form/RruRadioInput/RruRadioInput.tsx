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

import React, { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Label from '../Label/Label';
import RruRadioInputProps from './types/RruRadioInputProps';


const RruRadioInput: FC<RruRadioInputProps> = (props) => {
  const formContext = useFormContext();

  return (
    <div className='form-group'>
      <Label inputName={props.name} label={props.label} requiredAsterisk={props.requiredAsterisk} />
      <div className={props.inline ? 'form-check-inline' : undefined}>
        {props.options.map((o) => (
          <div key={`${props.name}_${o.value}`} className={'form-check' + props.disabled ? ' disabled' : undefined}>
            <input
              {...props}
              type='radio'
              ref={formContext.register}
              name={props.name}
              value={o.value}
              id={`${props.name}_${o.value}`}
            />
            <label className='form-check-label' htmlFor={`${props.name}_${o.value}`}>
              {o.label}
            </label>
          </div>
        ))}
      </div>
      <ErrorMessage inputName={props.name} />
    </div>
  );
};

export default RruRadioInput;

