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

export interface ErrorMessageProps {
  /**  */
  inputName: string;
}

const ErrorMessage: FC<ErrorMessageProps> = (props) => {
  const formContext = useFormContext();
  const error = formContext.getFieldState(props.inputName).error;

  return error ? (
    <div className='invalid-feedback d-block'>{error.message}</div>
  ) : null;
};

export default ErrorMessage;
