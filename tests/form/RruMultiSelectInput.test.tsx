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
import { RruForm, RruMultiSelectInput, useRruForm } from '../../src';
import selectOption from '../__utils__/selectOption';
import submitForm from '../__utils__/submitForm';

describe('RruMultiSelectInput', () => {
  it('should render correctly', async () => {
    // prepare
    const onSubmit = jest.fn();

    // render
    const { container } = render(
      <RruForm onSubmit={onSubmit}>
        <RruMultiSelectInput name='color' label='Color' options={colorsOptions} />
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
        <RruMultiSelectInput name='color' label='Color' options={colorsOptions} />
        <button type='submit'>Submit</button>
      </RruForm>
    );

    await selectOption(container, 'Orange');

    await submitForm(container);

    // validation
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit.mock.calls[0][0]).toEqual({
      color: ['ORANGE'],
    });
  });

  it('should submit empty array for when no data is entered', async () => {
    // prepare
    const onSubmit = jest.fn();

    // render
    const { container } = render(
      <RruForm onSubmit={onSubmit}>
        <RruMultiSelectInput name='color' label='Color' options={colorsOptions} />
        <button type='submit'>Submit</button>
      </RruForm>
    );

    // submit the form
    await submitForm(container);

    // validation
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit.mock.calls[0][0]).toEqual({
      color: [],
    });
  });

  it('should render and submit the initial value', async () => {
    // prepare
    const onSubmit = jest.fn();
    const initialValues = {
      color: ['ORANGE'],
    };

    // render
    const { container } = render(
      <RruForm onSubmit={onSubmit} initialValues={initialValues}>
        <RruMultiSelectInput name='color' label='Color' options={colorsOptions} />
        <button type='submit'>Submit</button>
      </RruForm>
    );

    // submit the form
    await submitForm(container);

    // validation
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit.mock.calls[0][0]).toEqual({
      color: ['ORANGE'],
    });
  });

  it('should accept a new value after the initial value', async () => {
    // prepare
    const onSubmit = jest.fn();
    const initialValues = {
      color: ['ORANGE'],
    };

    // render
    const { container } = render(
      <RruForm onSubmit={onSubmit} initialValues={initialValues}>
        <RruMultiSelectInput name='color' label='Color' options={colorsOptions} />
        <button type='submit'>Submit</button>
      </RruForm>
    );

    await selectOption(container, 'Blue');

    await submitForm(container);

    // validation
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit.mock.calls[0][0]).toEqual({
      color: ['ORANGE', 'BLUE'],
    });
  });

  it('should validate the input', async () => {
    // prepare
    const onSubmit = jest.fn();
    const yupValidationSchema = yup.object().shape({
      color: yup.array().min(1, 'You must select at least one').max(3, 'You cannot select more than three'),
    });

    // render
    const { container } = render(
      <RruForm onSubmit={onSubmit} yupValidationSchema={yupValidationSchema}>
        <RruMultiSelectInput name='color' label='Color' options={colorsOptions} />
        <button type='submit'>Submit</button>
      </RruForm>
    );

    // submit the form
    await submitForm(container);

    // validation for bad input
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(0);
      const formGroup = container.querySelector('[data-field-name="color"]');
      expect(formGroup?.getAttribute('data-field-error')).toBe('You must select at least one');
    });

    // change
    await selectOption(container, 'Orange');

    // submit the form
    await submitForm(container);

    // validation for valid input
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1);
      expect(onSubmit.mock.calls[0][0]).toEqual({
        color: ['ORANGE'],
      });
    });
  });

  it('should watch the input', async () => {
    // prepare
    const onSubmit = jest.fn();
    const onInputChange = jest.fn();
    const initialValues = {
      color: ['ORANGE'],
    };

    // render
    const { container } = render(
      <RruForm initialValues={initialValues} onSubmit={onSubmit}>
        <RruMultiSelectInput name='color' label='Color' options={colorsOptions} onChange={onInputChange} />
        <button type='submit'>Submit</button>
      </RruForm>
    );

    // validation for the initial value
    expect(onInputChange).toHaveBeenCalledTimes(1); // because the initial value
    expect(onInputChange.mock.calls[0][0]).toEqual(['ORANGE']);

    await selectOption(container, 'Blue');

    // validation for a new value
    expect(onInputChange).toHaveBeenCalledTimes(2);
    expect(onInputChange.mock.calls[1][0]).toEqual(['ORANGE', 'BLUE']);
  });

  it('should reflect manual values set via the form context', async () => {
    // prepare
    const onSubmit = jest.fn();
    const initialValues = {
      color: ['ORANGE'],
    };

    // render
    const { result: formContext } = renderHook(useRruForm);
    const { container } = render(
      <RruForm context={formContext.current} onSubmit={onSubmit} initialValues={initialValues}>
        <RruMultiSelectInput name='color' label='Color' options={colorsOptions} />
        <button type='submit'>Submit</button>
      </RruForm>
    );

    // NOTE: we use .sort() here because the order of the values is not guaranteed

    expect(formContext.current.getFieldValue('color')).toEqual(['ORANGE']);
    await act(async () => formContext.current.setFieldValue('color', ['ORANGE', 'BLUE']));
    expect(formContext.current.getFieldValue('color').sort()).toEqual(['ORANGE', 'BLUE'].sort());
    expect(container.querySelector('[data-field-value="ORANGE,BLUE"]')).toBeTruthy();

    await submitForm(container);

    // validation
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit.mock.calls[0][0]).toEqual({
      color: ['ORANGE', 'BLUE'].sort(),
    });
  });

  it('should handle grouped options', async () => {
    // prepare
    const onSubmit = jest.fn();
    const groupedOptions = [
      {
        label: 'Warm Colors',
        options: [
          { label: 'Red', value: 'RED' },
          { label: 'Orange', value: 'ORANGE' },
        ],
      },
      {
        label: 'Cool Colors',
        options: [
          { label: 'Blue', value: 'BLUE' },
          { label: 'Green', value: 'GREEN' },
        ],
      },
    ];

    // render
    const { container } = render(
      <RruForm onSubmit={onSubmit}>
        <RruMultiSelectInput name='colors' label='Colors' options={groupedOptions} />
        <button type='submit'>Submit</button>
      </RruForm>
    );

    // select options from different groups
    await selectOption(container, 'Red');
    await selectOption(container, 'Blue');

    // submit the form
    await submitForm(container);

    // validation
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1);
      expect(onSubmit.mock.calls[0][0].colors.sort()).toEqual(['RED', 'BLUE'].sort());
    });
  });

});
