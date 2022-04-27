import { render, screen } from '@testing-library/react';
import React from 'react';
import { asyncFireChangeEvent, asyncFireClickEvent } from '../../test-utils';
import { RruForm } from '../react-rich-ui-form';
import { RruTextInput } from './RruTextInput';

describe('RruTextInput', () => {

  it('should submit the entered value', async () => {
    // prepare
    const onSubmit = jest.fn();

    // render
    const {container} = render(
      <RruForm onSubmit={onSubmit}>
        <RruTextInput name='email' label='Email Address' />
        <button type='submit'>Submit</button>
      </RruForm >
    );

    // fill the form
    const emailInput = container.querySelector('input[name="email"]');
    await asyncFireChangeEvent(emailInput, {target: {value: 'khalid@test.com'}});

    // submit the form
    const submitButton = container.querySelector('button[type="submit"]');
    await asyncFireClickEvent(submitButton);

    // validation
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit.mock.calls[0][0]).toEqual({
      email: 'khalid@test.com'
    });
  });

  it('should render and submit the initial value', async () => {
    // prepare
    const onSubmit = jest.fn();
    const initialValues = {
      email: 'khalid@test.com'
    }

    // render
    const {container} = render(
      <RruForm onSubmit={onSubmit} initialValues={initialValues}>
        <RruTextInput name='email' label='Email Address' />
        <button type='submit'>Submit</button>
      </RruForm >
    );

    // validate initial value is rendered inside the input field
    expect(screen.getByDisplayValue('khalid@test.com')).toBeTruthy();

    // submit the form
    const submitButton = container.querySelector('button[type="submit"]');
    await asyncFireClickEvent(submitButton);

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
    const {container} = render(
      <RruForm onSubmit={onSubmit} initialValues={initialValues}>
        <RruTextInput name='email' label='Email Address' />
        <button type='submit'>Submit</button>
      </RruForm >
    );

    // fill the form
    const emailInput = container.querySelector('input[name="email"]');
    await asyncFireChangeEvent(emailInput, {target: {value: 'mohammed@test.com'}});

    // submit the form
    const submitButton = container.querySelector('button[type="submit"]');
    await asyncFireClickEvent(submitButton);

    // validation
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit.mock.calls[0][0]).toEqual({
      email: 'mohammed@test.com'
    });
  });


// TODO: validation schema
// TODO: watcher

})
