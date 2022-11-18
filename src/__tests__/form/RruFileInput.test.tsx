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

import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import RruFileInput from '../../form/RruFileInput/RruFileInput';
import RruForm from '../../form/RruForm/RruForm';
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

    // fill the form
    const file = new File(['cat'], 'cat.png', { type: 'image/png' });
    const fileInput = container.querySelector('input[name="attachment"]') as HTMLElement;
    fileInput && (await userEvent.upload(fileInput, file));

    // submit the form
    await submitForm(container);

    // validation
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit.mock.calls[0][0]).toBeTruthy();
    expect(onSubmit.mock.calls[0][0].attachment).toBeTruthy();
  });
});
