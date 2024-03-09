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
import { RruFileInput, RruForm } from '../src/index';

const storyMeta: Meta = {
  title: 'Form: RruFileInput',
};

export default storyMeta;

export const Basic = (args) => {
  const initialValues = {
    attachment: {
      name: 'test-initial.png',
    },
  };

  const yupValidationSchema = yup.object().shape({
    attachment: yup
      .mixed()
      .nullable()
      .test('test is file present', 'Attachment is required', (file) => {
        return file !== null;
      })
      .test('test is file size too big', 'File size is too big', (file) => {
        return file !== null && (file as File).size != null ? (file as File).size < 100 * 1024 : true; // 100 kB
      }),
  });

  const onSubmit = (form) => {
    action('submitting the form')(form);
  };

  return (
    <RruForm initialValues={initialValues} yupValidationSchema={yupValidationSchema} onSubmit={onSubmit}>
      <RruFileInput name='attachment' label='Attachment' chooseFileLabel='Select' accept='image/*,.pdf' />
      <button type='submit' className='btn btn-primary mt-4'>
        Submit
      </button>
    </RruForm>
  );
};
