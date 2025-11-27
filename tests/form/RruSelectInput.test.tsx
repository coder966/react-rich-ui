/*
 * Copyright 2020 Khalid H. Alharisi
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or colord to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { act, render, renderHook, waitFor } from '@testing-library/react';
import * as yup from 'yup';
import colorsOptions from '../../src/../stories/data/colorsOptions';
import { RruForm, RruSelectInput, useRruForm } from '../../src';
import { submitForm, selectOption, expectSelectedOptionIsRendered} from '../__utils__/form-utils.ts';

describe('RruSelectInput', () => {
  it('should render correctly', async () => {
    // prepare
    const onSubmit = jest.fn();

    // render
    const { container } = render(
      <RruForm onSubmit={onSubmit}>
        <RruSelectInput name='color' label='Color' options={colorsOptions} />
        <button type='submit'>Submit</button>
      </RruForm>
    );

    const inputElement = container.querySelector('input[name="color"]');

    expect(inputElement).toBeTruthy();
  });

  it('should submit the entered value', async () => {
    // prepare
    const onSubmit = jest.fn();

    // render
    const { container } = render(
      <RruForm onSubmit={onSubmit}>
        <RruSelectInput name='color' label='Color' options={colorsOptions} />
        <button type='submit'>Submit</button>
      </RruForm>
    );

    await selectOption(container, 'color', 'Orange');

    await submitForm(container);

    // validation
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit.mock.calls[0][0]).toEqual({
      color: 'ORANGE',
    });
  });

  it('should submit null for when no data is entered', async () => {
    // prepare
    const onSubmit = jest.fn();

    // render
    const { container } = render(
      <RruForm onSubmit={onSubmit}>
        <RruSelectInput name='color' label='Color' options={colorsOptions} />
        <button type='submit'>Submit</button>
      </RruForm>
    );

    // submit the form
    await submitForm(container);

    // validation
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit.mock.calls[0][0]).toEqual({
      color: null,
    });
  });

  it('should render and submit the initial value', async () => {
    // prepare
    const onSubmit = jest.fn();
    const initialValues = {
      color: 'ORANGE',
    };

    // render
    const { container } = render(
      <RruForm onSubmit={onSubmit} initialValues={initialValues}>
        <RruSelectInput name='color' label='Color' options={colorsOptions} />
        <button type='submit'>Submit</button>
      </RruForm>
    );

    // make sure the initial value is rendered
    expectSelectedOptionIsRendered(container, 'color', 'ORANGE');

    // submit the form
    await submitForm(container);

    // validation
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit.mock.calls[0][0]).toEqual({
      color: 'ORANGE',
    });
  });

  it('should accept a new value after the initial value', async () => {
    // prepare
    const onSubmit = jest.fn();
    const initialValues = {
      color: 'ORANGE',
    };

    // render
    const { container } = render(
      <RruForm onSubmit={onSubmit} initialValues={initialValues}>
        <RruSelectInput name='color' label='Color' options={colorsOptions} />
        <button type='submit'>Submit</button>
      </RruForm>
    );

    await selectOption(container, 'color', 'Blue');

    // make the selected value is rendered
    expectSelectedOptionIsRendered(container, 'color', 'BLUE');

    await submitForm(container);

    // validation
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit.mock.calls[0][0]).toEqual({
      color: 'BLUE',
    });
  });

  it('should validate the input', async () => {
    // prepare
    const onSubmit = jest.fn();
    const yupValidationSchema = yup.object().shape({
      color: yup.string().nullable().required('You must select a color'),
    });

    // render
    const { container } = render(
      <RruForm onSubmit={onSubmit} yupValidationSchema={yupValidationSchema}>
        <RruSelectInput name='color' label='Color' options={colorsOptions} />
        <button type='submit'>Submit</button>
      </RruForm>
    );

    // submit the form
    await submitForm(container);

    // validation for bad input
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(0);
      const formGroup = container.querySelector('[data-field-name="color"]');
      expect(formGroup?.getAttribute('data-field-error')).toBe('You must select a color');
    });

    // change
    await selectOption(container, 'color', 'Orange');

    // submit the form
    await submitForm(container);

    // validation for valid input
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1);
      expect(onSubmit.mock.calls[0][0]).toEqual({
        color: 'ORANGE',
      });
    });
  });

  it('should watch the input', async () => {
    // prepare
    const onSubmit = jest.fn();
    const onInputChange = jest.fn();
    const initialValues = {
      color: 'ORANGE',
    };

    // render
    const { container } = render(
      <RruForm initialValues={initialValues} onSubmit={onSubmit}>
        <RruSelectInput name='color' label='Color' options={colorsOptions} onChange={onInputChange} />
        <button type='submit'>Submit</button>
      </RruForm>
    );

    // validation for the initial value
    expect(onInputChange).toHaveBeenCalledTimes(1); // because the initial value
    expect(onInputChange.mock.calls[0][0]).toEqual('ORANGE');

    await selectOption(container, 'color', 'Blue');

    // validation for a new value
    expect(onInputChange).toHaveBeenCalledTimes(2);
    expect(onInputChange.mock.calls[1][0]).toEqual('BLUE');
  });

  it('should reflect manual values set via the form context', async () => {
    // prepare
    const onSubmit = jest.fn();
    const initialValues = {
      color: 'ORANGE',
    };

    // render
    const { result: formContext } = renderHook(useRruForm);
    const { container } = render(
      <RruForm context={formContext.current} onSubmit={onSubmit} initialValues={initialValues}>
        <RruSelectInput name='color' label='Color' options={colorsOptions} />
        <button type='submit'>Submit</button>
      </RruForm>
    );

    expect(formContext.current.getFieldValue('color')).toEqual('ORANGE');
    await act(async () => formContext.current.setFieldValue('color', 'BLUE'));
    expect(formContext.current.getFieldValue('color')).toEqual('BLUE');

    // make the updated value is rendered
    expectSelectedOptionIsRendered(container, 'color', 'BLUE');

    await submitForm(container);

    // validation
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit.mock.calls[0][0]).toEqual({
      color: 'BLUE',
    });
  });

  it('should handle grouped options', async () => {
    // prepare
    const onSubmit = jest.fn();
    const groupedOptions = [
      {
        label: 'Primary Colors',
        options: [
          { label: 'Red', value: 'RED' },
          { label: 'Blue', value: 'BLUE' },
        ],
      },
      {
        label: 'Secondary Colors',
        options: [
          { label: 'Green', value: 'GREEN' },
          { label: 'Purple', value: 'PURPLE' },
        ],
      },
    ];

    // render
    const { container } = render(
      <RruForm onSubmit={onSubmit}>
        <RruSelectInput name='color' label='Color' options={groupedOptions} />
        <button type='submit'>Submit</button>
      </RruForm>
    );

    // select an option from a group
    await selectOption(container, 'color', 'Blue');

    // submit the form
    await submitForm(container);

    // validation
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1);
      expect(onSubmit.mock.calls[0][0]).toEqual({
        color: 'BLUE',
      });
    });
  });

});
