const isRTL = false;

import type { Preview } from '@storybook/react-vite';
import 'bootstrap/dist/js/bootstrap.bundle';
import(`bootstrap/dist/css/bootstrap${isRTL ? '.rtl' : ''}.css`);

if (isRTL) {
  const html = document.getElementsByTagName('html')[0];
  html.dir = 'rtl';
  html.lang = 'ar';
}

const preview: Preview = {
  parameters: {},
};

export default preview;
