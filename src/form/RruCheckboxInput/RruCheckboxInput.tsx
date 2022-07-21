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
import RruCheckboxInputProps from './types/RruCheckboxInputProps';

const RruCheckboxInput: FC<RruCheckboxInputProps> = (props) => {
  const formContext = useFormContext();

  return (
    <div className='form-group'>
      <div className='custom-control custom-checkbox m-1'>
        <input
          {...props}
          id={'checkbox_' + props.name}
          name={props.name}
          ref={formContext.register}
          type='checkbox'
          className={'custom-control-input ' + (formContext.errors[props.name] ? 'is-invalid' : '')}
        />
        <label htmlFor={'checkbox_' + props.name} className='custom-control-label'>
          {props.label}
        </label>
      </div>
      <ErrorMessage inputName={props.name} />
    </div>
  );
};

export default RruCheckboxInput;
