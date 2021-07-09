import React, { useState } from 'react';
import ButtonExample from './examples/ButtonExample';
import FormExample from './examples/FormExample';
import TableExample from './examples/TableExample';
import WizardExample from './examples/WizardExample';
import './style.css';

const App = props => {

  const [locale, setLocale] = useState('ltr');
  const toggleLocale = event => {
    event.preventDefault();
    setLocale(locale === 'rtl' ? 'ltr' : 'rtl');
    const html = document.getElementsByTagName('html')[0];
    html.dir = locale === 'ltr' ? 'rtl' : 'ltr';
  }

  return (
    <div style={{maxWidth: '960px', margin: '0 auto', padding: '0 15px'}}>
      <div className='pt-4'>
        <a href='/' onClick={toggleLocale}>{locale === 'rtl' ? 'LTR' : 'RTL'}</a>
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
    </div>
  );
};


export default App;
