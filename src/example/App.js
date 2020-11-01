import React, {useState} from 'react';
import {Container, Col, Row, Button} from 'react-bootstrap'
import * as yup from 'yup';
import { RruForm, RruFormElement, RruButton } from '../lib/react-rich-ui';

const App = props => {

  const accountTypes = [
    {id: 'INDIVIDUAL', label: {ar: 'فرد', en: 'Individual'}},
    {id: 'ORGANIZATION', label: {ar: 'منشأة', en: 'Organization'}},
  ];

  const features = [
    {id: 1, label: {ar: 'ميزة أ', en: 'Feature A'}},
    {id: 2, label: {ar: 'ميزة ب', en: 'Feature B'}},
    {id: 3, label: {ar: 'ميزة ج', en: 'Feature C'}},
    {id: 4, label: {ar: 'ميزة د', en: 'Feature D'}},
  ];

  const groups = [
    {
      label: {
        ar: 'Group 1',
        en: 'Group 1'
      },
      items: [
        {id: 1, label: {ar: 'خيار 1', en: 'Option 1'}},
        {id: 2, label: {ar: 'خيار 2', en: 'Option 2'}},
        {id: 3, label: {ar: 'خيار 3', en: 'Option 3'}},
      ]
    },
    {
      label: {
        ar: 'Group 2',
        en: 'Group 2'
      },
      items: [
        {id: 4, label: {ar: 'خيار 4', en: 'Option 4'}},
        {id: 5, label: {ar: 'خيار 5', en: 'Option 5'}},
        {id: 6, label: {ar: 'خيار 6', en: 'Option 6'}},
      ]
    }
  ]

  // ui components that others depend on
  const [accountType, setAccountType] = useState('INDIVIDUAL');

  const validationSchema = yup.object().shape({
    email: yup.string().matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,7}$/, 'The email is incorrect'),
  });

  const initialValues = {
    name: 'Khalid',
  }

  const watcher = form => {
    setAccountType(form.accountType);
  }

  const onSubmit = form => {
    console.log(form);
  };

  const onConfirm = (form, setShow) => {
    console.log(form);

    // simulate delay or maybe perform API operation and then show error or proceed
    setTimeout(() => {
      setShow(false);
    }, 5000);
    return false;
  }

  return (
    <Container>

      <h1>RruForm</h1>
      <RruForm initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} watch={watch => watcher(watch(['accountType']))}>
        <Row>
          <Col><RruFormElement type='text' name='name' label='Full Name' lang='en'/></Col>
          <Col><RruFormElement type='text' name='Email' label='email' lang='en'/></Col>
          <Col><RruFormElement type='select' name='accountType' label='Account Type' options={accountTypes} lang='en'/></Col>
        </Row>
        {accountType === 'ORGANIZATION' &&
          <Row>
            <Col><RruFormElement type='text' name='moi' label='MOI' lang='en'/></Col>
          </Row>
        }
        <Row>
          <Col><RruFormElement type='multi-checkbox' name='features' label='Subscribe to Features' options={features} lang='en'/></Col>
        </Row>
        <Row>
          <Col><RruFormElement type='grouped-multi-checkbox' name='groups' label='Groups' options={groups} lang='en'/></Col>
        </Row>
        <Row>
          <Col md='4'><RruFormElement type='date' name='bookingDate' label='Booking Date' defaultValue='15-08-2020' maxYearLength='10' isPast lang='en'/></Col>
          <Col md='4'><RruFormElement type='time' name='bookingTime' label='Booking Time' defaultValue="05:08" lang='en'/></Col>
        </Row>
        <Row>
          <Col md='4'><RruFormElement type='file' name='attachment' label='Attachment' lang='en'/></Col>
        </Row>
        <Row>
          <div style={{width: '100%'}}><Button type='submit' className='float-right'>Submit</Button></div>
        </Row>
      </RruForm>


      <hr></hr>
      <h1>RruButton</h1>
      <RruButton 
        variant='danger'
        onConfirm={onConfirm}
        label='Delete'
        validationSchema={yup.object().shape({reason: yup.string().required()})}
        formElements={<RruFormElement type='text' name='reason' label='reason' spans='12' />}
        confirmationTitle='Delete'
        confirmationDesc='Are you sure you want to delete?'
        confirmLabel='Confirm'
        cancelLabel='Cancel' />
    </Container>
  );
};


export default App;
