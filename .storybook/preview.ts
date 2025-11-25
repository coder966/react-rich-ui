const isRTL = false;

import type { Preview } from '@storybook/react-vite';
import 'bootstrap/dist/js/bootstrap.bundle';

const html = document.getElementsByTagName('html')[0];

if (isRTL) {
  // @ts-expect-error no type declarations
  import('bootstrap/dist/css/bootstrap.rtl.css');
  html.dir = 'rtl';
  html.lang = 'ar';
}else{
  // @ts-expect-error no type declarations
  import('bootstrap/dist/css/bootstrap.css');
  html.dir = 'ltr';
  html.lang = 'en';
}

const preview: Preview = {
  parameters: {},
};

export default preview;
