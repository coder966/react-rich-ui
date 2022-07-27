const isRTL = false;

import 'bootstrap/dist/js/bootstrap.bundle';
import(`bootstrap/dist/css/bootstrap${isRTL ? '.rtl' : ''}.css`);

if (isRTL) {
  const html = document.getElementsByTagName('html')[0];
  html.dir = 'rtl';
  html.lang = 'ar';
}

// https://storybook.js.org/docs/react/writing-stories/parameters#global-parameters
export const parameters = {
  // https://storybook.js.org/docs/react/essentials/actions#automatically-matching-args
  actions: { argTypesRegex: '^on.*' },
};
