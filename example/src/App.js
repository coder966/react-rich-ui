import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { IntlProvider } from 'react-intl';
import ButtonExample from './examples/ButtonExample';
import FormExample from './examples/FormExample';
import TableExample from './examples/TableExample';
import WizardExample from './examples/WizardExample';
import arMessages from './i18n/ar';
import enMessages from './i18n/en';
import './style.css';

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

        <div>
          <FormExample />
          <br /><br /><br />
          <TableExample />
          <br /><br /><br />
          <WizardExample />
          <br /><br /><br />
          <ButtonExample />
        </div>

      </Container>
    </IntlProvider>
  );
};


export default App;
