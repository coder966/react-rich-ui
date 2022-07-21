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
import RruMultiCheckboxInputProps from './types/RruMultiCheckboxInputProps';

const RruMultiCheckboxInput: FC<RruMultiCheckboxInputProps> = (props) => {
  const formContext = useFormContext();

  return (
    <div className='form-group'>
      <Label inputName={props.name} label={props.label} requiredAsterisk={props.requiredAsterisk} />
      {/* these hidden options are important because if options size is 1 then form submit result will be string instead of array with one item
            and if options size is zero then will result in false instead of an empty array */}
      <input
        id={`${props.name}_hidden1`}
        name={props.name}
        ref={formContext.register}
        value={'hidden1'}
        type='checkbox'
        disabled
        style={{ display: 'none' }}
      />
      <input
        id={`${props.name}_hidden2`}
        name={props.name}
        ref={formContext.register}
        value={'hidden2'}
        type='checkbox'
        disabled
        style={{ display: 'none' }}
      />
      <div className='row'>
        {props.options.map((o) => (
          <div key={`${props.name}_${o.value}`} className='col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3'>
            <div className='custom-control custom-checkbox m-1'>
              <input
                {...props}
                id={`${props.name}_${o.value}`}
                name={props.name}
                ref={formContext.register}
                value={o.value}
                type='checkbox'
                className='custom-control-input'
              />
              <label htmlFor={`${props.name}_${o.value}`} className='custom-control-label'>
                {o.label}
              </label>
            </div>
          </div>
        ))}
      </div>
      <ErrorMessage inputName={props.name} />
    </div>
  );
};

export default RruMultiCheckboxInput;

