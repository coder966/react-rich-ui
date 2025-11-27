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
import { RruCheckboxInput, RruForm, useRruForm } from '../../src';
import {
  expectCheckboxStateIsRendered,
  setCheckbox,
  submitForm,
} from '../__utils__/form-utils';

describe('RruCheckboxInput', () => {
  it('should render correctly', async () => {
    // prepare
    const onSubmit = jest.fn();

    // render
    const { container } = render(
      <RruForm onSubmit={onSubmit}>
        <RruCheckboxInput name='agree' label='Agree' />
        <button type='submit'>Submit</button>
      </RruForm>
    );

    const inputElement = container.querySelector('input[name="agree"]');

    expect(inputElement).toBeTruthy();
  });

  it('should submit the entered value', async () => {
    // prepare
    const onSubmit = jest.fn();

    // render
    const { container } = render(
      <RruForm onSubmit={onSubmit}>
        <RruCheckboxInput name='agree' label='Agree' />
        <button type='submit'>Submit</button>
      </RruForm>
    );

    await setCheckbox(container, 'agree', true);

    // submit the form
    await submitForm(container);

    // validation
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit.mock.calls[0][0]).toEqual({
      agree: true,
    });
  });

  it('should submit false for when no data is entered', async () => {
    // prepare
    const onSubmit = jest.fn();

    // render
    const { container } = render(
      <RruForm onSubmit={onSubmit}>
        <RruCheckboxInput name='agree' label='Agree' />
        <button type='submit'>Submit</button>
      </RruForm>
    );

    // submit the form
    await submitForm(container);

    // validation
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit.mock.calls[0][0]).toEqual({
      agree: false,
    });
  });

  it('should render and submit the initial value', async () => {
    // prepare
    const onSubmit = jest.fn();
    const initialValues = {
      agree: true,
    };

    // render
    const { container } = render(
      <RruForm onSubmit={onSubmit} initialValues={initialValues}>
        <RruCheckboxInput name='agree' label='Agree' />
        <button type='submit'>Submit</button>
      </RruForm>
    );

    expectCheckboxStateIsRendered(container, 'agree', true);

    // submit the form
    await submitForm(container);

    // validation
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit.mock.calls[0][0]).toEqual({
      agree: true,
    });
  });

  it('should accept a new value after the initial value', async () => {
    // prepare
    const onSubmit = jest.fn();
    const initialValues = {
      agree: true,
    };

    // render
    const { container } = render(
      <RruForm onSubmit={onSubmit} initialValues={initialValues}>
        <RruCheckboxInput name='agree' label='Agree' />
        <button type='submit'>Submit</button>
      </RruForm>
    );

    expectCheckboxStateIsRendered(container, 'agree', true);

    // fill the form
    await setCheckbox(container, 'agree', true);

    expectCheckboxStateIsRendered(container, 'agree', false);

    // submit the form
    await submitForm(container);

    // validation
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit.mock.calls[0][0]).toEqual({
      agree: false,
    });
  });

  it('should validate the input', async () => {
    // prepare
    const onSubmit = jest.fn();
    const yupValidationSchema = yup.object().shape({
      agree: yup.bool().isTrue('You must agree'),
    });

    // render
    const { container } = render(
      <RruForm onSubmit={onSubmit} yupValidationSchema={yupValidationSchema}>
        <RruCheckboxInput name='agree' label='Agree' />
        <button type='submit'>Submit</button>
      </RruForm>
    );

    // check
    await setCheckbox(container, 'agree', true);

    // uncheck
    await setCheckbox(container, 'agree', false);

    // submit the form
    await submitForm(container);

    // validation for bad input
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(0);
      const formGroup = container.querySelector('[data-field-name="agree"]');
      expect(formGroup?.getAttribute('data-field-error')).toBe('You must agree');
    });

    // check
    await setCheckbox(container, 'agree', true);

    // submit the form
    await submitForm(container);

    // validation for valid input
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1);
      expect(onSubmit.mock.calls[0][0]).toEqual({
        agree: true,
      });
    });
  });

  it('should watch the input', async () => {
    // prepare
    const onSubmit = jest.fn();
    const onInputChange = jest.fn();
    const initialValues = {
      agree: true,
    };

    // render
    const { container } = render(
      <RruForm initialValues={initialValues} onSubmit={onSubmit}>
        <RruCheckboxInput name='agree' label='Agree' onChange={onInputChange} />
        <button type='submit'>Submit</button>
      </RruForm>
    );

    // validation for the initial value
    expect(onInputChange).toHaveBeenCalledTimes(1);
    expect(onInputChange.mock.calls[0][0]).toEqual(true);

    // check
    await setCheckbox(container, 'agree', true);

    // validation for a new value
    expect(onInputChange).toHaveBeenCalledTimes(2);
    expect(onInputChange.mock.calls[1][0]).toEqual(false);
  });

  it('should reflect manual values set via the form context', async () => {
    // prepare
    const onSubmit = jest.fn();
    const initialValues = {
      agree: true,
    };

    // render
    const { result: formContext } = renderHook(useRruForm);
    const { container } = render(
      <RruForm context={formContext.current} onSubmit={onSubmit} initialValues={initialValues}>
        <RruCheckboxInput name='agree' label='Agree' />
        <button type='submit'>Submit</button>
      </RruForm>
    );

    expect(formContext.current.getFieldValue('agree')).toEqual(true);
    await act(async () => formContext.current.setFieldValue('agree', false));
    expect(formContext.current.getFieldValue('agree')).toEqual(false);

    expectCheckboxStateIsRendered(container, 'agree', false);

    // submit the form
    await submitForm(container);

    // validation
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit.mock.calls[0][0]).toEqual({
      agree: false,
    });
  });
});
