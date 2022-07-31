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

import { action } from '@storybook/addon-actions';
import { Meta } from '@storybook/react';
import React from 'react';
import * as yup from 'yup';
import { RruForm, RruMultiSelectInput } from '../src/index';
import colorsOptions from './data/colorsOptions';

const storyMeta: Meta = {
  title: 'Form: RruMultiSelectInput',
};

export default storyMeta;

export const Basic = (args) => {
  const initialValues = {
    colors: ['RED', 'GREEN'],
  };

  const yupValidationSchema = yup.object().shape({
    colors: yup.array().min(1, 'You must select at least one').max(2, 'You cannot select more than two'),
  });

  const onSubmit = (form) => {
    action('submitting the form')(form);
  };

  return (
    <RruForm initialValues={initialValues} yupValidationSchema={yupValidationSchema} onSubmit={onSubmit}>
      <RruMultiSelectInput name='colors' label='Color' options={colorsOptions} />
      <button type='submit' className='btn btn-primary mt-4'>
        Submit
      </button>
    </RruForm>
  );
};
