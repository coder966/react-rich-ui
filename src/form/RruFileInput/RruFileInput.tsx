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
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { useField } from '../hooks/useField';
import Label from '../Label/Label';
import RruFileInputProps from './types/RruFileInputProps';

const RruFileInput: FC<RruFileInputProps> = (props) => {
  const field = useField(props.name);

  // init
  useEffect(() => {
    field.register();
    field.setValue(null, false);

    return () => field.unregister();
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filesList = e.target.files;
    let file = null;
    if (filesList && filesList[0]) {
      file = filesList[0];
    }

    field.setValue(file, true);

    if (props.onChange) {
      props.onChange(file);
    }
  }

  return (
    <div className='form-group'>
      <Label inputName={props.name} label={props.label} requiredAsterisk={props.requiredAsterisk} />
      <input
        aria-label='Upload'
        type='file'
        className={`form-control ${field.error ? 'is-invalid' : ''}`}
        name={props.name}
        onChange={onChange}
        disabled={props.disabled}
        accept={props.accept}
      />
      <ErrorMessage inputName={props.name} />
    </div>
  );
};

export default RruFileInput;

