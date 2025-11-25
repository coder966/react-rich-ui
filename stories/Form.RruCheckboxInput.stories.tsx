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

import { action } from 'storybook/actions';
import { Meta } from '@storybook/react-vite';
import * as yup from 'yup';
import { RruCheckboxInput, RruForm } from '../src/index';

const storyMeta: Meta = {
  title: 'Form: RruCheckboxInput',
};

export default storyMeta;

export const Basic = (args) => {
  const initialValues = {
    agreed: true,
  };

  const yupValidationSchema = yup.object().shape({
    agreed: yup.bool().isTrue('You must agree'),
  });

  const onSubmit = (form) => {
    action('submitting the form')(form);
  };

  return (
    <RruForm initialValues={initialValues} yupValidationSchema={yupValidationSchema} onSubmit={onSubmit}>
      <RruCheckboxInput name='agreed' label='Agree' />
      <button type='submit' className='btn btn-primary mt-4'>
        Submit
      </button>
    </RruForm>
  );
};

export const Switch = (args) => {
  const initialValues = {
    agreed: true,
  };

  const yupValidationSchema = yup.object().shape({
    agreed: yup.bool().isTrue('You must agree'),
  });

  const onSubmit = (form) => {
    action('submitting the form')(form);
  };

  return (
    <RruForm initialValues={initialValues} yupValidationSchema={yupValidationSchema} onSubmit={onSubmit}>
      <RruCheckboxInput name='agreed' label='Agree' isSwitch />
      <button type='submit' className='btn btn-primary mt-4'>
        Submit
      </button>
    </RruForm>
  );
};

export const Disabled = (args) => {
  const initialValues = {
    agreed: true,
  };

  const onSubmit = (form) => {
    action('submitting the form')(form);
  };

  return (
    <RruForm initialValues={initialValues} onSubmit={onSubmit}>
      <RruCheckboxInput name='agreed' label='Agree' disabled={true} />
      <button type='submit' className='btn btn-primary mt-4'>
        Submit
      </button>
    </RruForm>
  );
};

