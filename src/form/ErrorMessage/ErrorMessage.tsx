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

import { FC } from 'react';
import './style.css';

export interface ErrorMessageProps {
  error: any;
}

const ErrorMessage: FC<ErrorMessageProps> = (props) => {
  if (!props.error?.message) {
    return <div className='error-message-container empty' />;
  }

  return (
    <div className='error-message-container'>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='12'
        height='12'
        viewBox='0 0 24 24'
        fill='none'
        stroke='#b42318'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
        className='error-message-icon'>
        <circle cx='12' cy='12' r='10' />
        <line x1='12' x2='12' y1='8' y2='12' />
        <line x1='12' x2='12.01' y1='16' y2='16' />
      </svg>

      <span className='error'>{props.error.message}</span>
    </div>
  );
};

export default ErrorMessage;
