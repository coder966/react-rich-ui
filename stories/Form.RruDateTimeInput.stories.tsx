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
import * as yup from 'yup';
import { RruDateTimeInput, RruForm } from '../src/index';
import { RruSelectInput } from '../src';
import calendarTypeOptions from './data/calendarTypeOptions.ts';
import { useState } from 'react';

const storyMeta: Meta = {
  title: 'Form: RruDateTimeInput',
};

export default storyMeta;

export const Date = (args) => {
  const initialValues = {
    birthDate: '2020-07-01',
  };

  const yupValidationSchema = yup.object().shape({
    birthDate: yup
      .date()
      .nullable()
      .required('The date is required')
      .min('2020-01-01', 'The date is too old')
      .max('2024-01-01', 'The date is too new'),
  });

  const getDateConfig = (date: string) => {
    if (date === '2022-07-12') {
      return { disabled: true };
    }
    if (date === '2022-07-13') {
      return { style: { color: 'red' } };
    }
    if (date === '2022-07-14') {
      return { className: 'my-custom-class-1' };
    }
    return null;
  };

  const onSubmit = (form) => {
    action('submitting the form')(form);
  };

  return (
    <RruForm initialValues={initialValues} yupValidationSchema={yupValidationSchema} onSubmit={onSubmit}>
      <RruDateTimeInput
        mode='date'
        name='birthDate'
        label='Birth Date'
        getDateConfig={getDateConfig}
        onChange={console.log}
      />
      <button type='submit' className='btn btn-primary mt-4'>
        Submit
      </button>
    </RruForm>
  );
};

export const DateTime = (args) => {
  const initialValues = {
    birthDate: '2020-07-01 15:10:00',
  };

  const yupValidationSchema = yup.object().shape({
    birthDate: yup
      .date()
      .nullable()
      .required('The date is required')
      .min('2020-01-01', 'The date is too old')
      .max('2024-01-01', 'The date is too new'),
  });

  const getDateConfig = (date: string) => {
    if (date === '2022-07-12') {
      return { disabled: true };
    }
    return null;
  };

  const onSubmit = (form) => {
    action('submitting the form')(form);
  };

  return (
    <RruForm initialValues={initialValues} yupValidationSchema={yupValidationSchema} onSubmit={onSubmit}>
      <RruDateTimeInput
        mode='datetime'
        name='birthDate'
        label='Birth Date'
        getDateConfig={getDateConfig}
        onChange={console.log}
      />
      <button type='submit' className='btn btn-primary mt-4'>
        Submit
      </button>
    </RruForm>
  );
};

export const ChangeCalType = (args) => {
  const [calType, setCalType] = useState<string>('gregorian');

  const initialValues = {
    birthDate: '2020-07-01',
  };

  const yupValidationSchema = yup.object().shape({
    birthDate: yup
      .date()
      .nullable()
      .required('The date is required')
      .min('2020-01-01', 'The date is too old')
      .max('2024-01-01', 'The date is too new'),
  });

  const getDateConfig = (date: string) => {
    if (date === '2022-07-12') {
      return { disabled: true };
    }
    return null;
  };

  const onSubmit = (form) => {
    action('submitting the form')(form);
  };

  return (
    <RruForm initialValues={initialValues} yupValidationSchema={yupValidationSchema} onSubmit={onSubmit}>
      <RruSelectInput name={'calendarType'} label='Calendar Type' options={calendarTypeOptions} onChange={(val) => setCalType(val)} />
      <RruDateTimeInput
        mode='date'
        name='birthDate'
        label='Birth Date'
        calendarType={calType}
        getDateConfig={getDateConfig}
        onChange={console.log}
      />
      <button type='submit' className='btn btn-primary mt-4'>
        Submit
      </button>
    </RruForm>
  );
};
