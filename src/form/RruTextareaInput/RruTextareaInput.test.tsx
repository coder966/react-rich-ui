import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import * as yup from 'yup';
import { RruForm } from '../RruForm/RruForm';
import { RruTextareaInput } from './RruTextareaInput';

describe('RruTextareaInput', () => {

  it('should render correctly', async () => {
    // prepare
    const onSubmit = jest.fn();

    // render
    const {container} = render(
      <RruForm onSubmit={onSubmit}>
        <RruTextareaInput name='myText' label='My Text' dir='rtl' />
        <button type='submit'>Submit</button>
      </RruForm >
    );

    const myTextInput = container.querySelector('textarea[name="myText"]');

    expect(myTextInput).toBeTruthy();
    expect(myTextInput?.getAttribute('dir')).toEqual('rtl');
  });

  it('should submit the entered value', async () => {
    // prepare
    const onSubmit = jest.fn();

    // render
    const {container} = render(
      <RruForm onSubmit={onSubmit}>
        <RruTextareaInput name='myText' label='My Text' />
        <button type='submit'>Submit</button>
      </RruForm >
    );

    // fill the form
    const myTextInput = container.querySelector('textarea[name="myText"]');
    myTextInput && await userEvent.click(myTextInput);
    await userEvent.keyboard('My awesome post');

    // submit the form
    const submitButton = container.querySelector('button[type="submit"]');
    submitButton && await userEvent.click(submitButton);

    // validation
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit.mock.calls[0][0]).toEqual({
      myText: 'My awesome post'
    });
  });

  it('should submit empty string (not null) for when no data is entered', async () => {
    // prepare
    const onSubmit = jest.fn();

    // render
    const {container} = render(
      <RruForm onSubmit={onSubmit}>
        <RruTextareaInput name='myText' label='My Text' />
        <button type='submit'>Submit</button>
      </RruForm >
    );

    // submit the form
    const submitButton = container.querySelector('button[type="submit"]');
    submitButton && await userEvent.click(submitButton);

    // validation
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit.mock.calls[0][0]).toEqual({
      myText: ''
    });
  });

  it('should render and submit the initial value', async () => {
    // prepare
    const onSubmit = jest.fn();
    const initialValues = {
      myText: 'My awesome post'
    }

    // render
    const {container} = render(
      <RruForm onSubmit={onSubmit} initialValues={initialValues}>
        <RruTextareaInput name='myText' label='My Text' />
        <button type='submit'>Submit</button>
      </RruForm >
    );

    // validate initial value is rendered inside the input field
    expect(screen.getByDisplayValue('My awesome post')).toBeTruthy();

    // submit the form
    const submitButton = container.querySelector('button[type="submit"]');
    submitButton && await userEvent.click(submitButton);

    // validation
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit.mock.calls[0][0]).toEqual({
      myText: 'My awesome post'
    });
  });

  it('should accept a new value after the initial value', async () => {
    // prepare
    const onSubmit = jest.fn();
    const initialValues = {
      myText: 'My awesome post'
    }

    // render
    const {container} = render(
      <RruForm onSubmit={onSubmit} initialValues={initialValues}>
        <RruTextareaInput name='myText' label='My Text' />
        <button type='submit'>Submit</button>
      </RruForm >
    );

    // fill the form
    const myTextInput = container.querySelector('textarea[name="myText"]');
    if(myTextInput){
      // delete the current value in the input element
      await userEvent.tripleClick(myTextInput);
      await userEvent.keyboard('{Backspace}');
      // type in the new value
      await userEvent.keyboard('This is a long paragraph');

    }

    // submit the form
    const submitButton = container.querySelector('button[type="submit"]');
    submitButton && await userEvent.click(submitButton);

    // validation
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit.mock.calls[0][0]).toEqual({
      myText: 'This is a long paragraph'
    });
  });

  it('should validate the input', async () => {
    // prepare
    const onSubmit = jest.fn();
    const validationSchema = yup.object().shape({
      myText: yup.string().min(20, 'The text you entered is too short.'),
    });
  
    // render
    const {container} = render(
      <RruForm onSubmit={onSubmit} validationSchema={validationSchema}>
        <RruTextareaInput name='myText' label='My Text' />
        <button type='submit'>Submit</button>
      </RruForm >
    );

    // fill the form with bad input
    const myTextInput = container.querySelector('textarea[name="myText"]');
    myTextInput && await userEvent.click(myTextInput);
    await userEvent.keyboard('Too short text');

    // submit the form
    const submitButton = container.querySelector('button[type="submit"]');
    submitButton && await userEvent.click(submitButton);

    // validation for bad input
    expect(onSubmit).toHaveBeenCalledTimes(0);
    expect(myTextInput?.getAttribute('class')).toContain('is-invalid');
    expect(screen.getByText('The text you entered is too short.')).toBeTruthy();


    // delete the current value in the input element
    myTextInput && await userEvent.tripleClick(myTextInput);
    await userEvent.keyboard('{Backspace}');
    // type in the new value
    await userEvent.keyboard('This is a long paragraph');

    // submit the form
    submitButton && await userEvent.click(submitButton);

    // validation for valid input
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit.mock.calls[0][0]).toEqual({
      myText: 'This is a long paragraph'
    });
  });

  it('should watch the input', async () => {
    // prepare
    const onSubmit = jest.fn();
    const watcher = jest.fn();
    const initialValues = {
      myText: 'My awesome post'
    }

    // render
    const {container} = render(
      <RruForm initialValues={initialValues} onSubmit={onSubmit} watch={['myText']} watcher={watcher}>
        <RruTextareaInput name='myText' label='My Text' />
        <button type='submit'>Submit</button>
      </RruForm >
    );

    // validation for the initial value
    expect(watcher).toHaveBeenCalledTimes(1);
    expect(watcher.mock.calls[0][0]).toEqual({
      myText: 'My awesome post'
    });

    const myTextInput = container.querySelector('textarea[name="myText"]');

    // delete the current value in the input element
    myTextInput && await userEvent.tripleClick(myTextInput);
    await userEvent.keyboard('{Backspace}');
    // type in the new value
    await userEvent.keyboard('This is a long paragraph');

    // validation for a new value
    expect(watcher).toHaveBeenCalledTimes(26);
    return expect(watcher.mock.calls[25][0]).toEqual({
      myText: 'This is a long paragraph'
    });
  });

})
