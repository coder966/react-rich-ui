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
  RruForm, RruRadioInput
} from '../src/index';

const storyMeta: Meta = {
  title: 'Form: RruRadioInput',
};

export default storyMeta;

export const Basic = (args) => {

  const colors = [
    { value: 'RED', label: 'Red' },
    { value: 'BLUE', label: 'Blue' },
    { value: 'GREEN', label: 'Green' },
  ];

  const initialValues = {

  }

  const yupValidationSchema = yup.object().shape({
    // color: yup.string().nullable().required('You must select one')
  });

  const onSubmit = form => {
    action('submitting the form')(form);
  };

  return (
    <RruForm initialValues={initialValues} yupValidationSchema={yupValidationSchema} onSubmit={onSubmit}>
      <RruRadioInput name='color' label='Color' options={colors} />
      <button type='submit' className='btn btn-primary mt-4'>Submit</button>
    </RruForm>
  );

};

export const Inline = (args) => {

  const colors = [
    { value: 'RED', label: 'Red' },
    { value: 'BLUE', label: 'Blue' },
    { value: 'GREEN', label: 'Green' },
  ];

  const initialValues = {
    color: 'BLUE'
  }

  const yupValidationSchema = yup.object().shape({
    color: yup.string().nullable().required('You must select one')
  });

  const onSubmit = form => {
    action('submitting the form')(form);
  };

  return (
    <RruForm initialValues={initialValues} yupValidationSchema={yupValidationSchema} onSubmit={onSubmit}>
      <RruRadioInput name='color' label='Color' options={colors} inline={true} />
      <button type='submit' className='btn btn-primary mt-4'>Submit</button>
    </RruForm>
  );

};
