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
import React, { useState } from 'react';
import * as yup from 'yup';
import {
  RruForm, RruSelectInput, RruTextInput
} from '../src/index';

const storyMeta: Meta = {
  title: 'Form: RruForm',
};

export default storyMeta;

export const Basic = (args) => {
  const onSubmit = form => {
    action('submitting the form')(form);
  };

  return (
    <RruForm onSubmit={onSubmit}>
      <RruTextInput name='firstName' label='First Name' />
      <button type='submit' className='btn btn-primary mt-4'>Submit</button>
    </RruForm>
  );

};

export const WithInitialValues = (args) => {
  const initialValues = {
    firstName: 'Khalid'
  }

  const onSubmit = form => {
    action('submitting the form')(form);
  };

  return (
    <RruForm initialValues={initialValues} onSubmit={onSubmit}>
      <RruTextInput name='firstName' label='First Name' />
      <button type='submit' className='btn btn-primary mt-4'>Submit</button>
    </RruForm>
  );

};

export const OnChange = (args) => {
  const [color, setColor] = useState<string | null>(null);

  const colors = [
    { value: 'RED', label: 'Red' },
    { value: 'BLUE', label: 'Blue' },
    { value: 'GREEN', label: 'Green' },
  ];

  const initialValues = {
    color: 'BLUE'
  }

  const yupValidationSchema = yup.object().shape({

  });

  const onSubmit = form => {
    action('submitting the form')(form);
  };

  return (
    <RruForm initialValues={initialValues} yupValidationSchema={yupValidationSchema} onSubmit={onSubmit}>
      <RruSelectInput name='color' label='Color' options={colors} onChange={setColor} />
      {color === 'GREEN' && <p>Great choice.</p>}
      <button type='submit' className='btn btn-primary mt-4'>Submit</button>
    </RruForm>
  );

};

export const MultipleFieldsInOneForm = (args) => {

  const yupValidationSchema = yup.object().shape({
    firstName: yup.string().nullable().required('Required').min(3),
    secondName: yup.string().nullable().required('Required').min(3),
  });

  const onSubmit = form => {
    action('submitting the form')(form);
  };

  return (
    <RruForm yupValidationSchema={yupValidationSchema} onSubmit={onSubmit}>
      <div className='row'>
        <div className='col-6'>
          <RruTextInput name='firstName' label='First Name' />
        </div>
        <div className='col-6'>
          <RruTextInput name='secondName' label='Second Name' />
        </div>
      </div>
      <div className='row'>
        <div className='col-6'>
          <RruTextInput name='thirdName' label='Third Name' />
        </div>
        <div className='col-6'>
          <RruTextInput name='lastName' label='Last Name' />
        </div>
      </div>
      <button type='submit' className='btn btn-primary mt-4'>Submit</button>
    </RruForm>
  );

};

export const UnmountedFieldsShouldNotAppearInFormSubmit = (args) => {
  const [firstName, setFirstName] = useState<string | null>();

  const initialValues = {
    firstName: 'some first name',
    lastName: 'test default value'
  }

  const onSubmit = form => {
    action('submitting the form')(form);
  };

  const shouldRenderLastName = () => {
    return firstName !== 'khalid';
  }

  return (
    <div>
      <p>Type 'khalid' in the first name to hide the last name.</p>
      <RruForm initialValues={initialValues} onSubmit={onSubmit}>
        <div className='row'>
          <div className='col-6'>
            <RruTextInput name='firstName' label='First Name' onChange={setFirstName} />
          </div>
          {shouldRenderLastName() &&
            <div className='col-6'>
              <RruTextInput name='lastName' label='Last Name' />
            </div>
          }
        </div>
        <button type='submit' className='btn btn-primary mt-4'>Submit</button>
      </RruForm>
    </div>
  );

};

export const MultipleFormsInOnePage = (args) => {

  const initialValues1 = {
    name: 'Khalid',
  }

  const initialValues2 = {
    favoriteNumber: '10',
  }

  const yupValidationSchema1 = yup.object().shape({
    name: yup.string().min(3).max(10),
  });

  const yupValidationSchema2 = yup.object().shape({
    favoriteNumber: yup.number().min(0),
  });

  const onSubmit1 = form => {
    action('submitting the form 1')(form);
  };

  const onSubmit2 = form => {
    action('submitting the form 2')(form);
  };

  return (
    <>
      <RruForm initialValues={initialValues1} yupValidationSchema={yupValidationSchema1} onSubmit={onSubmit1}>
        <RruTextInput name='name' label='Name' />
        <button type='submit' className='btn btn-primary mt-4'>Submit</button>
      </RruForm>
      <br></br>
      <RruForm initialValues={initialValues2} yupValidationSchema={yupValidationSchema2} onSubmit={onSubmit2}>
        <RruTextInput name='favoriteNumber' label='Favorite Number' />
        <button type='submit' className='btn btn-primary mt-4'>Submit</button>
      </RruForm>
    </>
  );

};
