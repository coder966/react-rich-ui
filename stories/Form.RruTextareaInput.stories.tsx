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
import {
  RruForm, RruTextareaInput
} from '../src/index';

const storyMeta: Meta = {
  title: 'Form: RruTextareaInput',
};

export default storyMeta;

export const Basic = (args) => {

  const initialValues = {

  }

  const validationSchema = yup.object().shape({
    content: yup.string().nullable()
      .min(5, 'The text is too short')
      .max(10, 'The text is too long'),
  });

  const onSubmit = form => {
    action('submitting the form')(form);
  };

  return (
    <RruForm initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      <RruTextareaInput name='content' label='Content' />
      <button type='submit'>Submit</button>
    </RruForm>
  );

};
