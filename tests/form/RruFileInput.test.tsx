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

import { act, render, renderHook, waitFor } from '@testing-library/react';
import * as yup from 'yup';
import { RruFileInput, RruForm, useRruForm } from '../../src';
import { submitForm, selectFile, expectSelectedFileIsRendered } from '../__utils__/form-utils';

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

    await selectFile(container, 'attachment', 'cat.png');

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

  it('should render and submit the initial value', async () => {
    // prepare
    const onSubmit = jest.fn();
    const initialValues = {
      attachment: {
        name: 'cat.png',
      },
    };

    // render
    const { container } = render(
      <RruForm onSubmit={onSubmit} initialValues={initialValues}>
        <RruFileInput name='attachment' label='Attachment' />
        <button type='submit'>Submit</button>
      </RruForm>
    );

    expectSelectedFileIsRendered(container, 'attachment', 'cat.png');

    // submit the form
    await submitForm(container);

    // validation
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit.mock.calls[0][0]).toBeTruthy();
    expect(onSubmit.mock.calls[0][0].attachment).toBeTruthy();
    expect(onSubmit.mock.calls[0][0].attachment.name).toEqual('cat.png');
  });

  it('should accept a new value after the initial value', async () => {
    // prepare
    const onSubmit = jest.fn();
    const initialValues = {
      attachment: {
        name: 'cat.png',
      },
    };

    // render
    const { container } = render(
      <RruForm onSubmit={onSubmit} initialValues={initialValues}>
        <RruFileInput name='attachment' label='Attachment' />
        <button type='submit'>Submit</button>
      </RruForm>
    );

    // submit the form
    await submitForm(container);

    // validation
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit.mock.calls[0][0]).toBeTruthy();
    expect(onSubmit.mock.calls[0][0].attachment).toBeTruthy();
    expect(onSubmit.mock.calls[0][0].attachment.name).toEqual('cat.png');

    await selectFile(container, 'attachment', 'bee.png');

    expectSelectedFileIsRendered(container, 'attachment', 'bee.png');

    // submit the form
    await submitForm(container);

    // validation
    expect(onSubmit).toHaveBeenCalledTimes(2);
    expect(onSubmit.mock.calls[1][0]).toBeTruthy();
    expect(onSubmit.mock.calls[1][0].attachment).toBeTruthy();
    expect(onSubmit.mock.calls[1][0].attachment.name).toEqual('bee.png');
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
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(0);
      const formGroup = container.querySelector('[data-field-name="attachment"]');
      expect(formGroup?.getAttribute('data-field-error')).toBe('Attachment is required');
    });

    await selectFile(container, 'attachment', 'cat.png');

    // submit the form
    await submitForm(container);

    // validation for valid input
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1);
      expect(onSubmit.mock.calls[0][0]).toBeTruthy();
      expect(onSubmit.mock.calls[0][0].attachment).toBeTruthy();
      expect(onSubmit.mock.calls[0][0].attachment.name).toEqual('cat.png');
    });
  });

  it('should watch the input', async () => {
    // prepare
    const onSubmit = jest.fn();
    const onInputChange = jest.fn();
    const initialValues = {
      attachment: {
        name: 'cat.png',
      },
    };

    // render
    const { container } = render(
      <RruForm initialValues={initialValues} onSubmit={onSubmit}>
        <RruFileInput name='attachment' label='Attachment' onChange={onInputChange} />
        <button type='submit'>Submit</button>
      </RruForm>
    );

    // validation for the initial value
    expect(onInputChange).toHaveBeenCalledTimes(1);
    expect(onInputChange.mock.calls[0][0]).toBeTruthy();
    expect(onInputChange.mock.calls[0][0]).toBeTruthy();
    expect(onInputChange.mock.calls[0][0].name).toEqual('cat.png');

    await selectFile(container, 'attachment', 'bee.png');

    // validation for a new value
    expect(onInputChange).toHaveBeenCalledTimes(2);
    expect(onInputChange.mock.calls[1][0]).toBeTruthy();
    expect(onInputChange.mock.calls[1][0]).toBeTruthy();
    expect(onInputChange.mock.calls[1][0].name).toEqual('bee.png');
  });

  it('should reflect manual values set via the form context', async () => {
    // prepare
    const onSubmit = jest.fn();
    const initialValues = {
      attachment: {
        name: 'cat.png',
      },
    };

    // render
    const { result: formContext } = renderHook(useRruForm);
    const { container } = render(
      <RruForm context={formContext.current} onSubmit={onSubmit} initialValues={initialValues}>
        <RruFileInput name='attachment' label='Attachment' />
        <button type='submit'>Submit</button>
      </RruForm>
    );

    expect(formContext.current.getFieldValue('attachment')).toEqual({
      name: 'cat.png',
    });

    await act(async () =>
      formContext.current.setFieldValue('attachment', {
        name: 'bee.png',
      })
    );
    expect(formContext.current.getFieldValue('attachment')).toEqual({
      name: 'bee.png',
    });

    expectSelectedFileIsRendered(container, 'attachment', 'bee.png');

    // submit the form
    await submitForm(container);

    // validation
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit.mock.calls[0][0]).toBeTruthy();
    expect(onSubmit.mock.calls[0][0].attachment).toBeTruthy();
    expect(onSubmit.mock.calls[0][0].attachment.name).toEqual('bee.png');
  });
});
