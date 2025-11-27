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

import { act, render, renderHook, waitFor } from '@testing-library/react';
import * as yup from 'yup';
import { RruForm, RruTextInput, useRruForm } from '../../src';
import { expectTypedTextIsRendered, submitForm, writeText } from '../__utils__/form-utils';

describe('RruTextInput', () => {
  it('should render correctly', async () => {
    // prepare
    const onSubmit = jest.fn();

    // render
    const { container } = render(
      <RruForm onSubmit={onSubmit}>
        <RruTextInput name='email' label='Email Address' dir='rtl' />
        <button type='submit'>Submit</button>
      </RruForm>
    );

    const emailInput = container.querySelector('input[name="email"]');

    expect(emailInput).toBeTruthy();
    expect(emailInput?.getAttribute('dir')).toEqual('rtl');
  });

  it('should submit the entered value', async () => {
    // prepare
    const onSubmit = jest.fn();

    // render
    const { container } = render(
      <RruForm onSubmit={onSubmit}>
        <RruTextInput name='email' label='Email Address' />
        <button type='submit'>Submit</button>
      </RruForm>
    );

    // fill the form
    await writeText(container, 'email', 'khalid@test.com');

    expectTypedTextIsRendered(container, 'email', 'khalid@test.com');

    // submit the form
    await submitForm(container);

    // validation
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit.mock.calls[0][0]).toEqual({
      email: 'khalid@test.com',
    });
  });

  it('should submit null for when no data is entered', async () => {
    // prepare
    const onSubmit = jest.fn();

    // render
    const { container } = render(
      <RruForm onSubmit={onSubmit}>
        <RruTextInput name='email' label='Email Address' />
        <button type='submit'>Submit</button>
      </RruForm>
    );

    // submit the form
    await submitForm(container);

    // validation
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit.mock.calls[0][0]).toEqual({
      email: null,
    });
  });

  it('should render and submit the initial value', async () => {
    // prepare
    const onSubmit = jest.fn();
    const initialValues = {
      email: 'khalid@test.com',
    };

    // render
    const { container } = render(
      <RruForm onSubmit={onSubmit} initialValues={initialValues}>
        <RruTextInput name='email' label='Email Address' />
        <button type='submit'>Submit</button>
      </RruForm>
    );

    // validate initial value is rendered inside the input field
    expectTypedTextIsRendered(container, 'email', 'khalid@test.com');

    // submit the form
    await submitForm(container);

    // validation
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit.mock.calls[0][0]).toEqual({
      email: 'khalid@test.com',
    });
  });

  it('should accept a new value after the initial value', async () => {
    // prepare
    const onSubmit = jest.fn();
    const initialValues = {
      email: 'khalid@test.com',
    };

    // render
    const { container } = render(
      <RruForm onSubmit={onSubmit} initialValues={initialValues}>
        <RruTextInput name='email' label='Email Address' />
        <button type='submit'>Submit</button>
      </RruForm>
    );

    // fill the form
    await writeText(container, 'email', 'mohammed@test.com');

    expectTypedTextIsRendered(container, 'email', 'mohammed@test.com');

    // submit the form
    await submitForm(container);

    // validation
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit.mock.calls[0][0]).toEqual({
      email: 'mohammed@test.com',
    });
  });

  it('should validate the input', async () => {
    // prepare
    const onSubmit = jest.fn();
    const yupValidationSchema = yup.object().shape({
      email: yup
        .string()
        .matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,7}$/, 'The email address is incorrect'),
    });

    // render
    const { container } = render(
      <RruForm onSubmit={onSubmit} yupValidationSchema={yupValidationSchema}>
        <RruTextInput name='email' label='Email Address' />
        <button type='submit'>Submit</button>
      </RruForm>
    );

    // fill the form with bad input
    await writeText(container, 'email', 'test_bad_email');


    // submit the form
    await submitForm(container);

    // validation for bad input
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(0);
      const formGroup = container.querySelector('[data-field-name="email"]');
      expect(formGroup?.getAttribute('data-field-error')).toBe('The email address is incorrect');
    });

    // write new good value
    await writeText(container, 'email', 'khalid@test.com');


    // submit the form
    await submitForm(container);

    // validation for valid input
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1);
      expect(onSubmit.mock.calls[0][0]).toEqual({
        email: 'khalid@test.com',
      });
    });
  });

  it('should watch the input', async () => {
    // prepare
    const onSubmit = jest.fn();
    const onEmailChange = jest.fn();
    const initialValues = {
      email: 'khalid@test.com',
    };

    // render
    const { container } = render(
      <RruForm initialValues={initialValues} onSubmit={onSubmit}>
        <RruTextInput name='email' label='Email Address' onChange={onEmailChange} />
        <button type='submit'>Submit</button>
      </RruForm>
    );

    // validation for the initial value
    expect(onEmailChange).toHaveBeenCalledTimes(1);
    expect(onEmailChange.mock.calls[0][0]).toEqual('khalid@test.com');

    // type some value
    await writeText(container, 'email', 'test@test.com');

    // validation for a new value
    expect(onEmailChange).toHaveBeenCalledTimes(14);
    expect(onEmailChange.mock.calls[13][0]).toEqual('test@test.com');
  });

  it('should reflect manual values set via the form context', async () => {
    // prepare
    const onSubmit = jest.fn();
    const initialValues = {
      email: 'khalid@test.com',
    };

    // render
    const { result: formContext } = renderHook(useRruForm);
    const { container } = render(
      <RruForm context={formContext.current} onSubmit={onSubmit} initialValues={initialValues}>
        <RruTextInput name='email' label='Email Address' />
        <button type='submit'>Submit</button>
      </RruForm>
    );

    expect(formContext.current.getFieldValue('email')).toEqual('khalid@test.com');
    await act(async () => formContext.current.setFieldValue('email', 'new@email.com'));
    expect(formContext.current.getFieldValue('email')).toEqual('new@email.com');

    expectTypedTextIsRendered(container, 'email', 'new@email.com');

    // submit the form
    await submitForm(container);

    // validation
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit.mock.calls[0][0]).toEqual({
      email: 'new@email.com',
    });
  });
});
