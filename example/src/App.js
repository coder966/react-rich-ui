import React, {useState} from 'react';
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
        <div style={{maxWidth: '960px', margin: '0 auto', padding: '0 15px'}}>
            <div className='pt-4'>
                <a href='/' onClick={toggleLocale}>{locale === 'ar' ? 'English' : 'العربية'}</a>
                <hr />
            </div>

            <FormExample />

            <br /><hr /><br />

            <TableExample />

            <br /><hr /><br />

            <WizardExample />

            <br /><hr /><br />

            <ButtonExample />

            <br /><hr /><br />
        </div>
    );
};


export default App;
