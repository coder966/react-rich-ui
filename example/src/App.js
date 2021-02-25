import React, {useState} from 'react';
import FormExample from './examples/FormExample';
import TableExample from './examples/TableExample';
import WizardExample from './examples/WizardExample';
import ButtonExample from './examples/ButtonExample';
import './style.css'; // to override and customize the styles provided by react-rich-ui

const App = props => {

    const [htmlDir, setHtmlDir] = useState('ltr');
    const toggleHtmlDir = event => {
        event.preventDefault();
        setHtmlDir(htmlDir === 'rtl' ? 'ltr' : 'rtl');
        const html = document.getElementsByTagName('html')[0];
        html.dir = htmlDir === 'ltr' ? 'rtl' : 'ltr';
    }

    return (
        <div style={{maxWidth: '960px', margin: '0 auto', padding: '15px'}}>
            <div>
                <a href='/' onClick={toggleHtmlDir}>{htmlDir === 'rtl' ? 'LTR' : 'RTL'}</a>
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
