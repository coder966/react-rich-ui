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
import { RruDateTimeInput, RruForm, useRruForm } from '../../src';
import { submitForm, selectDate, expectSelectedDateIsRendered } from '../__utils__/form-utils';

describe('RruDateTimeInput', () => {
  it('should render and submit correctly (mode = date)', async () => {
    // prepare
    const onSubmit = jest.fn();

    // render
    const { container } = render(
      <RruForm onSubmit={onSubmit}>
        <RruDateTimeInput name='birthDate' label='Birth Date' mode='date' />
        <button type='submit'>Submit</button>
      </RruForm>
    );

    expectSelectedDateIsRendered(container, 'birthDate', null);

    await selectDate(container, 'birthDate', '2020-05-12');

    expectSelectedDateIsRendered(container, 'birthDate', '2020-05-12');

    // submit the form
    await submitForm(container);

    // validation
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit.mock.calls[0][0]).toEqual({
      birthDate: '2020-05-12',
    });
  });

  it('should render and submit correctly (mode = datetime)', async () => {
    // prepare
    const onSubmit = jest.fn();

    // render
    const { container } = render(
      <RruForm onSubmit={onSubmit}>
        <RruDateTimeInput name='birthDate' label='Birth Date' mode='datetime' />
        <button type='submit'>Submit</button>
      </RruForm>
    );

    expectSelectedDateIsRendered(container, 'birthDate', null);

    await selectDate(container, 'birthDate', '2020-05-12', '15:12:13');

    expectSelectedDateIsRendered(container, 'birthDate', '2020-05-12 15:12:13');

    // submit the form
    await submitForm(container);

    // validation
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit.mock.calls[0][0]).toEqual({
      birthDate: '2020-05-12 15:12:13',
    });
  });

  it('should submit null for when no data is entered', async () => {
    // prepare
    const onSubmit = jest.fn();

    // render
    const { container } = render(
      <RruForm onSubmit={onSubmit}>
        <RruDateTimeInput name='birthDate' label='Birth Date' />
        <button type='submit'>Submit</button>
      </RruForm>
    );

    // submit the form
    await submitForm(container);

    // validation
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit.mock.calls[0][0]).toEqual({
      birthDate: null,
    });
  });

  it('should render and submit the initial value', async () => {
    // prepare
    const onSubmit = jest.fn();
    const initialValues = {
      birthDate: '2020-05-12 15:12:13',
    };

    // render
    const { container } = render(
      <RruForm onSubmit={onSubmit} initialValues={initialValues}>
        <RruDateTimeInput name='birthDate' label='Birth Date' />
        <button type='submit'>Submit</button>
      </RruForm>
    );

    // validate initial value is rendered inside the input field
    expectSelectedDateIsRendered(container, 'birthDate', '2020-05-12 15:12:13');

    // submit the form
    await submitForm(container);

    // validation
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit.mock.calls[0][0]).toEqual({
      birthDate: '2020-05-12 15:12:13',
    });
  });

  it('should accept a new value after the initial value', async () => {
    // prepare
    const onSubmit = jest.fn();
    const initialValues = {
      birthDate: '2024-01-03 09:07:05',
    };

    // render
    const { container } = render(
      <RruForm onSubmit={onSubmit} initialValues={initialValues}>
        <RruDateTimeInput name='birthDate' label='Birth Date' />
        <button type='submit'>Submit</button>
      </RruForm>
    );

    expectSelectedDateIsRendered(container, 'birthDate', '2024-01-03 09:07:05');

    // fill the form
    await selectDate(container, 'birthDate', '2020-05-12', '15:12:13');

    expectSelectedDateIsRendered(container, 'birthDate', '2020-05-12 15:12:13');

    // submit the form
    await submitForm(container);

    // validation
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit.mock.calls[0][0]).toEqual({
      birthDate: '2020-05-12 15:12:13',
    });
  });

  it('should validate the input', async () => {
    // prepare
    const onSubmit = jest.fn();
    const yupValidationSchema = yup.object().shape({
      birthDate: yup
        .date()
        .nullable()
        .required('The date is required')
        .min('2020-01-01', 'The date is too old')
        .max('2024-01-01', 'The date is too new'),
    });

    // render
    const { container } = render(
      <RruForm onSubmit={onSubmit} yupValidationSchema={yupValidationSchema}>
        <RruDateTimeInput name='birthDate' label='Birth Date' mode='date' />
        <button type='submit'>Submit</button>
      </RruForm>
    );

    // fill the form with bad input
    await selectDate(container, 'birthDate', '2019-05-12');

    // submit the form
    await submitForm(container);

    // validation for bad input
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(0);
      const formGroup = container.querySelector('[data-field-name="birthDate"]');
      expect(formGroup?.getAttribute('data-field-error')).toBe('The date is too old');
    });

    // delete the current value in the input element
    await selectDate(container, 'birthDate', '2020-05-12');

    // submit the form
    await submitForm(container);

    // validation for valid input
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1);
      expect(onSubmit.mock.calls[0][0]).toEqual({
        // because using YUP validation schema causes the value to be casted to Date object
        // TODO: This is a bug in react-hook-form, open PR
        birthDate: new Date('2020-05-12T00:00:00'),
      });
    });
  });

  it('should watch the input', async () => {
    // prepare
    const onSubmit = jest.fn();
    const onBirthDateChange = jest.fn();
    const initialValues = {
      birthDate: '2020-05-12 15:12:13',
    };

    // render
    const { container } = render(
      <RruForm initialValues={initialValues} onSubmit={onSubmit}>
        <RruDateTimeInput name='birthDate' label='Birth Date' onChange={onBirthDateChange} />
        <button type='submit'>Submit</button>
      </RruForm>
    );

    // validation for the initial value
    expect(onBirthDateChange).toHaveBeenCalledTimes(1);
    expect(onBirthDateChange.mock.calls[0][0]).toEqual('2020-05-12 15:12:13');

    await selectDate(container, 'birthDate', '2019-01-10', '03:01:18');

    // validation for a new value
    expect(onBirthDateChange).toHaveBeenCalledTimes(2);
    expect(onBirthDateChange.mock.calls[1][0]).toEqual('2019-01-10 03:01:18');
  });

  it('should reflect manual values set via the form context', async () => {
    // prepare
    const onSubmit = jest.fn();
    const initialValues = {
      birthDate: '2024-01-03 09:07:05',
    };

    // render
    const { result: formContext } = renderHook(useRruForm);
    const { container } = render(
      <RruForm context={formContext.current} onSubmit={onSubmit} initialValues={initialValues}>
        <RruDateTimeInput name='birthDate' label='Birth Date' />
        <button type='submit'>Submit</button>
      </RruForm>
    );

    expect(formContext.current.getFieldValue('birthDate')).toEqual('2024-01-03 09:07:05');
    await act(async () => formContext.current.setFieldValue('birthDate', '2019-01-10 03:01:18'));
    expect(formContext.current.getFieldValue('birthDate')).toEqual('2019-01-10 03:01:18');

    expectSelectedDateIsRendered(container, 'birthDate', '2019-01-10 03:01:18');

    // submit the form
    await submitForm(container);

    // validation
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit.mock.calls[0][0]).toEqual({
      birthDate: '2019-01-10 03:01:18',
    });
  });
});
