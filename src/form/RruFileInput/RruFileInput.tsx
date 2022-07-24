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

import React, { FC, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Label from '../Label/Label';
import RruFileInputProps from './types/RruFileInputProps';

const RruFileInput: FC<RruFileInputProps> = (props) => {
  const formContext = useFormContext();

  // init
  useEffect(() => {
    formContext.register({ name: props.name });
    formContext.setValue(props.name, null);

    return () => formContext.unregister(props.name);
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filesList = e.target.files;
    if (filesList && filesList[0]) {
      formContext.setValue(props.name, filesList[0]);
    } else {
      formContext.setValue(props.name, null);
    }
  }

  return (
    <div className='form-group'>
      <Label inputName={props.name} label={props.label} requiredAsterisk={props.requiredAsterisk} />
      <input
        aria-label='Upload'
        type='file'
        className={`form-control ${formContext.errors[props.name] ? 'is-invalid' : ''}`}
        name={props.name}
        onChange={onChange}
      />
      <ErrorMessage inputName={props.name} />
    </div>
  );
};

export default RruFileInput;

