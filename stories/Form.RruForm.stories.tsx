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
import { useState } from 'react';
import * as yup from 'yup';
import {
  RruCheckboxInput,
  RruDateTimeInput,
  RruFileInput,
  RruForm,
  RruMultiCheckboxInput,
  RruMultiSelectInput,
  RruRadioInput,
  RruSelectInput,
  RruTextareaInput,
  RruTextInput,
  useRruForm,
} from '../src/index';
import animalsOptions from './data/animalsOptions';
import colorsOptions from './data/colorsOptions';

const storyMeta: Meta = {
  title: 'Form: RruForm',
};

export default storyMeta;

export const Basic = (args) => {
  const onSubmit = (form) => {
    action('submitting the form')(form);
  };

  return (
    <RruForm onSubmit={onSubmit}>
      <RruTextInput name='firstName' label='First Name' />
      <button type='submit' className='btn btn-primary mt-4'>
        Submit
      </button>
    </RruForm>
  );
};

export const WithInitialValues = (args) => {
  const initialValues = {
    firstName: 'Khalid',
  };

  const onSubmit = (form) => {
    action('submitting the form')(form);
  };

  return (
    <RruForm initialValues={initialValues} onSubmit={onSubmit}>
      <RruTextInput name='firstName' label='First Name' />
      <button type='submit' className='btn btn-primary mt-4'>
        Submit
      </button>
    </RruForm>
  );
};

export const OnChange = (args) => {
  const [color, setColor] = useState<string | null>(null);

  const initialValues = {
    color: 'BLUE',
  };

  const yupValidationSchema = yup.object().shape({});

  const onSubmit = (form) => {
    action('submitting the form')(form);
  };

  return (
    <RruForm initialValues={initialValues} yupValidationSchema={yupValidationSchema} onSubmit={onSubmit}>
      <RruSelectInput name='color' label='Color' options={colorsOptions} onChange={setColor} />
      {color === 'GREEN' && <p>Great choice.</p>}
      <button type='submit' className='btn btn-primary mt-4'>
        Submit
      </button>
    </RruForm>
  );
};

export const MultipleFieldsInOneForm = (args) => {
  const yupValidationSchema = yup.object().shape({
    firstName: yup.string().nullable().required('Required').min(3),
    secondName: yup.string().nullable().required('Required').min(3),
  });

  const onSubmit = (form) => {
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
      <button type='submit' className='btn btn-primary mt-4'>
        Submit
      </button>
    </RruForm>
  );
};

export const UnmountedFieldsShouldNotAppearInFormSubmit = (args) => {
  const [firstName, setFirstName] = useState<string | null>();

  const initialValues = {
    firstName: 'some first name',
    lastName: 'test default value',
  };

  const onSubmit = (form) => {
    action('submitting the form')(form);
  };

  const shouldRenderLastName = () => {
    return firstName !== 'khalid';
  };

  return (
    <div>
      <p>Type 'khalid' in the first name to hide the last name.</p>
      <RruForm initialValues={initialValues} onSubmit={onSubmit}>
        <div className='row'>
          <div className='col-6'>
            <RruTextInput name='firstName' label='First Name' onChange={setFirstName} />
          </div>
          {shouldRenderLastName() && (
            <div className='col-6'>
              <RruTextInput name='lastName' label='Last Name' />
            </div>
          )}
        </div>
        <button type='submit' className='btn btn-primary mt-4'>
          Submit
        </button>
      </RruForm>
    </div>
  );
};

export const MultipleFormsInOnePage = (args) => {
  const initialValues1 = {
    name: 'Khalid',
  };

  const initialValues2 = {
    favoriteNumber: '10',
  };

  const yupValidationSchema1 = yup.object().shape({
    name: yup.string().min(3).max(10),
  });

  const yupValidationSchema2 = yup.object().shape({
    favoriteNumber: yup.number().min(0),
  });

  const onSubmit1 = (form) => {
    action('submitting the form 1')(form);
  };

  const onSubmit2 = (form) => {
    action('submitting the form 2')(form);
  };

  return (
    <>
      <RruForm initialValues={initialValues1} yupValidationSchema={yupValidationSchema1} onSubmit={onSubmit1}>
        <RruTextInput name='name' label='Name' />
        <button type='submit' className='btn btn-primary mt-4'>
          Submit
        </button>
      </RruForm>
      <br></br>
      <RruForm initialValues={initialValues2} yupValidationSchema={yupValidationSchema2} onSubmit={onSubmit2}>
        <RruTextInput name='favoriteNumber' label='Favorite Number' />
        <button type='submit' className='btn btn-primary mt-4'>
          Submit
        </button>
      </RruForm>
    </>
  );
};

export const SubmitButtonOutsideForm = (args) => {
  const onSubmit = (form) => {
    action('submitting the form')(form);
  };

  return (
    <div>
      <RruForm onSubmit={onSubmit} id='myForm'>
        <RruTextInput name='firstName' label='First Name' />
      </RruForm>
      <button type='submit' form='myForm' className='btn btn-primary mt-4'>
        Submit
      </button>
    </div>
  );
};

export const SubmitButtonAndNormalButton = (args) => {
  const onSubmit = (form) => {
    action('submitting the form')(form);
  };

  return (
    <div>
      <RruForm onSubmit={onSubmit} >
        <RruTextInput name='firstName' label='First Name' />
        <button type='submit' className='btn btn-primary m-4'>
          submit button
        </button>
        <button type='button' className='btn btn-primary m-4'>
          button-typed button
        </button>
        <button className='btn btn-primary m-4'>
          no type button
        </button>
      </RruForm>
    </div>
  );
};

export const NestedFields = (args) => {
  const initialValues = {
    name: 'Khalid',
    address: {
      city: 'Riyadh',
      street: 'Olya',
    },
  };

  const yupValidationSchema = yup.object().shape({
    name: yup.string().nullable().required().max(50),
    address: yup.object().shape({
      city: yup.string().nullable().required().max(50),
      street: yup.string().nullable().required().max(50),
    }),
    owner: yup.object().shape({
      item_12: yup.object().shape({
        name: yup.string().nullable().required().min(2).max(50),
        age: yup.number().nullable().required().min(18).max(50),
      }),
      item_16: yup.object().shape({
        name: yup.string().nullable().required().min(2).max(50),
        age: yup.number().nullable().required().min(18).max(50),
      }),
    }),
  });

  const context = useRruForm();

  const onSubmit = (form) => {
    action('submitting the form')(form);
    console.log('submitting the form', form);
    console.log('get preserve default', context.getFieldsValues());
    console.log('get preserve true', context.getFieldsValues());
    console.log('get a single nested field', context.getFieldValue('address.city'));
  };

  return (
    <RruForm
      context={context}
      initialValues={initialValues}
      yupValidationSchema={yupValidationSchema}
      onSubmit={onSubmit}>
      <RruTextInput name='name' label='Name' />

      <RruTextInput name='address.city' label='City' />
      <RruTextInput name='address.street' label='Street' />

      <h5>Owner 1</h5>
      <RruTextInput name='owner.item_12.name' label='Name' />
      <RruTextInput name='owner.item_12.age' label='Age' />

      <h5>Owner 2</h5>
      <RruTextInput name='owner.item_16.name' label='Name' />
      <RruTextInput name='owner.item_16.age' label='Age' />

      <button type='submit' className='btn btn-primary mt-4'>
        Submit
      </button>
    </RruForm>
  );
};

export const SetValueProgrammaticallyTwoForms = (args) => {
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

export const SetValueProgrammaticallyWithNulls = (args) => {
  const rruFormContext = useRruForm();

  const initialValues = {
    notes: 'old notes',
  };

  const yupValidationSchema = yup.object().shape({
    email: yup
      .string()
      .nullable()
      .required('Email is required')
      .matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,7}$/, 'Email is incorrect'),
    notes: yup.string().nullable().required('This field is required'),
  });

  const onSubmit = (form) => {
    action('submitting the form')(form);
  };

  const triggerManualAccess = () => {
    action('trigger manual access')();
    rruFormContext.setFieldValue('email', 'new@form.test');
    rruFormContext.setFieldValue('notes', null);
  };

  return (
    <RruForm
      context={rruFormContext}
      initialValues={initialValues}
      yupValidationSchema={yupValidationSchema}
      onSubmit={onSubmit}>
      <RruTextInput name='email' label='Email' requiredAsterisk autoComplete='email' />
      <RruTextareaInput name='notes' label='Notes' />

      <button className='btn btn-primary mt-4 me-4' onClick={triggerManualAccess}>
        Trigger manual access
      </button>

      <button type='submit' className='btn btn-primary mt-4'>
        Submit
      </button>
    </RruForm>
  );
};

export const SetValueProgrammaticallyNested = (args) => {
  const rruFormContext = useRruForm();

  const initialValues = {
    notes: 'old notes',
    address: {
      city: 'Riyadh',
      street: 'Olya',
    },
    hiddenSerial: {
      foo: 3,
      bar: 4,
    },
  };

  const onSubmit = (form) => {
    action('submitting the form')(form);
  };

  const triggerManualAccess = () => {
    action('trigger manual access')();
    action('current form')(rruFormContext.getFieldsValues());
    rruFormContext.setFieldValue('address.street', 'Tahliah St.');
    rruFormContext.setFieldValue('hiddenSerial', {
      month: 12,
      sales: 100_550,
    });
  };

  return (
    <RruForm context={rruFormContext} initialValues={initialValues} onSubmit={onSubmit}>
      <RruTextInput name='notes' label='Notes' />
      <RruTextInput name='address.city' label='City' />
      <RruTextInput name='address.street' label='Street' />

      <div style={{ height: 0, width: 0, overflow: 'hidden' }}>
        <RruTextInput name='hiddenSerial' />
      </div>

      <button className='btn btn-primary mt-4 me-4' onClick={triggerManualAccess}>
        Trigger manual access
      </button>

      <button type='submit' className='btn btn-primary mt-4'>
        Submit
      </button>
    </RruForm>
  );
};

export const SetValueProgrammaticallyAllTypes = (args) => {
  const rruFormContext = useRruForm();

  const initialValues = {
    email: 'sample@test.com',
    notes: 'old notes',
    color: 'RED',
    colors: ['RED'],
    animal: 'LION',
    animals: ['LION'],
    agree: false,
    birthDate: '1990-05-20',
    image: { name: 'cat.png', foo: '111', bar: 'test' },
  };

  const yupValidationSchema = yup.object().shape({
    email: yup
      .string()
      .nullable()
      .required('Email is required')
      .matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,7}$/, 'Email is incorrect'),
    notes: yup.string().nullable().required('This field is required'),
  });

  const onSubmit = (form) => {
    action('submitting the form')(form);
  };

  const triggerManualAccess = () => {
    action('trigger manual access')();
    rruFormContext.setFieldValue('email', 'new@form.test');
    rruFormContext.setFieldValue('notes', 'some new notes');
    rruFormContext.setFieldValue('color', 'BLUE');
    rruFormContext.setFieldValue('colors', ['BLUE', 'ORANGE']);
    rruFormContext.setFieldValue('animal', 'CAT');
    rruFormContext.setFieldValue('animals', ['CAT', 'DOG']);
    rruFormContext.setFieldValue('agree', true);
    rruFormContext.setFieldValue('birthDate', '2020-01-23');
    rruFormContext.setFieldValue('image', { name: 'lion.png', conf: '222' });
  };

  return (
    <RruForm
      context={rruFormContext}
      initialValues={initialValues}
      yupValidationSchema={yupValidationSchema}
      onSubmit={onSubmit}>
      <RruTextInput name='email' label='Email' requiredAsterisk autoComplete='email' />
      <RruTextareaInput name='notes' label='Notes' />
      <RruSelectInput name='color' label='Color' options={colorsOptions} />
      <RruMultiSelectInput name='colors' label='Colors' options={colorsOptions} />
      <RruRadioInput name='animal' label='Animal' options={animalsOptions} />
      <RruMultiCheckboxInput name='animals' label='Animals' options={animalsOptions} />
      <RruCheckboxInput name='agree' label='Agree' />
      <RruDateTimeInput mode='date' name='birthDate' label='Birth Date' />
      <RruFileInput name='image' label='Image' />

      <button className='btn btn-primary mt-4 me-4' onClick={triggerManualAccess}>
        Trigger manual access
      </button>

      <button type='submit' className='btn btn-primary mt-4'>
        Submit
      </button>
    </RruForm>
  );
};

export const ValidateFieldNames = (args) => {
  const rruFormContext = useRruForm();

  const onSubmit = (form) => {
    action('submitting the form')(form);
  };

  return (
    <RruForm
      context={rruFormContext}
      onSubmit={onSubmit}>

      <RruTextInput name='email' label='Email' requiredAsterisk />
      <RruTextInput name='color1' label='Email' requiredAsterisk />
      <RruTextInput name='animal.1' label='Email' requiredAsterisk />

      <button type='submit' className='btn btn-primary mt-4'>
        Submit
      </button>

    </RruForm>
  );
};
