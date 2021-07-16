import { action } from '@storybook/addon-actions';
import { Meta } from '@storybook/react';
import React, { useState } from 'react';
import * as yup from 'yup';
import '../src/button/style.css';
import { RruForm, RruFormElement, RruFormProps } from '../src/form/react-rich-ui-form';
import '../src/form/style.css';

const storyMeta: Meta = {
  title: 'Form',
  component: RruForm,
};

export default storyMeta;

export const FormExample = (args: RruFormProps) => {

  const genders = [
    {id: 'MALE', label: 'Male'},
    {id: 'FEMALE', label: 'Female'},
  ];

  const colors = [
    {id: 'R', label: 'Red'},
    {id: 'G', label: 'Green'},
    {id: 'B', label: 'Blue'},
  ];

  const accountTypes = [
    {id: 'INDIVIDUAL', label: 'Individual'},
    {id: 'ORGANIZATION', label: 'Organization'},
  ];

  const features = [
    {id: '1', label: 'Feature A'},
    {id: '2', label: 'Feature B'},
    {id: '3', label: 'Feature C'},
    {id: '4', label: 'Feature D'},
    {id: '5', label: 'Feature E'},
    {id: '6', label: 'Feature F'},
    {id: '7', label: 'Feature G'},
    {id: '8', label: 'Feature H'},
  ];

  const groups = [
    {
      label: 'First Group',
      items: [
        {id: '1', label: 'Option 1'},
        {id: '2', label: 'Option 2'},
        {id: '3', label: 'Option 3'},
      ]
    },
    {
      label: 'Second Group',
      items: [
        {id: '4', label: 'Option 4'},
        {id: '5', label: 'Option 5'},
        {id: '6', label: 'Option 6'},
        {id: '7', label: 'Option 7'},
      ]
    }
  ];

  // ui components that others depend on
  const [accountType, setAccountType] = useState('INDIVIDUAL');

  const initialValues = {
    name: 'Khalid',
    features: [1, 3],
    groups: ['4', '5'],
  }

  const validationSchema = yup.object().shape({
    email: yup.string().matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,7}$/, 'The email is incorrect'),
    gender: yup.string().default('').min(1, 'This field is required') // default('') is necessary because Yup will not validate if value is undefined.
  });

  const watcher = form => {
    setAccountType(form.accountType);
  }

  const onSubmit = form => {
    action('submitting the form')(form);
  };

  return (
    <>
      <RruForm initialValues={initialValues} validationSchema={validationSchema} watch={['accountType']} watcher={watcher} onSubmit={onSubmit} {...args}>
        <div>
          <RruFormElement type='text' name='name' label='Name' />
          <RruFormElement type='text' name='email' label='Email' requiredAsterisk />
          <RruFormElement type='select' name='gender' label='Gender' options={genders} defaultValue='unknown' />
        </div>
        <div>
          <RruFormElement type='multi-select' name='colors' label='Colors' options={colors} defaultValue={['B']} disabled />
          <RruFormElement type='select' name='accountType' label='Account Type' options={accountTypes} defaultValue='ORGANIZATION' />
          {accountType === 'ORGANIZATION' &&
            <RruFormElement type='text' name='moi' label='MOI' maxLength='10' />
          }
        </div>
        <div>
          <RruFormElement type='multi-checkbox' name='features' label='Features' options={features}/>
        </div>
        <div>
          <RruFormElement type='grouped-multi-checkbox' name='groups' label='Groups' options={groups}/>
        </div>
        <div>
          <RruFormElement type='date' name='bookingDate' label='Booking Date' defaultValue='2020-08-13' maxYearLength='10' isPast/>
          <RruFormElement type='time' name='bookingTime' label='Booking Time' defaultValue="05:08"/>
        </div>
        <div>
          <RruFormElement type='file' name='attachment' label='Attachment' placeholder='Select a file' />
          <div style={{marginTop: '2rem'}}><RruFormElement type='checkbox' name='sendEmails' label='Allow promotion emails' /></div>
        </div>
        <div>
          <RruFormElement type='textarea' name='feedback' label='Feedback' />
        </div>
        <div>
          <RruFormElement type='checkbox' name='pledge' label='In this step you define long text templates and allocate these templates to certain asset classes. By means of these templates, the system then supports the long text entry when you create a fixed asset belonging to the class. Per asset class, you can store one template for all long texts of an asset respectively (general specifications, technical specifications and so on).' />
        </div>
        <div>
          <div style={{width: '100%'}}><button type='submit' className='float-right'>Submit</button></div>
        </div>
      </RruForm>
    </>
  );
};
