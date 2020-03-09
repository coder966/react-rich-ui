import React, {useState} from 'react';
import {Row} from 'react-bootstrap'
import * as yup from 'yup';
import { RruForm, RruFormElement } from '../lib/react-rich-ui';

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
    <RruForm initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} watch={watch => watcher(watch(['type']))}>
      <Row>
        <RruFormElement type='select' name='type' labelId='type' options={types} lang='en' />
        <RruFormElement type='multi-checkbox' name='preference' labelId='option' options={options} lang='en' />
      </Row>
      <Row>
        <RruFormElement type='text' name='email' labelId='email' lang='en' />
      </Row>
      <Row>
        <button type='submit'>Submit</button>
      </Row>
    </RruForm>
  );
};


export default App;
