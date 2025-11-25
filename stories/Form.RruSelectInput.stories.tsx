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
import { RruForm, RruSelectInput } from '../src/index';
import colorsOptions from './data/colorsOptions';
import groupedAnimalsAndColorsOptions from './data/groupedAnimalsAndColorsOptions';
import largeOptionsList from './data/largeOptionsList';

const storyMeta: Meta = {
  title: 'Form: RruSelectInput',
};

export default storyMeta;

export const Basic = (args) => {
  const initialValues = {
    color: 'BLUE',
  };

  const yupValidationSchema = yup.object().shape({
    color: yup.string().nullable().required('You must select a color'),
  });

  const onSubmit = (form) => {
    action('submitting the form')(form);
  };

  return (
    <RruForm initialValues={initialValues} yupValidationSchema={yupValidationSchema} onSubmit={onSubmit}>
      <RruSelectInput name='color' label='Color' options={colorsOptions} />
      <button type='submit' className='btn btn-primary mt-4'>
        Submit
      </button>
    </RruForm>
  );
};

export const Grouped = (args) => {
  const initialValues = {
    myChoice: 'CAT',
  };

  const yupValidationSchema = yup.object().shape({
    myChoice: yup.string().nullable().required('You must select one'),
  });

  const onSubmit = (form) => {
    action('submitting the form')(form);
  };

  return (
    <RruForm initialValues={initialValues} yupValidationSchema={yupValidationSchema} onSubmit={onSubmit}>
      <RruSelectInput name='myChoice' label='Choose your favourite' options={groupedAnimalsAndColorsOptions} />
      <button type='submit' className='btn btn-primary mt-4'>
        Submit
      </button>
    </RruForm>
  );
};

export const LargeDataset = (args) => {
  const initialValues = {
    option: 350,
  };

  const yupValidationSchema = yup.object().shape({
    option: yup.string().nullable().required('You must select an option'),
  });

  const onSubmit = (form) => {
    action('submitting the form')(form);
  };

  return (
    <RruForm initialValues={initialValues} yupValidationSchema={yupValidationSchema} onSubmit={onSubmit}>
      <RruSelectInput name='option' label='Options' options={largeOptionsList} />
      <button type='submit' className='btn btn-primary mt-4'>
        Submit
      </button>
    </RruForm>
  );
};

export const Disabled = (args) => {
  const initialValues = {
    color: 'BLUE',
  };

  const onSubmit = (form) => {
    action('submitting the form')(form);
  };

  return (
    <RruForm initialValues={initialValues} onSubmit={onSubmit}>
      <RruSelectInput name='color' label='Color' options={colorsOptions} disabled={true}/>
      <button type='submit' className='btn btn-primary mt-4'>
        Submit
      </button>
    </RruForm>
  );
};
