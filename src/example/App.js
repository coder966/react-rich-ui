import React, {useState} from 'react';
import {IntlProvider, FormattedMessage} from 'react-intl';
import {Container, Col, Row, Button} from 'react-bootstrap'
import * as yup from 'yup';
import { RruForm, RruFormElement, RruButton, RruPageableTable } from '../lib/react-rich-ui';
import arMessages from './i18n/ar';
import enMessages from './i18n/en';
import './style.css';

const App = props => {

  const [locale, setLocale] = useState('en');

  const accountTypes = [
    {id: 'INDIVIDUAL', label: <FormattedMessage id='individual' />},
    {id: 'ORGANIZATION', label: <FormattedMessage id='organization' />},
  ];

  const features = [
    {id: '1', label: <FormattedMessage id='featureA' />},
    {id: '2', label: <FormattedMessage id='featureB' />},
    {id: '3', label: <FormattedMessage id='featureC' />},
    {id: '4', label: <FormattedMessage id='featureD' />},
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

  const validationSchema = yup.object().shape({
    email: yup.string().matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,7}$/, 'The email is incorrect'),
  });

  const initialValues = {
    name: 'Khalid',
    features: [1, '3']
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

  
  const columns = [
    {
      label: <FormattedMessage id='serialNo' />,
      value: '#'
    },
    {
      label: <FormattedMessage id='personName' />,
      value: row => (row.person.firstNameAr + ' ' + row.person.secondNameAr + ' ' + row.person.thirdNameAr + ' ' + row.person.lastNameAr),
      sortKey: 'person.firstNameAr'
    },
    {
      label: <FormattedMessage id='idNumber' />,
      value: 'person.idNumber'
    },
  ];

  const actions = [
    {
      icon: 'view',
      privileges: ['USER:VIEW'],
      action: user => console.log('view user'+user.id),
    },
    {
      icon: 'edit',
      privileges: ['USER:EDIT'],
      action: user => console.log('edit user'+user.id),
      display: user => user.status === 'CONFIRMED'
    },
    {
      icon: 'delete',
      action: user => console.log('delete user'+user.id),
      onConfirm: user => console.log('confirm delete user'+user.id),
      confirmationTitle: <FormattedMessage id='delete' />,
      confirmationDesc: <FormattedMessage id='deleteConfirmation' />,
      cancelLabel: <FormattedMessage id='cancel' />,
      confirmLabel: <FormattedMessage id='confirm' />,
    },
  ];

  return (
    <IntlProvider messages={locale === 'ar' ? arMessages : enMessages} locale={locale}>
      <Container>

        <a onClick={e => setLocale(locale === 'ar' ? 'en' : 'ar')}>{locale === 'ar' ? 'English' : 'العربية'}</a>

        <h1>RruForm</h1>
        <RruForm initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} watch={watch => watcher(watch(['accountType']))}>
          <Row>
            <Col><RruFormElement type='text' name='name' label={<FormattedMessage id='name' />}/></Col>
            <Col><RruFormElement type='text' name='email' label={<FormattedMessage id='email' />} /></Col>
            <Col><RruFormElement type='select' name='accountType' label={<FormattedMessage id='accountType' />} options={accountTypes} defaultValue='ORGANIZATION' /></Col>
          </Row>
          {accountType === 'ORGANIZATION' &&
            <Row>
              <Col><RruFormElement type='text' name='moi' label={<FormattedMessage id='moi' />} /></Col>
            </Row>
          }
          <Row>
            <Col><RruFormElement type='multi-checkbox' name='features' label={<FormattedMessage id='features' />} options={features}/></Col>
          </Row>
          <Row>
            <Col><RruFormElement type='grouped-multi-checkbox' name='groups' label={<FormattedMessage id='groups' />} options={groups}/></Col>
          </Row>
          <Row>
            <Col md='4'><RruFormElement type='date' name='bookingDate' label={<FormattedMessage id='bookingDate' />} defaultValue='2020-08-13' maxYearLength='10' isPast/></Col>
            <Col md='4'><RruFormElement type='time' name='bookingTime' label={<FormattedMessage id='bookingTime' />} defaultValue="05:08"/></Col>
          </Row>
          <Row>
            <Col md='4'><RruFormElement type='file' name='attachment' label={<FormattedMessage id='attachment' />}/></Col>
            <Col><div style={{marginTop: '2rem'}}><RruFormElement type='checkbox' name='sendEmails' label={<FormattedMessage id='sendEmails' />} /></div></Col>
          </Row>
          <Row>
            <Col><RruFormElement type='checkbox' name='pledge' label={<FormattedMessage id='pledge' />} /></Col>
          </Row>
          <Row>
            <div style={{width: '100%'}}><Button type='submit' className='float-right'><FormattedMessage id='submit' /></Button></div>
          </Row>
        </RruForm>


        <hr></hr>
        <h1>RruButton</h1>
        <RruButton 
          variant='danger'
          onConfirm={onConfirm}
          label={<FormattedMessage id='delete' />}
          validationSchema={yup.object().shape({reason: yup.string().required()})}
          formElements={<RruFormElement type='text' name='reason' label={<FormattedMessage id='reason' />} />}
          confirmationTitle={<FormattedMessage id='delete' />}
          confirmationDesc={<FormattedMessage id='deleteConfirmation' />}
          confirmLabel={<FormattedMessage id='confirm' />}
          cancelLabel={<FormattedMessage id='cancel' />} />


        <hr></hr>
        <h1>RruPageableTable</h1>
        <RruPageableTable
          id='UsersListTable'
          endpoint='/api/user'
          columns={columns}
          actions={actions}
          search={{}}
          userPrivileges={['USER:VIEW']} />


      </Container>
    </IntlProvider>
  );
};


export default App;
