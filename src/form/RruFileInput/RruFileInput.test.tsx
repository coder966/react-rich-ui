import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { RruForm } from '../RruForm/RruForm';
import { RruFileInput } from './RruFileInput';

describe('RruFileInput', () => {

  it('should render correctly', async () => {
    // prepare
    const onSubmit = jest.fn();

    // render
    const { container } = render(
      <RruForm onSubmit={onSubmit}>
        <RruFileInput name='attachment' label='Attachment' />
        <button type='submit'>Submit</button>
      </RruForm >
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
      </RruForm >
    );

    // fill the form
    const file = new File(["cat"], "cat.png", { type: "image/png" });
    const fileInput = container.querySelector('input[name="attachment"]') as HTMLElement;
    fileInput && await userEvent.upload(fileInput, file);

    // submit the form
    const submitButton = container.querySelector('button[type="submit"]');
    submitButton && await userEvent.click(submitButton);

    // validation
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit.mock.calls[0][0]).toBeTruthy();
    expect(onSubmit.mock.calls[0][0].attachment[0]).toBeTruthy();
  });

})
