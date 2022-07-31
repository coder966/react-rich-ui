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

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import * as yup from 'yup';
import RruForm from '../RruForm/RruForm';
import RruTextInput from './RruTextInput';

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
    const emailInput = container.querySelector('input[name="email"]');
    emailInput && (await userEvent.click(emailInput));
    await userEvent.keyboard('khalid@test.com');

    // submit the form
    const submitButton = container.querySelector('button[type="submit"]');
    submitButton && (await userEvent.click(submitButton));

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
    const submitButton = container.querySelector('button[type="submit"]');
    submitButton && (await userEvent.click(submitButton));

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
    expect(screen.getByDisplayValue('khalid@test.com')).toBeTruthy();

    // submit the form
    const submitButton = container.querySelector('button[type="submit"]');
    submitButton && (await userEvent.click(submitButton));

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
    const emailInput = container.querySelector('input[name="email"]');
    if (emailInput) {
      // delete the current value in the input element
      await userEvent.tripleClick(emailInput);
      await userEvent.keyboard('{Backspace}');
      // type in the new value
      await userEvent.keyboard('mohammed@test.com');
    }

    // submit the form
    const submitButton = container.querySelector('button[type="submit"]');
    submitButton && (await userEvent.click(submitButton));

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
    const emailInput = container.querySelector('input[name="email"]');
    emailInput && (await userEvent.click(emailInput));
    await userEvent.keyboard('test_bad_email');

    // submit the form
    const submitButton = container.querySelector('button[type="submit"]');
    submitButton && (await userEvent.click(submitButton));

    // validation for bad input
    expect(onSubmit).toHaveBeenCalledTimes(0);
    expect(emailInput?.getAttribute('class')).toContain('is-invalid');
    expect(screen.getByText('The email address is incorrect')).toBeTruthy();

    // delete the current value in the input element
    emailInput && (await userEvent.tripleClick(emailInput));
    await userEvent.keyboard('{Backspace}');
    // type in the new value
    await userEvent.keyboard('khalid@test.com');

    // submit the form
    submitButton && (await userEvent.click(submitButton));

    // validation for valid input
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit.mock.calls[0][0]).toEqual({
      email: 'khalid@test.com',
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

    const emailInput = container.querySelector('input[name="email"]');

    // delete the current value in the input element
    emailInput && (await userEvent.tripleClick(emailInput));
    await userEvent.keyboard('{Backspace}');
    // type in the new value
    await userEvent.keyboard('test@test.com');

    // validation for a new value
    expect(onEmailChange).toHaveBeenCalledTimes(15);
    return expect(onEmailChange.mock.calls[14][0]).toEqual('test@test.com');
  });
});
