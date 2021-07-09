import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { RruForm, RruFormElement } from 'react-rich-ui';
import * as yup from 'yup';

const FormExample = props => {

  const genders = [
    {id: 'MALE', label: <FormattedMessage id='male' />},
    {id: 'FEMALE', label: <FormattedMessage id='female' />},
  ];

  const colors = [
    {id: 'R', label: <FormattedMessage id='red' />},
    {id: 'G', label: <FormattedMessage id='green' />},
    {id: 'B', label: <FormattedMessage id='blue' />},
  ];

  const accountTypes = [
    {id: 'INDIVIDUAL', label: <FormattedMessage id='individual' />},
    {id: 'ORGANIZATION', label: <FormattedMessage id='organization' />},
  ];

  const features = [
    {id: '1', label: <FormattedMessage id='featureA' />},
    {id: '2', label: <FormattedMessage id='featureB' />},
    {id: '3', label: <FormattedMessage id='featureC' />},
    {id: '4', label: <FormattedMessage id='featureD' />},
    {id: '5', label: <FormattedMessage id='featureE' />},
    {id: '6', label: <FormattedMessage id='featureF' />},
    {id: '7', label: <FormattedMessage id='featureG' />},
    {id: '8', label: <FormattedMessage id='featureH' />},
  ];

  const groups = [
    {
      label: <FormattedMessage id='group1' />,
      items: [
        {id: '1', label: <FormattedMessage id='option1' />},
        {id: '2', label: <FormattedMessage id='option2' />},
        {id: '3', label: <FormattedMessage id='option3' />},
      ]
    },
    {
      label: <FormattedMessage id='group2' />,
      items: [
        {id: '4', label: <FormattedMessage id='option4' />},
        {id: '5', label: <FormattedMessage id='option5' />},
        {id: '6', label: <FormattedMessage id='option6' />},
        {id: '7', label: <FormattedMessage id='option7' />},
      ]
    }
  ]

  // ui components that others depend on
  const [accountType, setAccountType] = useState('INDIVIDUAL');

  const initialValues = {
    name: 'Khalid',
    features: [1, '3',{id: '6', label: <FormattedMessage id='featureF' />}]
  }

  const validationSchema = yup.object().shape({
    email: yup.string().matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,7}$/, 'The email is incorrect'),
    gender: yup.string().default('').min(1, 'This field is required') // default('') is necessary because Yup will not validate if value is undefined.
  });

  const watcher = form => {
    setAccountType(form.accountType);
  }

  const onSubmit = form => {
    console.log(form);
  };

  return (
    <>
      <RruForm initialValues={initialValues} validationSchema={validationSchema} watch={['accountType']} watcher={watcher} onSubmit={onSubmit}>
        <div>
          <RruFormElement type='text' name='name' label={<FormattedMessage id='name' />}/>
          <RruFormElement type='text' name='email' label={<FormattedMessage id='email' />} requiredAsterisk />
          <RruFormElement type='select' name='gender' label={<FormattedMessage id='gender' />} options={genders} defaultValue='unknown' />
        </div>
        <div>
          <RruFormElement type='multi-select' name='colors' label={<FormattedMessage id='colors' />} options={colors} defaultValue={['B']} disabled />
          <RruFormElement type='select' name='accountType' label={<FormattedMessage id='accountType' />} options={accountTypes} defaultValue='ORGANIZATION' />
          {accountType === 'ORGANIZATION' &&
            <RruFormElement type='text' name='moi' label={<FormattedMessage id='moi' />} maxLength='10' />
          }
        </div>
        <div>
          <RruFormElement type='multi-checkbox' name='features' label={<FormattedMessage id='features' />} options={features}/>
        </div>
        <div>
          <RruFormElement type='grouped-multi-checkbox' name='groups' label={<FormattedMessage id='groups' />} options={groups}/>
        </div>
        <div>
          <RruFormElement type='date' name='bookingDate' label={<FormattedMessage id='bookingDate' />} defaultValue='2020-08-13' maxYearLength='10' isPast/>
          <RruFormElement type='time' name='bookingTime' label={<FormattedMessage id='bookingTime' />} defaultValue="05:08"/>
        </div>
        <div>
          <RruFormElement type='file' name='attachment' label={<FormattedMessage id='attachment' />} placeholder='Select a file' />
          <div style={{marginTop: '2rem'}}><RruFormElement type='checkbox' name='sendEmails' label={<FormattedMessage id='sendEmails' />} /></div>
        </div>
        <div>
          <RruFormElement type='textarea' name='feedback' label={<FormattedMessage id='feedback' />} />
        </div>
        <div>
          <RruFormElement type='checkbox' name='pledge' label={<FormattedMessage id='pledge' />} />
        </div>
        <div>
          <div style={{width: '100%'}}><button type='submit' className='float-right'><FormattedMessage id='submit' /></button></div>
        </div>
      </RruForm>
    </>
  );
};

export default FormExample;
