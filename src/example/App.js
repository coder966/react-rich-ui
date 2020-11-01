import React, {useState} from 'react';
import {Container, Col, Row} from 'react-bootstrap'
import * as yup from 'yup';
import { RruForm, RruFormElement, RruButton } from '../lib/react-rich-ui';

const App = props => {
  const types = [
    {id: 1, label: {ar: 'نوع 1', en: 'Type 1'}},
    {id: 2, label: {ar: 'نوع 2', en: 'Type 2'}},
  ];

  const options = [
    {id: 1, label: {ar: 'خيار 1', en: 'Option 1'}},
    {id: 2, label: {ar: 'خيار 2', en: 'Option 2'}},
    {id: 3, label: {ar: 'خيار 3', en: 'Option 3'}},
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
  const [type, setType] = useState('1');

  const validationSchema = yup.object().shape({
    email: yup.string().matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,7}$/, 'The email is incorrect'),
  });

  const initialValues = {
    type: '1',
  }

  const watcher = form => {
    setType(form.type);
  }

  const onSubmit = form => {
    console.log(form);
  };

  return (
    <Container>
      <RruForm initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} watch={watch => watcher(watch(['type']))}>
        <Row>
          <Col><RruFormElement type='select' name='type' label='type' options={types} lang='en' /></Col>
          <Col><RruFormElement type='multi-checkbox' name='field_1' label='option' options={options} lang='en' /></Col>
        </Row>
        <Row>
          <Col><RruFormElement type='multi-checkbox' name='field_2' label='option' options={types} lang='en' /></Col>
        </Row>
        <Row>
          <Col><RruFormElement type='grouped-multi-checkbox' name='field_3' label='option' options={groups} lang='en' /></Col>
        </Row>
        <Row>
          <Col><RruFormElement type='date' name='field_4' label='birthDate' lang='en' defaultValue='15-08-2019' maxYearLength='10' isPast/></Col>
          <Col><RruFormElement type='time' name='field_4' label='dd' lang='en' defaultValue="05:08" /></Col>
          <Col><RruFormElement type='file' name='field_5' label='option' lang='en' /></Col>
        </Row>
        <Row>
          <Col md='6'><RruFormElement type='text' name='email' label='email' lang='en' /></Col>
        </Row>
        <Row>
          <button type='submit'>Submit</button>
        </Row>
      </RruForm>

      <RruButton 
        variant='danger'
        onConfirm={console.log}
        label='Delete'
        validationSchema={yup.object().shape({reason: yup.string().required()})}
        formElements={<RruFormElement type='text' name='reason' label='reason' spans='12' />}
        confirmationTitle='Delete'
        confirmationDesc='Are you sure you want to delete?' />
    </Container>
  );
};


export default App;
