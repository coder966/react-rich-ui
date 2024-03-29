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
import RruForm from '../../src/form/RruForm/RruForm';
import RruTextareaInput from '../../src/form/RruTextareaInput/RruTextareaInput';
import { useRruForm } from '../../src/form/hooks/useRruForm';
import submitForm from '../__utils__/submitForm';

describe('RruTextareaInput', () => {
  it('should render correctly', async () => {
    // prepare
    const onSubmit = jest.fn();

    // render
    const { container } = render(
      <RruForm onSubmit={onSubmit}>
        <RruTextareaInput name='myText' label='My Text' dir='rtl' />
        <button type='submit'>Submit</button>
      </RruForm>
    );

    const myTextInput = container.querySelector('textarea[name="myText"]');

    expect(myTextInput).toBeTruthy();
    expect(myTextInput?.getAttribute('dir')).toEqual('rtl');
  });

  it('should submit the entered value', async () => {
    // prepare
    const onSubmit = jest.fn();

    // render
    const { container } = render(
      <RruForm onSubmit={onSubmit}>
        <RruTextareaInput name='myText' label='My Text' />
        <button type='submit'>Submit</button>
      </RruForm>
    );

    // fill the form
    const myTextInput = container.querySelector('textarea[name="myText"]');
    myTextInput && (await userEvent.click(myTextInput));
    await userEvent.keyboard('My awesome post');

    // submit the form
    await submitForm(container);

    // validation
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit.mock.calls[0][0]).toEqual({
      myText: 'My awesome post',
    });
  });

  it('should submit empty null for when no data is entered', async () => {
    // prepare
    const onSubmit = jest.fn();

    // render
    const { container } = render(
      <RruForm onSubmit={onSubmit}>
        <RruTextareaInput name='myText' label='My Text' />
        <button type='submit'>Submit</button>
      </RruForm>
    );

    // submit the form
    await submitForm(container);

    // validation
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit.mock.calls[0][0]).toEqual({
      myText: null,
    });
  });

  it('should render and submit the initial value', async () => {
    // prepare
    const onSubmit = jest.fn();
    const initialValues = {
      myText: 'My awesome post',
    };

    // render
    const { container } = render(
      <RruForm onSubmit={onSubmit} initialValues={initialValues}>
        <RruTextareaInput name='myText' label='My Text' />
        <button type='submit'>Submit</button>
      </RruForm>
    );

    // validate initial value is rendered inside the input field
    expect(screen.getByDisplayValue('My awesome post')).toBeTruthy();

    // submit the form
    await submitForm(container);

    // validation
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit.mock.calls[0][0]).toEqual({
      myText: 'My awesome post',
    });
  });

  it('should accept a new value after the initial value', async () => {
    // prepare
    const onSubmit = jest.fn();
    const initialValues = {
      myText: 'My awesome post',
    };

    // render
    const { container } = render(
      <RruForm onSubmit={onSubmit} initialValues={initialValues}>
        <RruTextareaInput name='myText' label='My Text' />
        <button type='submit'>Submit</button>
      </RruForm>
    );

    // fill the form
    const myTextInput = container.querySelector('textarea[name="myText"]');
    if (myTextInput) {
      // delete the current value in the input element
      await userEvent.tripleClick(myTextInput);
      await userEvent.keyboard('{Backspace}');
      // type in the new value
      await userEvent.keyboard('This is a long paragraph');
    }

    // submit the form
    await submitForm(container);

    // validation
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit.mock.calls[0][0]).toEqual({
      myText: 'This is a long paragraph',
    });
  });

  it('should validate the input', async () => {
    // prepare
    const onSubmit = jest.fn();
    const yupValidationSchema = yup.object().shape({
      myText: yup.string().min(20, 'The text you entered is too short.'),
    });

    // render
    const { container } = render(
      <RruForm onSubmit={onSubmit} yupValidationSchema={yupValidationSchema}>
        <RruTextareaInput name='myText' label='My Text' />
        <button type='submit'>Submit</button>
      </RruForm>
    );

    // fill the form with bad input
    const myTextInput = container.querySelector('textarea[name="myText"]');
    myTextInput && (await userEvent.click(myTextInput));
    await userEvent.keyboard('Too short text');

    // submit the form
    await submitForm(container);

    // validation for bad input
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(0);
      expect(myTextInput?.getAttribute('class')).toContain('is-invalid');
      expect(screen.getByText('The text you entered is too short.')).toBeTruthy();
    });

    // delete the current value in the input element
    myTextInput && (await userEvent.tripleClick(myTextInput));
    await userEvent.keyboard('{Backspace}');
    // type in the new value
    await userEvent.keyboard('This is a long paragraph');

    // submit the form
    await submitForm(container);

    // validation for valid input
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1);
      expect(onSubmit.mock.calls[0][0]).toEqual({
        myText: 'This is a long paragraph',
      });
    });
  });

  it('should watch the input', async () => {
    // prepare
    const onSubmit = jest.fn();
    const onMyTextChange = jest.fn();
    const initialValues = {
      myText: 'My awesome post',
    };

    // render
    const { container } = render(
      <RruForm initialValues={initialValues} onSubmit={onSubmit}>
        <RruTextareaInput name='myText' label='My Text' onChange={onMyTextChange} />
        <button type='submit'>Submit</button>
      </RruForm>
    );

    // validation for the initial value
    expect(onMyTextChange).toHaveBeenCalledTimes(1);
    expect(onMyTextChange.mock.calls[0][0]).toEqual('My awesome post');

    const myTextInput = container.querySelector('textarea[name="myText"]');

    // delete the current value in the input element
    myTextInput && (await userEvent.tripleClick(myTextInput));
    await userEvent.keyboard('{Backspace}');
    // type in the new value
    await userEvent.keyboard('This is a long paragraph');

    // validation for a new value
    expect(onMyTextChange).toHaveBeenCalledTimes(26);
    expect(onMyTextChange.mock.calls[25][0]).toEqual('This is a long paragraph');
  });

  it('should reflect manual values set via the form context', async () => {
    // prepare
    const onSubmit = jest.fn();
    const initialValues = {
      myText: 'My awesome post',
    };

    // render
    const { result: formContext } = renderHook(useRruForm);
    const { container } = render(
      <RruForm context={formContext.current} onSubmit={onSubmit} initialValues={initialValues}>
        <RruTextareaInput name='myText' label='My Text' />
        <button type='submit'>Submit</button>
      </RruForm>
    );

    expect(formContext.current.getFieldValue('myText')).toEqual('My awesome post');
    await act(async () => formContext.current.setFieldValue('myText', 'This is a long paragraph'));
    expect(formContext.current.getFieldValue('myText')).toEqual('This is a long paragraph');
    expect(container.querySelector('[data-field-value="This is a long paragraph"]')).toBeTruthy();

    // submit the form
    await submitForm(container);

    // validation
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit.mock.calls[0][0]).toEqual({
      myText: 'This is a long paragraph',
    });
  });
});
