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

import { act, render, renderHook, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as yup from 'yup';
import { RruCheckboxInput, RruForm, RruTextInput, RruTextareaInput, useRruForm } from '../../src';
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
    const onClick1 = jest.fn();
    const onClick2 = jest.fn();

    // render
    const { container } = render(
      <RruForm onSubmit={onSubmit}>
        <RruTextInput name='email' label='Email' />
        <button type='button' onClick={onClick2}>Regular Button with onClick</button>
        <button onClick={onClick1}>No Type Button with onClick</button>
        <button type='button' onClick={onClick2}>Regular Button without onClick</button>
        <button onClick={onClick1}>No Type Button without onClick</button>
        <button type='submit'>Submit</button>
      </RruForm>
    );

    // fill the form
    const emailInput = container.querySelector('input[name="email"]');
    emailInput && (await userEvent.click(emailInput));
    await userEvent.keyboard('test@example.com');

    // Click the Regular Button with onClick
    const regularWithOnClickButton = screen.getByText('Regular Button with onClick');
    await userEvent.click(regularWithOnClickButton);

    // validation - onSubmit should not be called
    expect(onClick2).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledTimes(0);

    // Click the No Type Button with onClick
    const noTypeWithOnClickButton = screen.getByText('No Type Button with onClick');
    await userEvent.click(noTypeWithOnClickButton);

    // validation - onSubmit should not be called
    expect(onClick1).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledTimes(0);

    const regularWithoutOnClickButton = screen.getByText('Regular Button without onClick');
    await userEvent.click(regularWithoutOnClickButton);

    // validation - onSubmit should not be called
    expect(onSubmit).toHaveBeenCalledTimes(0);

    // Click the Regular Button without onClick
    const noTypeWithoutOnClickButton = screen.getByText('No Type Button without onClick');
    await userEvent.click(noTypeWithoutOnClickButton);

    // validation - onSubmit should not be called
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
      const usernameFormGroup = container.querySelector('[data-field-name="username"]');
      const emailFormGroup = container.querySelector('[data-field-name="email"]');
      const passwordFormGroup = container.querySelector('[data-field-name="password"]');
      const agreeFormGroup = container.querySelector('[data-field-name="agree"]');
      expect(usernameFormGroup?.getAttribute('data-field-error')).toBe('Username is required');
      expect(emailFormGroup?.getAttribute('data-field-error')).toBe('Email is required');
      expect(passwordFormGroup?.getAttribute('data-field-error')).toBe('Password is required');
      expect(agreeFormGroup?.getAttribute('data-field-error')).toBe('You must agree to the terms');
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

  it('should initialize array fields with initial values', async () => {
    // prepare
    const onSubmit = jest.fn();
    const initialValues = {
      email: 'user@example.com',
      basket: [
        { name: 'Apple', color: 'Red', quantity: 5 },
        { name: 'Banana', color: 'Yellow', quantity: 3 },
      ],
    };

    // render hook
    const { result: formContext } = renderHook(useRruForm);

    // render form with context
    render(
      <RruForm context={formContext.current} onSubmit={onSubmit} initialValues={initialValues}>
        <RruTextInput name='email' label='Email' />
        <RruTextInput name='basket[0].name' label='Item Name' />
        <RruTextInput name='basket[0].color' label='Item Color' />
        <RruTextInput name='basket[0].quantity' label='Item Quantity' />
        <RruTextInput name='basket[1].name' label='Item Name' />
        <RruTextInput name='basket[1].color' label='Item Color' />
        <RruTextInput name='basket[1].quantity' label='Item Quantity' />
        <button type='submit'>Submit</button>
      </RruForm>
    );

    // validation - getFieldsValues should return complete structure
    const allValues = formContext.current.getFieldsValues();
    expect(JSON.stringify(allValues)).toEqual(JSON.stringify(initialValues));
  });

  it('should get array field values individually', async () => {
    // prepare
    const onSubmit = jest.fn();
    const initialValues = {
      email: 'test@example.com',
      basket: [
        { name: 'Orange', color: 'Orange', quantity: 10 },
        { name: 'Grape', color: 'Purple', quantity: 20 },
        { name: 'Kiwi', color: 'Green', quantity: 15 },
      ],
    };

    // render hook
    const { result: formContext } = renderHook(useRruForm);

    // render form with context
    render(
      <RruForm context={formContext.current} onSubmit={onSubmit} initialValues={initialValues}>
        <RruTextInput name='email' label='Email' />
        <RruTextInput name='basket[0].name' label='Item Name' />
        <RruTextInput name='basket[0].color' label='Item Color' />
        <RruTextInput name='basket[0].quantity' label='Item Quantity' />
        <RruTextInput name='basket[1].name' label='Item Name' />
        <RruTextInput name='basket[1].color' label='Item Color' />
        <RruTextInput name='basket[1].quantity' label='Item Quantity' />
        <RruTextInput name='basket[2].name' label='Item Name' />
        <RruTextInput name='basket[2].color' label='Item Color' />
        <RruTextInput name='basket[2].quantity' label='Item Quantity' />
        <button type='submit'>Submit</button>
      </RruForm>
    );

    // validation - should get individual array field values
    expect(formContext.current.getFieldValue('basket[0].name')).toBe('Orange');
    expect(formContext.current.getFieldValue('basket[0].color')).toBe('Orange');
    expect(formContext.current.getFieldValue('basket[0].quantity')).toBe(10);
    expect(formContext.current.getFieldValue('basket[1].name')).toBe('Grape');
    expect(formContext.current.getFieldValue('basket[1].color')).toBe('Purple');
    expect(formContext.current.getFieldValue('basket[1].quantity')).toBe(20);
    expect(formContext.current.getFieldValue('basket[2].name')).toBe('Kiwi');
    expect(formContext.current.getFieldValue('basket[2].color')).toBe('Green');
    expect(formContext.current.getFieldValue('basket[2].quantity')).toBe(15);
  });

  it('should set array field values with setFieldValue', async () => {
    // prepare
    const onSubmit = jest.fn();
    const initialValues = {
      email: 'user@example.com',
      basket: [
        { name: 'Apple', color: 'Red', quantity: 5 },
      ],
    };

    // render hook
    const { result: formContext } = renderHook(useRruForm);

    // render form with context
    const { container } = render(
      <RruForm context={formContext.current} onSubmit={onSubmit} initialValues={initialValues}>
        <RruTextInput name='email' label='Email' />
        <RruTextInput name='basket[0].name' label='Item Name' />
        <RruTextInput name='basket[0].color' label='Item Color' />
        <RruTextInput name='basket[0].quantity' label='Item Quantity' />
        <button type='submit'>Submit</button>
      </RruForm>
    );

    // validation - initial values
    expect(formContext.current.getFieldValue('basket[0].name')).toBe('Apple');
    expect(formContext.current.getFieldValue('basket[0].color')).toBe('Red');
    expect(formContext.current.getFieldValue('basket[0].quantity')).toBe(5);

    // change array field values
    await act(async () => {
      formContext.current.setFieldValue('basket[0].name', 'Mango');
      formContext.current.setFieldValue('basket[0].color', 'Yellow');
      formContext.current.setFieldValue('basket[0].quantity', 12);
    });

    // validation - values should be updated
    expect(formContext.current.getFieldValue('basket[0].name')).toBe('Mango');
    expect(formContext.current.getFieldValue('basket[0].color')).toBe('Yellow');
    expect(formContext.current.getFieldValue('basket[0].quantity')).toBe(12);

    // submit the form
    await submitForm(container);

    // validation - new values should be submitted
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit.mock.calls[0][0]).toEqual({
      email: 'user@example.com',
      basket: [
        { name: 'Mango', color: 'Yellow', quantity: 12 },
      ],
    });
  });

  it('should handle mixed array element updates', async () => {
    // prepare
    const onSubmit = jest.fn();
    const initialValues = {
      email: 'shop@example.com',
      basket: [
        { name: 'Item1', color: 'Color1', quantity: 1 },
        { name: 'Item2', color: 'Color2', quantity: 2 },
        { name: 'Item3', color: 'Color3', quantity: 3 },
      ],
    };

    // render hook
    const { result: formContext } = renderHook(useRruForm);

    // render form with context
    const { container } = render(
      <RruForm context={formContext.current} onSubmit={onSubmit} initialValues={initialValues}>
        <button type='submit'>Submit</button>
      </RruForm>
    );

    // update first and third items only
    await act(async () => {
      formContext.current.setFieldValue('basket[0].name', 'UpdatedItem1');
      formContext.current.setFieldValue('basket[0].quantity', 10);
      formContext.current.setFieldValue('basket[2].color', 'UpdatedColor3');
    });

    // validation - check updated and unchanged values
    expect(formContext.current.getFieldValue('basket[0].name')).toBe('UpdatedItem1');
    expect(formContext.current.getFieldValue('basket[0].quantity')).toBe(10);
    expect(formContext.current.getFieldValue('basket[1].name')).toBe('Item2');
    expect(formContext.current.getFieldValue('basket[1].color')).toBe('Color2');
    expect(formContext.current.getFieldValue('basket[2].color')).toBe('UpdatedColor3');

    // submit the form
    await submitForm(container);

    // validation - mixed updates should be submitted correctly
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit.mock.calls[0][0]).toEqual({
      email: 'shop@example.com',
      basket: [
        { name: 'UpdatedItem1', color: 'Color1', quantity: 10 },
        { name: 'Item2', color: 'Color2', quantity: 2 },
        { name: 'Item3', color: 'UpdatedColor3', quantity: 3 },
      ],
    });
  });

  it('should handle user input in array fields', async () => {
    // prepare
    const onSubmit = jest.fn();
    const initialValues = {
      email: 'user@example.com',
      basket: [
        { name: '', color: '', quantity: 0 },
      ],
    };

    // render hook
    const { result: formContext } = renderHook(useRruForm);

    // render form with context
    const { container } = render(
      <RruForm context={formContext.current} onSubmit={onSubmit} initialValues={initialValues}>
        <RruTextInput name='email' label='Email' />
        <RruTextInput name='basket[0].name' label='Item Name' />
        <RruTextInput name='basket[0].color' label='Item Color' />
        <RruTextInput name='basket[0].quantity' label='Item Quantity' />
        <button type='submit'>Submit</button>
      </RruForm>
    );

    // type in the array field inputs
    const nameInput = container.querySelector('input[name="basket[0].name"]');
    const colorInput = container.querySelector('input[name="basket[0].color"]');
    const quantityInput = container.querySelector('input[name="basket[0].quantity"]');

    if (nameInput) {
      await userEvent.click(nameInput);
      await userEvent.keyboard('Watermelon');
    }
    if (colorInput) {
      await userEvent.click(colorInput);
      await userEvent.keyboard('Green');
    }
    if (quantityInput) {
      await userEvent.tripleClick(quantityInput);
      await userEvent.keyboard('{Backspace}7');
    }

    // validation - should get the typed values
    expect(formContext.current.getFieldValue('basket[0].name')).toBe('Watermelon');
    expect(formContext.current.getFieldValue('basket[0].color')).toBe('Green');
    expect(formContext.current.getFieldValue('basket[0].quantity')).toBe('7');

    // submit the form
    await submitForm(container);

    // validation - typed values should be submitted
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit.mock.calls[0][0]).toEqual({
      email: 'user@example.com',
      basket: [
        { name: 'Watermelon', color: 'Green', quantity: '7' },
      ],
    });
  });

  it('should handle empty array initialization', async () => {
    // prepare
    const onSubmit = jest.fn();
    const initialValues = {
      email: 'user@example.com',
      basket: [],
    };

    // render hook
    const { result: formContext } = renderHook(useRruForm);

    // render form with context
    const { container } = render(
      <RruForm context={formContext.current} onSubmit={onSubmit} initialValues={initialValues}>
        <RruTextInput name='email' label='Email' />
        <RruTextInput name='basket[0].name' label='Item Name' />
        <RruTextInput name='basket[0].color' label='Item Color' />
        <RruTextInput name='basket[0].quantity' label='Item Quantity' />
        <button type='submit'>Submit</button>
      </RruForm>
    );

    // validation - array fields should be null
    expect(formContext.current.getFieldValue('basket[0].name')).toBeNull();
    expect(formContext.current.getFieldValue('basket[0].color')).toBeNull();
    expect(formContext.current.getFieldValue('basket[0].quantity')).toBeNull();

    // add first element
    await act(async () => {
      formContext.current.setFieldValue('basket[0].name', 'FirstItem');
      formContext.current.setFieldValue('basket[0].color', 'Blue');
      formContext.current.setFieldValue('basket[0].quantity', 5);
    });

    // validation - values should be set
    expect(formContext.current.getFieldValue('basket[0].name')).toBe('FirstItem');
    expect(formContext.current.getFieldValue('basket[0].color')).toBe('Blue');
    expect(formContext.current.getFieldValue('basket[0].quantity')).toBe(5);

    // submit the form
    await submitForm(container);

    // validation - should submit with array containing one element
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit.mock.calls[0][0]).toEqual({
      email: 'user@example.com',
      basket: [
        { name: 'FirstItem', color: 'Blue', quantity: 5 },
      ],
    });
  });

  it('should validate array fields with yup schema', async () => {
    // prepare
    const onSubmit = jest.fn();
    const initialValues = {
      email: '',
      basket: [
        { name: '', color: '', quantity: 0 },
      ],
    };

    const validationSchema = yup.object({
      email: yup.string().email('Invalid email').required('Email is required'),
      basket: yup.array().of(
        yup.object({
          name: yup.string().required('Item name is required'),
          color: yup.string().required('Item color is required'),
          quantity: yup.number().min(1, 'Quantity must be at least 1').required('Quantity is required'),
        })
      ),
    });

    // render hook
    const { result: formContext } = renderHook(useRruForm);

    // render form with context
    const { container } = render(
      <RruForm
        context={formContext.current}
        onSubmit={onSubmit}
        initialValues={initialValues}
        yupValidationSchema={validationSchema}
      >
        <RruTextInput name='email' label='Email' />
        <RruTextInput name='basket[0].name' label='Item Name' />
        <RruTextInput name='basket[0].color' label='Item Color' />
        <RruTextInput name='basket[0].quantity' label='Item Quantity' />
        <button type='submit'>Submit</button>
      </RruForm>
    );

    // submit the form with invalid data
    await submitForm(container);

    // validation - form should not submit with validation errors
    expect(onSubmit).not.toHaveBeenCalled();

    // check validation errors exist
    const emailFormGroup = container.querySelector('[data-field-name="email"]');
    const nameFormGroup = container.querySelector('[data-field-name="basket[0].name"]');
    const colorFormGroup = container.querySelector('[data-field-name="basket[0].color"]');
    const quantityFormGroup = container.querySelector('[data-field-name="basket[0].quantity"]');

    expect(emailFormGroup?.getAttribute('data-field-error')).toBe('Email is required');
    expect(nameFormGroup?.getAttribute('data-field-error')).toBe('Item name is required');
    expect(colorFormGroup?.getAttribute('data-field-error')).toBe('Item color is required');
    expect(quantityFormGroup?.getAttribute('data-field-error')).toBe('Quantity must be at least 1');
  });

  it('should validate array fields and submit when valid', async () => {
    // prepare
    const onSubmit = jest.fn();
    const initialValues = {
      email: 'test@example.com',
      basket: [
        { name: 'Apple', color: 'Red', quantity: 5 },
        { name: 'Banana', color: 'Yellow', quantity: 3 },
      ],
    };

    const validationSchema = yup.object({
      email: yup.string().email('Invalid email').required('Email is required'),
      basket: yup.array().of(
        yup.object({
          name: yup.string().required('Item name is required'),
          color: yup.string().required('Item color is required'),
          quantity: yup.number().min(1, 'Quantity must be at least 1').required('Quantity is required'),
        })
      ).min(1, 'At least one item is required'),
    });

    // render hook
    const { result: formContext } = renderHook(useRruForm);

    // render form with context
    const { container } = render(
      <RruForm
        context={formContext.current}
        onSubmit={onSubmit}
        initialValues={initialValues}
        yupValidationSchema={validationSchema}
      >
        <RruTextInput name='email' label='Email' />
        <RruTextInput name='basket[0].name' label='Item Name' />
        <RruTextInput name='basket[0].color' label='Item Color' />
        <RruTextInput name='basket[0].quantity' label='Item Quantity' />
        <RruTextInput name='basket[1].name' label='Item Name' />
        <RruTextInput name='basket[1].color' label='Item Color' />
        <RruTextInput name='basket[1].quantity' label='Item Quantity' />
        <button type='submit'>Submit</button>
      </RruForm>
    );

    // submit the form with valid data
    await submitForm(container);

    // validation - form should submit successfully
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(JSON.stringify(onSubmit.mock.calls[0][0])).toEqual(JSON.stringify(initialValues));
  });

  it('should handle validation errors when updating array fields', async () => {
    // prepare
    const onSubmit = jest.fn();
    const initialValues = {
      email: 'user@example.com',
      basket: [
        { name: 'Apple', color: 'Red', quantity: 5 },
      ],
    };

    const validationSchema = yup.object({
      email: yup.string().email('Invalid email').required('Email is required'),
      basket: yup.array().of(
        yup.object({
          name: yup.string().min(3, 'Name must be at least 3 characters').required('Item name is required'),
          color: yup.string().required('Item color is required'),
          quantity: yup.number().min(1, 'Quantity must be at least 1').max(100, 'Quantity cannot exceed 100').required('Quantity is required'),
        })
      ),
    });

    // render hook
    const { result: formContext } = renderHook(useRruForm);

    // render form with context
    const { container } = render(
      <RruForm
        context={formContext.current}
        onSubmit={onSubmit}
        initialValues={initialValues}
        yupValidationSchema={validationSchema}
      >
        <RruTextInput name='email' label='Email' />
        <RruTextInput name='basket[0].name' label='Item Name' />
        <RruTextInput name='basket[0].color' label='Item Color' />
        <RruTextInput name='basket[0].quantity' label='Item Quantity' />
        <button type='submit'>Submit</button>
      </RruForm>
    );

    // set invalid values
    await act(async () => {
      formContext.current.setFieldValue('basket[0].name', 'Ab'); // too short
      formContext.current.setFieldValue('basket[0].quantity', 150); // exceeds max
    });

    // submit the form
    await submitForm(container);

    // validation - form should not submit
    expect(onSubmit).not.toHaveBeenCalled();

    // check validation errors
    const nameFormGroup = container.querySelector('[data-field-name="basket[0].name"]');
    const quantityFormGroup = container.querySelector('[data-field-name="basket[0].quantity"]');

    expect(nameFormGroup?.getAttribute('data-field-error')).toBe('Name must be at least 3 characters');
    expect(quantityFormGroup?.getAttribute('data-field-error')).toBe('Quantity cannot exceed 100');
  });

  it('should validate multiple array elements independently', async () => {
    // prepare
    const onSubmit = jest.fn();
    const initialValues = {
      email: 'user@example.com',
      basket: [
        { name: 'Valid Item', color: 'Red', quantity: 5 },
        { name: 'X', color: '', quantity: 0 }, // invalid
      ],
    };

    const validationSchema = yup.object({
      email: yup.string().email('Invalid email').required('Email is required'),
      basket: yup.array().of(
        yup.object({
          name: yup.string().min(3, 'Name must be at least 3 characters').required('Item name is required'),
          color: yup.string().required('Item color is required'),
          quantity: yup.number().min(1, 'Quantity must be at least 1').required('Quantity is required'),
        })
      ),
    });

    // render hook
    const { result: formContext } = renderHook(useRruForm);

    // render form with context
    const { container } = render(
      <RruForm
        context={formContext.current}
        onSubmit={onSubmit}
        initialValues={initialValues}
        yupValidationSchema={validationSchema}
      >
        <RruTextInput name='email' label='Email' />
        <RruTextInput name='basket[0].name' label='Item Name' />
        <RruTextInput name='basket[0].color' label='Item Color' />
        <RruTextInput name='basket[0].quantity' label='Item Quantity' />
        <RruTextInput name='basket[1].name' label='Item Name' />
        <RruTextInput name='basket[1].color' label='Item Color' />
        <RruTextInput name='basket[1].quantity' label='Item Quantity' />
        <button type='submit'>Submit</button>
      </RruForm>
    );

    // submit the form
    await submitForm(container);

    // validation - form should not submit
    expect(onSubmit).not.toHaveBeenCalled();

    // validation - first item should have no errors
    const item1NameFormGroup = container.querySelector('[data-field-name="basket[0].name"]');
    const item1ColorFormGroup = container.querySelector('[data-field-name="basket[0].color"]');
    const item1QuantityFormGroup = container.querySelector('[data-field-name="basket[0].quantity"]');

    expect(item1NameFormGroup?.getAttribute('data-field-error')).toBe('');
    expect(item1ColorFormGroup?.getAttribute('data-field-error')).toBe('');
    expect(item1QuantityFormGroup?.getAttribute('data-field-error')).toBe('');

    // validation - second item should have errors
    const item2NameFormGroup = container.querySelector('[data-field-name="basket[1].name"]');
    const item2ColorFormGroup = container.querySelector('[data-field-name="basket[1].color"]');
    const item2QuantityFormGroup = container.querySelector('[data-field-name="basket[1].quantity"]');

    expect(item2NameFormGroup?.getAttribute('data-field-error')).toBe('Name must be at least 3 characters');
    expect(item2ColorFormGroup?.getAttribute('data-field-error')).toBe('Item color is required');
    expect(item2QuantityFormGroup?.getAttribute('data-field-error')).toBe('Quantity must be at least 1');
  });

  it('should handle adding and removing new array elements dynamically', async () => {
    // prepare
    const onSubmit = jest.fn();
    const initialValues = {
      email: 'user@example.com',
      basket: [
        { name: 'Apple', color: 'Red', quantity: 5 },
      ],
    };

    const validationSchema = yup.object({
      email: yup.string().email('Invalid email').required('Email is required'),
      basket: yup.array().of(
        yup.object({
          name: yup.string().required('Item name is required'),
          color: yup.string().required('Item color is required'),
          quantity: yup.number().min(1, 'Quantity must be at least 1').required('Quantity is required'),
        })
      ),
    });

    // TestComponent
    const TestComponent = () => {
      const formContext = useRruForm();
      return (
        <RruForm context={formContext} onSubmit={onSubmit} initialValues={initialValues} yupValidationSchema={validationSchema}>
          <RruTextInput name='email' label='Email' />
          {(formContext.getFieldValue('basket') ?? [])
            .map((_, index) => (
              <>
                <RruTextInput name={`basket[${index}].name`} label='Item Name' />
                <RruTextInput name={`basket[${index}].color`} label='Item Color' />
                <RruTextInput name={`basket[${index}].quantity`} label='Item Quantity' />
                <button type='button' onClick={() => formContext.removeItemFromFieldArray('basket', index)}>Remove item #{index}</button>
              </>
            ))}
          <button type='button' onClick={() => formContext.addItemToFieldArray('basket')}>Add new item</button>
          <button type='submit'>Submit</button>
        </RruForm>
      )
    }

    // render hook
    const { container } = render(<TestComponent />);

    // add new item
    const addNewItemButton = screen.getByText('Add new item');
    await userEvent.click(addNewItemButton);

    // set some data
    const item1Name = container.querySelector('input[name="basket[1].name"]');
    item1Name && await userEvent.click(item1Name);
    await userEvent.keyboard('Pear');
    const item1Color = container.querySelector('input[name="basket[1].color"]');
    item1Color && await userEvent.click(item1Color);
    await userEvent.keyboard('Green');
    const item1Quantity = container.querySelector('input[name="basket[1].quantity"]');
    item1Quantity && await userEvent.click(item1Quantity);
    await userEvent.keyboard('8');

    // submit the form
    await submitForm(container);

    // validation - both array items should be submitted
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit.mock.calls[0][0]).toEqual({
      email: 'user@example.com',
      basket: [
        { name: 'Apple', color: 'Red', quantity: 5 },
        { name: 'Pear', color: 'Green', quantity: 8 },
      ],
    });

    await userEvent.click(addNewItemButton);

    // set some invalid data
    const item2Name = container.querySelector('input[name="basket[2].name"]');
    item2Name && await userEvent.click(item2Name);
    await userEvent.keyboard('{Backspace}');
    const item2Color = container.querySelector('input[name="basket[2].color"]');
    item2Color && await userEvent.click(item2Color);
    await userEvent.keyboard('Green');
    const item2Quantity = container.querySelector('input[name="basket[2].quantity"]');
    item2Quantity && await userEvent.click(item2Quantity);
    await userEvent.keyboard('0');

    // submit the form
    await submitForm(container);

    // validation - stays not called because there are errors
    expect(onSubmit).toHaveBeenCalledTimes(1);

    const nameFormGroup = container.querySelector(`[data-field-name="basket[2].name"]`);
    const quantityFormGroup = container.querySelector(`[data-field-name="basket[2].quantity"]`);

    expect(nameFormGroup?.getAttribute('data-field-error')).toBe('Item name is required');
    expect(quantityFormGroup?.getAttribute('data-field-error')).toBe('Quantity must be at least 1');

    // fix the last item (index 2)
    item2Name && await userEvent.tripleClick(item2Name);
    await userEvent.keyboard('Mango');
    item2Color && await userEvent.tripleClick(item2Color);
    await userEvent.keyboard('Yellow');
    item2Quantity && await userEvent.tripleClick(item2Quantity);
    await userEvent.keyboard('3');

    // submit the form
    await submitForm(container);

    // validation
    expect(onSubmit).toHaveBeenCalledTimes(2);
    expect(onSubmit.mock.calls[1][0]).toEqual({
      email: 'user@example.com',
      basket: [
        { name: 'Apple', color: 'Red', quantity: 5 },
        { name: 'Pear', color: 'Green', quantity: 8 },
        { name: 'Mango', color: 'Yellow', quantity: 3 },
      ],
    });

    // remove the middle item (index 1)
    const removeItem1Button = screen.getByText('Remove item #1');
    await userEvent.click(removeItem1Button);

    // submit the form
    await submitForm(container);

    screen.debug()

    // validation
    expect(onSubmit).toHaveBeenCalledTimes(3);
    expect(onSubmit.mock.calls[2][0]).toEqual({
      email: 'user@example.com',
      basket: [
        { name: 'Apple', color: 'Red', quantity: 5 },
        { name: 'Mango', color: 'Yellow', quantity: 3 },
      ],
    });
  });

});
