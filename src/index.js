import React from 'react';
import ReactDOM from 'react-dom';
import {IntlProvider} from 'react-intl';
import App from './example/App';
import ar from './example/i18n/ar';
import en from './example/i18n/en';

// This will run the example application
ReactDOM.render(
<IntlProvider locale={'en'} messages={en}>
  <App />
</IntlProvider>
, document.getElementById('root'));
