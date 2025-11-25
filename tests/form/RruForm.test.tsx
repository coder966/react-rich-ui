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

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as yup from 'yup';
import { RruCheckboxInput, RruForm, RruTextInput, RruTextareaInput } from '../../src';
import submitForm from '../__utils__/submitForm';

describe('RruForm', () => {
  it('should handle form submission with multiple inputs', async () => {
    // prepare
    const onSubmit = jest.fn();

    // render
    const { container } = render(
      <RruForm onSubmit={onSubmit}>
        <RruTextInput name='name' label='Name' />
        <RruTextInput name='email' label='Email' />
        <RruTextareaInput name='bio' label='Bio' />
        <RruCheckboxInput name='agree' label='Agree to terms' />
        <button type='submit'>Submit</button>
      </RruForm>
    );

    // fill the form
    const nameInput = container.querySelector('input[name="name"]');
    nameInput && (await userEvent.click(nameInput));
    await userEvent.keyboard('John Doe');

    const emailInput = container.querySelector('input[name="email"]');
    emailInput && (await userEvent.click(emailInput));
    await userEvent.keyboard('john@example.com');

    const bioInput = container.querySelector('textarea[name="bio"]');
    bioInput && (await userEvent.click(bioInput));
    await userEvent.keyboard('Software Developer');

    const agreeInput = container.querySelector('input[name="agree"]');
    agreeInput && (await userEvent.click(agreeInput));

    // submit the form
    await submitForm(container);

    // validation
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit.mock.calls[0][0]).toEqual({
      name: 'John Doe',
      email: 'john@example.com',
      bio: 'Software Developer',
      agree: true,
    });
  });

  it('should prevent submission from non-submit buttons', async () => {
    // prepare
    const onSubmit = jest.fn();
    const onButtonClick = jest.fn();

    // render
    const { container } = render(
      <RruForm onSubmit={onSubmit}>
        <RruTextInput name='email' label='Email' />
        <button type='button' onClick={onButtonClick}>
          Regular Button
        </button>
        <button type='submit'>Submit</button>
      </RruForm>
    );

    // fill the form
    const emailInput = container.querySelector('input[name="email"]');
    emailInput && (await userEvent.click(emailInput));
    await userEvent.keyboard('test@example.com');

    // Click the regular button
    const regularButton = screen.getByText('Regular Button');
    await userEvent.click(regularButton);

    // validation - onSubmit should not be called
    expect(onButtonClick).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledTimes(0);

    // Now click the submit button
    await submitForm(container);

    // validation - onSubmit should be called now
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it('should handle form with custom id attribute', async () => {
    // prepare
    const onSubmit = jest.fn();
    const customId = 'my-custom-form-id';

    // render
    const { container } = render(
      <RruForm onSubmit={onSubmit} id={customId}>
        <RruTextInput name='email' label='Email' />
        <button type='submit'>Submit</button>
      </RruForm>
    );

    // validation - check that form has the custom id
    const formElement = container.querySelector(`form#${customId}`);
    expect(formElement).toBeTruthy();
    expect(formElement?.getAttribute('id')).toBe(customId);

    // fill and submit the form
    const emailInput = container.querySelector('input[name="email"]');
    emailInput && (await userEvent.click(emailInput));
    await userEvent.keyboard('test@example.com');

    await submitForm(container);

    // validation
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it('should work without initialValues', async () => {
    // prepare
    const onSubmit = jest.fn();

    // render
    const { container } = render(
      <RruForm onSubmit={onSubmit}>
        <RruTextInput name='email' label='Email' />
        <RruCheckboxInput name='subscribe' label='Subscribe' />
        <button type='submit'>Submit</button>
      </RruForm>
    );

    // submit without entering any data
    await submitForm(container);

    // validation - should submit with default values (null for text, false for checkbox)
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit.mock.calls[0][0]).toEqual({
      email: null,
      subscribe: false,
    });
  });

  it('should work without yupValidationSchema', async () => {
    // prepare
    const onSubmit = jest.fn();

    // render
    const { container } = render(
      <RruForm onSubmit={onSubmit}>
        <RruTextInput name='username' label='Username' />
        <button type='submit'>Submit</button>
      </RruForm>
    );

    // fill the form
    const usernameInput = container.querySelector('input[name="username"]');
    usernameInput && (await userEvent.click(usernameInput));
    await userEvent.keyboard('johndoe');

    // submit the form
    await submitForm(container);

    // validation - should submit without validation
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit.mock.calls[0][0]).toEqual({
      username: 'johndoe',
    });
  });

  it('should handle nested form field names', async () => {
    // prepare
    const onSubmit = jest.fn();

    // render
    const { container } = render(
      <RruForm onSubmit={onSubmit}>
        <RruTextInput name='user.firstName' label='First Name' />
        <RruTextInput name='user.lastName' label='Last Name' />
        <RruTextInput name='contact.email' label='Email' />
        <button type='submit'>Submit</button>
      </RruForm>
    );

    // fill the form
    const firstNameInput = container.querySelector('input[name="user.firstName"]');
    firstNameInput && (await userEvent.click(firstNameInput));
    await userEvent.keyboard('John');

    const lastNameInput = container.querySelector('input[name="user.lastName"]');
    lastNameInput && (await userEvent.click(lastNameInput));
    await userEvent.keyboard('Doe');

    const emailInput = container.querySelector('input[name="contact.email"]');
    emailInput && (await userEvent.click(emailInput));
    await userEvent.keyboard('john@example.com');

    // submit the form
    await submitForm(container);

    // validation - should submit with nested object structure
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit.mock.calls[0][0]).toEqual({
      user: {
        firstName: 'John',
        lastName: 'Doe',
      },
      contact: {
        email: 'john@example.com',
      },
    });
  });

  it('should validate entire form with multiple fields', async () => {
    // prepare
    const onSubmit = jest.fn();
    const yupValidationSchema = yup.object().shape({
      username: yup
        .string()
        .nullable()
        .required('Username is required')
        .min(3, 'Username must be at least 3 characters'),
      email: yup
        .string()
        .nullable()
        .required('Email is required')
        .matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,7}$/, 'Invalid email format'),
      password: yup
        .string()
        .nullable()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters'),
      agree: yup.bool().isTrue('You must agree to the terms'),
    });

    // render
    const { container } = render(
      <RruForm onSubmit={onSubmit} yupValidationSchema={yupValidationSchema}>
        <RruTextInput name='username' label='Username' />
        <RruTextInput name='email' label='Email' />
        <RruTextInput name='password' label='Password' />
        <RruCheckboxInput name='agree' label='Agree to terms' />
        <button type='submit'>Submit</button>
      </RruForm>
    );

    // submit without entering any data - should show multiple validation errors
    await submitForm(container);

    // validation - form should not be submitted
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(0);
      expect(screen.getByText('Username is required')).toBeTruthy();
      expect(screen.getByText('Email is required')).toBeTruthy();
      expect(screen.getByText('Password is required')).toBeTruthy();
      expect(screen.getByText('You must agree to the terms')).toBeTruthy();
    });

    // fill the form with valid data
    const usernameInput = container.querySelector('input[name="username"]');
    usernameInput && (await userEvent.click(usernameInput));
    await userEvent.keyboard('johndoe');

    const emailInput = container.querySelector('input[name="email"]');
    emailInput && (await userEvent.click(emailInput));
    await userEvent.keyboard('john@example.com');

    const passwordInput = container.querySelector('input[name="password"]');
    passwordInput && (await userEvent.click(passwordInput));
    await userEvent.keyboard('password123');

    const agreeInput = container.querySelector('input[name="agree"]');
    agreeInput && (await userEvent.click(agreeInput));

    // submit the form again
    await submitForm(container);

    // validation - form should be submitted successfully
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1);
      expect(onSubmit.mock.calls[0][0]).toEqual({
        username: 'johndoe',
        email: 'john@example.com',
        password: 'password123',
        agree: true,
      });
    });
  });
});
