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
import { RruForm, RruTextInput, useRruForm } from '../src/index';

const storyMeta: Meta = {
  title: 'Form: RruTextInput',
};

export default storyMeta;

export const Basic = (args) => {
  const initialValues = {
    email: 'sample@test.com',
  };

  const yupValidationSchema = yup.object().shape({
    email: yup
      .string()
      .nullable()
      .required('Email is required')
      .matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,7}$/, 'Email is incorrect'),
  });

  const onSubmit = (form) => {
    action('submitting the form')(form);
  };

  return (
    <RruForm initialValues={initialValues} yupValidationSchema={yupValidationSchema} onSubmit={onSubmit}>
      <RruTextInput name='email' label='Email' requiredAsterisk autoComplete='email' />
      <button type='submit' className='btn btn-primary mt-4'>
        Submit
      </button>
    </RruForm>
  );
};

export const Password = (args) => {
  const initialValues = {};

  const yupValidationSchema = yup.object().shape({});

  const onSubmit = (form) => {
    action('submitting the form')(form);
  };

  return (
    <RruForm initialValues={initialValues} yupValidationSchema={yupValidationSchema} onSubmit={onSubmit}>
      <RruTextInput name='password' label='Password' isPassword requiredAsterisk />
      <button type='submit' className='btn btn-primary mt-4'>
        Submit
      </button>
    </RruForm>
  );
};

export const SetValueProgrammatically = (args) => {
  const rruFormContext1 = useRruForm();
  const rruFormContext2 = useRruForm();

  const initialValues = {
    email: 'sample@test.com',
  };

  const yupValidationSchema = yup.object().shape({
    email: yup
      .string()
      .nullable()
      .required('Email is required')
      .matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,7}$/, 'Email is incorrect'),
  });

  const onSubmit1 = (form) => {
    action('submitting the form 1')(form);
  };

  const onSubmit2 = (form) => {
    action('submitting the form 2')(form);
  };

  const triggerManualAccess1 = () => {
    action('trigger manual access 1')();
    action('>>> 1')(rruFormContext1.getFieldValue('email'));
    action('<<< 1')('1111@form.test');
    rruFormContext1.setFieldValue('email', '1111@form.test');
  };

  const triggerManualAccess2 = () => {
    action('trigger manual access 2')();
    action('>>> 2')(rruFormContext2.getFieldValue('email'));
    action('<<< 2')('2222@form.test');
    rruFormContext2.setFieldValue('email', '2222@form.test');
  };

  return (
    <div>
      <RruForm
        context={rruFormContext1}
        initialValues={initialValues}
        yupValidationSchema={yupValidationSchema}
        onSubmit={onSubmit1}>
        <RruTextInput name='email' label='Email' requiredAsterisk autoComplete='email' />

        <button className='btn btn-primary mt-4 me-4' onClick={triggerManualAccess1}>
          Trigger manual access
        </button>

        <button type='submit' className='btn btn-primary mt-4'>
          Submit
        </button>
      </RruForm>

      <RruForm
        context={rruFormContext2}
        initialValues={initialValues}
        yupValidationSchema={yupValidationSchema}
        onSubmit={onSubmit2}>
        <RruTextInput name='email' label='Email' requiredAsterisk autoComplete='email' />

        <button className='btn btn-primary mt-4 me-4' onClick={triggerManualAccess2}>
          Trigger manual access
        </button>

        <button type='submit' className='btn btn-primary mt-4'>
          Submit
        </button>
      </RruForm>
    </div>
  );
};
