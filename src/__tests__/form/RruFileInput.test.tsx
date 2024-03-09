/*
 * Copyright 2020 Khalid H. Alharisi
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or attachmentd to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import * as yup from 'yup';
import RruFileInput from '../../form/RruFileInput/RruFileInput';
import RruForm from '../../form/RruForm/RruForm';
import selectFile from '../__utils__/selectFile';
import submitForm from '../__utils__/submitForm';

describe('RruFileInput', () => {
  it('should render correctly', async () => {
    // prepare
    const onSubmit = jest.fn();

    // render
    const { container } = render(
      <RruForm onSubmit={onSubmit}>
        <RruFileInput name='attachment' label='Attachment' />
        <button type='submit'>Submit</button>
      </RruForm>
    );

    const fileInput = container.querySelector('input[name="attachment"]');

    expect(fileInput).toBeTruthy();
  });

  it('should submit the entered value', async () => {
    // prepare
    const onSubmit = jest.fn();

    // render
    const { container } = render(
      <RruForm onSubmit={onSubmit}>
        <RruFileInput name='attachment' label='Attachment' />
        <button type='submit'>Submit</button>
      </RruForm>
    );

    await selectFile(container, 'cat.png');

    // submit the form
    await submitForm(container);

    // validation
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit.mock.calls[0][0]).toBeTruthy();
    expect(onSubmit.mock.calls[0][0].attachment).toBeTruthy();
    expect(onSubmit.mock.calls[0][0].attachment.name).toEqual('cat.png');
  });

  it('should submit null for when no data is entered', async () => {
    // prepare
    const onSubmit = jest.fn();

    // render
    const { container } = render(
      <RruForm onSubmit={onSubmit}>
        <RruFileInput name='attachment' label='Attachment' />
        <button type='submit'>Submit</button>
      </RruForm>
    );

    // submit the form
    await submitForm(container);

    // validation
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit.mock.calls[0][0]).toBeTruthy();
    expect(onSubmit.mock.calls[0][0].attachment).toEqual(null);
  });

  it('should validate the input', async () => {
    // prepare
    const onSubmit = jest.fn();
    const yupValidationSchema = yup.object().shape({
      attachment: yup
        .mixed()
        .nullable()
        .test('test is file present', 'Attachment is required', (file) => {
          return file !== null;
        })
        .test('test is file size too big', 'File size is too big', (file) => {
          return file !== null && (file as File).size < 100 * 1024; // 100 kB
        }),
    });

    // render
    const { container } = render(
      <RruForm onSubmit={onSubmit} yupValidationSchema={yupValidationSchema}>
        <RruFileInput name='attachment' label='Attachment' />
        <button type='submit'>Submit</button>
      </RruForm>
    );

    // submit the form
    await submitForm(container);

    // validation for bad input
    expect(onSubmit).toHaveBeenCalledTimes(0);
    expect(screen.getByText('Attachment is required')).toBeTruthy();

    await selectFile(container, 'cat.png');

    // submit the form
    await submitForm(container);

    // validation for valid input
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit.mock.calls[0][0]).toBeTruthy();
    expect(onSubmit.mock.calls[0][0].attachment).toBeTruthy();
    expect(onSubmit.mock.calls[0][0].attachment.name).toEqual('cat.png');
  });
});
