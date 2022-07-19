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
      <button type='submit'>Submit</button>
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
      <button type='submit'>Submit</button>
    </RruForm>
  );

};

export const Watcher = (args) => {
  const [color, setColor] = useState();

  const colors = [
    { value: 'RED', label: 'Red' },
    { value: 'BLUE', label: 'Blue' },
    { value: 'GREEN', label: 'Green' },
  ];

  const initialValues = {
    color: 'BLUE'
  }

  const validationSchema = yup.object().shape({

  });

  const watcher = form => {
    setColor(form.color);
  };

  const onSubmit = form => {
    action('submitting the form')(form);
  };

  return (
    <RruForm initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} watch={['color']} watcher={watcher}>
      <RruSelectInput name='color' label='Color' options={colors} />
      {color === 'GREEN' && <p>Great choice.</p>}
      <button type='submit'>Submit</button>
    </RruForm>
  );

};

export const TwoFormsInOnePage = (args) => {

  const initialValues1 = {
    name: 'Khalid',
  }

  const initialValues2 = {
    favoriteNumber: '10',
  }

  const validationSchema1 = yup.object().shape({
    name: yup.string().min(3).max(10),
  });

  const validationSchema2 = yup.object().shape({
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
      <RruForm initialValues={initialValues1} validationSchema={validationSchema1} onSubmit={onSubmit1}>
        <RruTextInput name='name' label='Name' />
        <button type='submit'>Submit</button>
      </RruForm>
      <br></br>
      <RruForm initialValues={initialValues2} validationSchema={validationSchema2} onSubmit={onSubmit2}>
        <RruTextInput name='favoriteNumber' label='Favorite Number' />
        <button type='submit'>Submit</button>
      </RruForm>
    </>
  );

};
