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

import { act, render, renderHook } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RruForm, RruTextInput, useRruForm } from '../../src';
import { submitForm } from '../__utils__/form-utils';

describe('useRruForm', () => {
  it('should initialize useRruForm hook', () => {
    // render hook
    const { result } = renderHook(useRruForm);

    // validation - check that all methods are available
    expect(result.current.getFieldsValues).toBeDefined();
    expect(typeof result.current.getFieldsValues).toBe('function');
    expect(result.current.getFieldValue).toBeDefined();
    expect(typeof result.current.getFieldValue).toBe('function');
    expect(result.current.setFieldValue).toBeDefined();
    expect(typeof result.current.setFieldValue).toBe('function');
  });

  it('should get all field values with getFieldsValues', async () => {
    // prepare
    const onSubmit = jest.fn();
    const initialValues = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
    };

    // render hook
    const { result: formContext } = renderHook(useRruForm);

    // render form with context
    render(
      <RruForm context={formContext.current} onSubmit={onSubmit} initialValues={initialValues}>
        <RruTextInput name='firstName' label='First Name' />
        <RruTextInput name='lastName' label='Last Name' />
        <RruTextInput name='email' label='Email' />
        <button type='submit'>Submit</button>
      </RruForm>
    );

    // validation - should get all field values
    const allValues = formContext.current.getFieldsValues();
    expect(allValues).toEqual({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
    });
  });

  it('should get single field value with getFieldValue', async () => {
    // prepare
    const onSubmit = jest.fn();
    const initialValues = {
      username: 'johndoe',
      email: 'john@example.com',
      age: 30,
    };

    // render hook
    const { result: formContext } = renderHook(useRruForm);

    // render form with context
    render(
      <RruForm context={formContext.current} onSubmit={onSubmit} initialValues={initialValues}>
        <RruTextInput name='username' label='Username' />
        <RruTextInput name='email' label='Email' />
        <RruTextInput name='age' label='Age' />
        <button type='submit'>Submit</button>
      </RruForm>
    );

    // validation - should get individual field values
    expect(formContext.current.getFieldValue('username')).toBe('johndoe');
    expect(formContext.current.getFieldValue('email')).toBe('john@example.com');
    expect(formContext.current.getFieldValue('age')).toBe(30);
  });

  it('should set field value with setFieldValue', async () => {
    // prepare
    const onSubmit = jest.fn();
    const initialValues = {
      email: 'old@example.com',
    };

    // render hook
    const { result: formContext } = renderHook(useRruForm);

    // render form with context
    const { container } = render(
      <RruForm context={formContext.current} onSubmit={onSubmit} initialValues={initialValues}>
        <RruTextInput name='email' label='Email' />
        <button type='submit'>Submit</button>
      </RruForm>
    );

    // validation - initial value should be set
    expect(formContext.current.getFieldValue('email')).toBe('old@example.com');

    // change value using setFieldValue
    await act(async () => {
      formContext.current.setFieldValue('email', 'new@example.com');
    });

    // validation - value should be updated
    expect(formContext.current.getFieldValue('email')).toBe('new@example.com');

    // submit the form
    await submitForm(container);

    // validation - new value should be submitted
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit.mock.calls[0][0]).toEqual({
      email: 'new@example.com',
    });
  });

  it('should handle nested field names in getFieldValue', async () => {
    // prepare
    const onSubmit = jest.fn();
    const initialValues = {
      user: {
        firstName: 'John',
        lastName: 'Doe',
      },
      contact: {
        email: 'john@example.com',
        phone: '123-456-7890',
      },
    };

    // render hook
    const { result: formContext } = renderHook(useRruForm);

    // render form with context
    render(
      <RruForm context={formContext.current} onSubmit={onSubmit} initialValues={initialValues}>
        <RruTextInput name='user.firstName' label='First Name' />
        <RruTextInput name='user.lastName' label='Last Name' />
        <RruTextInput name='contact.email' label='Email' />
        <RruTextInput name='contact.phone' label='Phone' />
        <button type='submit'>Submit</button>
      </RruForm>
    );

    // validation - should get nested field values
    expect(formContext.current.getFieldValue('user.firstName')).toBe('John');
    expect(formContext.current.getFieldValue('user.lastName')).toBe('Doe');
    expect(formContext.current.getFieldValue('contact.email')).toBe('john@example.com');
    expect(formContext.current.getFieldValue('contact.phone')).toBe('123-456-7890');
  });

  it('should handle nested field names in setFieldValue', async () => {
    // prepare
    const onSubmit = jest.fn();
    const initialValues = {
      user: {
        firstName: 'John',
        lastName: 'Doe',
      },
    };

    // render hook
    const { result: formContext } = renderHook(useRruForm);

    // render form with context
    const { container } = render(
      <RruForm context={formContext.current} onSubmit={onSubmit} initialValues={initialValues}>
        <RruTextInput name='user.firstName' label='First Name' />
        <RruTextInput name='user.lastName' label='Last Name' />
        <button type='submit'>Submit</button>
      </RruForm>
    );

    // validation - initial values
    expect(formContext.current.getFieldValue('user.firstName')).toBe('John');
    expect(formContext.current.getFieldValue('user.lastName')).toBe('Doe');

    // change nested field values
    await act(async () => {
      formContext.current.setFieldValue('user.firstName', 'Jane');
      formContext.current.setFieldValue('user.lastName', 'Smith');
    });

    // validation - values should be updated
    expect(formContext.current.getFieldValue('user.firstName')).toBe('Jane');
    expect(formContext.current.getFieldValue('user.lastName')).toBe('Smith');

    // submit the form
    await submitForm(container);

    // validation - new values should be submitted
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit.mock.calls[0][0]).toEqual({
      user: {
        firstName: 'Jane',
        lastName: 'Smith',
      },
    });
  });

  it('should return empty object when getting values before context is set', () => {
    // prepare
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

    // render hook
    const { result } = renderHook(useRruForm);

    // Try to get values before context is set
    const values = result.current.getFieldsValues();

    // validation - should return empty object and log error
    expect(values).toEqual({});
    expect(consoleErrorSpy).toHaveBeenCalledWith('FormContext has not been set yet. Cannot read values, will return empty object.');

    consoleErrorSpy.mockRestore();
  });

  it('should handle setFieldValue before context is set gracefully', () => {
    // prepare
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

    // render hook
    const { result } = renderHook(useRruForm);

    // Try to set value before context is set
    act(() => {
      result.current.setFieldValue('email', 'test@example.com');
    });

    // validation - should log error and not crash
    expect(consoleErrorSpy).toHaveBeenCalledWith('FormContext has not been set yet. Cannot set values.');

    consoleErrorSpy.mockRestore();
  });

  it('should update field value and reflect in form', async () => {
    // prepare
    const onSubmit = jest.fn();
    const initialValues = {
      name: 'Initial Name',
    };

    // render hook
    const { result: formContext } = renderHook(useRruForm);

    // render form with context
    const { container } = render(
      <RruForm context={formContext.current} onSubmit={onSubmit} initialValues={initialValues}>
        <RruTextInput name='name' label='Name' />
        <button type='submit'>Submit</button>
      </RruForm>
    );

    // Manually type in the input
    const nameInput = container.querySelector('input[name="name"]');
    if (nameInput) {
      await userEvent.tripleClick(nameInput);
      await userEvent.keyboard('{Backspace}');
      await userEvent.keyboard('Typed Name');
    }

    // validation - should get the typed value
    expect(formContext.current.getFieldValue('name')).toBe('Typed Name');

    // Now programmatically set a different value
    await act(async () => {
      formContext.current.setFieldValue('name', 'Programmatic Name');
    });

    // validation - should get the programmatically set value
    expect(formContext.current.getFieldValue('name')).toBe('Programmatic Name');

    // submit the form
    await submitForm(container);

    // validation - programmatically set value should be submitted
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit.mock.calls[0][0]).toEqual({
      name: 'Programmatic Name',
    });
  });
});
