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

import { screen } from '@testing-library/dom';
import { render } from '@testing-library/react';
import React from 'react';
import * as yup from 'yup';
import colorsOptions from '../../../stories/data/colorsOptions';
import RruForm from '../../form/RruForm/RruForm';
import RruSelectInput from '../../form/RruSelectInput/RruSelectInput';
import selectOption from '../__utils__/selectOption';
import submitForm from '../__utils__/submitForm';

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

    await selectOption(container, 'Orange');

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

    await selectOption(container, 'Blue');

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
    expect(onSubmit).toHaveBeenCalledTimes(0);
    expect(screen.getByText('You must select a color')).toBeTruthy();

    // change
    await selectOption(container, 'Orange');

    // submit the form
    await submitForm(container);

    // validation for valid input
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit.mock.calls[0][0]).toEqual({
      color: 'ORANGE',
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

    await selectOption(container, 'Blue');

    // validation for a new value
    expect(onInputChange).toHaveBeenCalledTimes(2);
    return expect(onInputChange.mock.calls[1][0]).toEqual('BLUE');
  });
});
