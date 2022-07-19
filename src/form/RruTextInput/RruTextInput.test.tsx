import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import * as yup from 'yup';
import RruForm from '../RruForm/RruForm';
import RruTextInput from './RruTextInput';

describe('RruTextInput', () => {

  it('should render correctly', async () => {
    // prepare
    const onSubmit = jest.fn();

    // render
    const { container } = render(
      <RruForm onSubmit={onSubmit}>
        <RruTextInput name='email' label='Email Address' dir='rtl' />
        <button type='submit'>Submit</button>
      </RruForm >
    );

    const emailInput = container.querySelector('input[name="email"]');

    expect(emailInput).toBeTruthy();
    expect(emailInput?.getAttribute('dir')).toEqual('rtl');
  });

  it('should submit the entered value', async () => {
    // prepare
    const onSubmit = jest.fn();

    // render
    const { container } = render(
      <RruForm onSubmit={onSubmit}>
        <RruTextInput name='email' label='Email Address' />
        <button type='submit'>Submit</button>
      </RruForm >
    );

    // fill the form
    const emailInput = container.querySelector('input[name="email"]');
    emailInput && await userEvent.click(emailInput);
    await userEvent.keyboard('khalid@test.com');

    // submit the form
    const submitButton = container.querySelector('button[type="submit"]');
    submitButton && await userEvent.click(submitButton);

    // validation
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit.mock.calls[0][0]).toEqual({
      email: 'khalid@test.com'
    });
  });

  it('should submit empty string (not null) for when no data is entered', async () => {
    // prepare
    const onSubmit = jest.fn();

    // render
    const { container } = render(
      <RruForm onSubmit={onSubmit}>
        <RruTextInput name='email' label='Email Address' />
        <button type='submit'>Submit</button>
      </RruForm >
    );

    // submit the form
    const submitButton = container.querySelector('button[type="submit"]');
    submitButton && await userEvent.click(submitButton);

    // validation
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit.mock.calls[0][0]).toEqual({
      email: ''
    });
  });

  it('should render and submit the initial value', async () => {
    // prepare
    const onSubmit = jest.fn();
    const initialValues = {
      email: 'khalid@test.com'
    }

    // render
    const { container } = render(
      <RruForm onSubmit={onSubmit} initialValues={initialValues}>
        <RruTextInput name='email' label='Email Address' />
        <button type='submit'>Submit</button>
      </RruForm >
    );

    // validate initial value is rendered inside the input field
    expect(screen.getByDisplayValue('khalid@test.com')).toBeTruthy();

    // submit the form
    const submitButton = container.querySelector('button[type="submit"]');
    submitButton && await userEvent.click(submitButton);

    // validation
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit.mock.calls[0][0]).toEqual({
      email: 'khalid@test.com'
    });
  });

  it('should accept a new value after the initial value', async () => {
    // prepare
    const onSubmit = jest.fn();
    const initialValues = {
      email: 'khalid@test.com'
    }

    // render
    const { container } = render(
      <RruForm onSubmit={onSubmit} initialValues={initialValues}>
        <RruTextInput name='email' label='Email Address' />
        <button type='submit'>Submit</button>
      </RruForm >
    );

    // fill the form
    const emailInput = container.querySelector('input[name="email"]');
    if (emailInput) {
      // delete the current value in the input element
      await userEvent.tripleClick(emailInput);
      await userEvent.keyboard('{Backspace}');
      // type in the new value
      await userEvent.keyboard('mohammed@test.com');

    }

    // submit the form
    const submitButton = container.querySelector('button[type="submit"]');
    submitButton && await userEvent.click(submitButton);

    // validation
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit.mock.calls[0][0]).toEqual({
      email: 'mohammed@test.com'
    });
  });

  it('should validate the input', async () => {
    // prepare
    const onSubmit = jest.fn();
    const validationSchema = yup.object().shape({
      email: yup.string().matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,7}$/, 'The email address is incorrect'),
    });

    // render
    const { container } = render(
      <RruForm onSubmit={onSubmit} validationSchema={validationSchema}>
        <RruTextInput name='email' label='Email Address' />
        <button type='submit'>Submit</button>
      </RruForm >
    );

    // fill the form with bad input
    const emailInput = container.querySelector('input[name="email"]');
    emailInput && await userEvent.click(emailInput);
    await userEvent.keyboard('test_bad_email');

    // submit the form
    const submitButton = container.querySelector('button[type="submit"]');
    submitButton && await userEvent.click(submitButton);

    // validation for bad input
    expect(onSubmit).toHaveBeenCalledTimes(0);
    expect(emailInput?.getAttribute('class')).toContain('is-invalid');
    expect(screen.getByText('The email address is incorrect')).toBeTruthy();


    // delete the current value in the input element
    emailInput && await userEvent.tripleClick(emailInput);
    await userEvent.keyboard('{Backspace}');
    // type in the new value
    await userEvent.keyboard('khalid@test.com');

    // submit the form
    submitButton && await userEvent.click(submitButton);

    // validation for valid input
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit.mock.calls[0][0]).toEqual({
      email: 'khalid@test.com'
    });
  });

  it('should watch the input', async () => {
    // prepare
    const onSubmit = jest.fn();
    const watcher = jest.fn();
    const initialValues = {
      email: 'khalid@test.com'
    }

    // render
    const { container } = render(
      <RruForm initialValues={initialValues} onSubmit={onSubmit} watch={['email']} watcher={watcher}>
        <RruTextInput name='email' label='Email Address' />
        <button type='submit'>Submit</button>
      </RruForm >
    );

    // validation for the initial value
    expect(watcher).toHaveBeenCalledTimes(1);
    expect(watcher.mock.calls[0][0]).toEqual({
      email: 'khalid@test.com'
    });

    const emailInput = container.querySelector('input[name="email"]');

    // delete the current value in the input element
    emailInput && await userEvent.tripleClick(emailInput);
    await userEvent.keyboard('{Backspace}');
    // type in the new value
    await userEvent.keyboard('test@test.com');

    // validation for a new value
    expect(watcher).toHaveBeenCalledTimes(15);
    return expect(watcher.mock.calls[14][0]).toEqual({
      email: 'test@test.com'
    });
  });

})
