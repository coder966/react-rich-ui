import React from 'react';
import {Row} from 'react-bootstrap'
import * as yup from 'yup';
import { RruForm, RruFormElement } from '../lib/react-rich-ui';

const App = props => {
  const validationSchema = yup.object().shape({
    email: yup.string().matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,7}$/, 'The email is incorrect'),
  });

  const onSubmit = form => {
    console.log(form);
  };

  return (
    <RruForm validationSchema={validationSchema} onSubmit={onSubmit}>
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
