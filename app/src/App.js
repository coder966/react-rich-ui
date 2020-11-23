import React, {useState} from 'react';
import {IntlProvider} from 'react-intl';
import {Container, Tabs, Tab} from 'react-bootstrap'
import arMessages from './i18n/ar';
import enMessages from './i18n/en';
import './style.css';
import FormExample from './examples/FormExample';
import TableExample from './examples/TableExample';
import WizardExample from './examples/WizardExample';
import ButtonExample from './examples/ButtonExample';

const App = props => {

  const [locale, setLocale] = useState('en');
  const toggleLocale = event => {
    event.preventDefault();
    setLocale(locale === 'ar' ? 'en' : 'ar');
    const html = document.getElementsByTagName('html')[0];
    html.dir = locale === 'en' ? 'rtl' : 'ltr';
  }

  return (
    <IntlProvider messages={locale === 'ar' ? arMessages : enMessages} locale={locale}>
      <Container>

        <div className='pt-4'>
          <a href='/' onClick={toggleLocale}>{locale === 'ar' ? 'English' : 'العربية'}</a>
          <hr />
        </div>

        <Tabs>
          <Tab eventKey='RruForm' title='RruForm' className='pt-4 pb-4'>
            <FormExample />
          </Tab>
          <Tab eventKey='RruPageableTable' title='RruPageableTable' className='pt-4 pb-4'>
            <TableExample />
          </Tab>
          <Tab eventKey='RruStepsWizard' title='RruStepsWizard' className='pt-4 pb-4'>
            <WizardExample />
          </Tab>
          <Tab eventKey='RruButton' title='RruButton' className='pt-4 pb-4'>
            <ButtonExample />
          </Tab>
        </Tabs>

      </Container>
    </IntlProvider>
  );
};


export default App;
