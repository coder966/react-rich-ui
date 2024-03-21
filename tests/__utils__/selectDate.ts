/*
 * Copyright 2022 Khalid H. Alharisi
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import userEvent from '@testing-library/user-event';

const selectDate = async (container: Element, inputName: string, date: string, time?: string) => {
  const dateParts = date.split('-');
  const timeParts = time?.split(':');

  const birthDateInput = container.querySelector(`input[name="${inputName}"]`);
  birthDateInput && (await userEvent.click(birthDateInput));

  if (timeParts) {
    const hourInput = container.querySelector('.rru-date-input__footer > input:nth-of-type(1)');
    hourInput && (await userEvent.click(hourInput));
    await userEvent.keyboard(parseInt(timeParts[0]) + '');

    const minuteInput = container.querySelector('.rru-date-input__footer > input:nth-of-type(2)');
    minuteInput && (await userEvent.click(minuteInput));
    await userEvent.keyboard(parseInt(timeParts[1]) + '');

    const secondInput = container.querySelector('.rru-date-input__footer > input:nth-of-type(3)');
    secondInput && (await userEvent.click(secondInput));
    await userEvent.keyboard(parseInt(timeParts[2]) + '');
  }

  const yearInput = container.querySelector('.rru-date-input__header > input:nth-of-type(1)');
  yearInput && (await userEvent.click(yearInput));
  await userEvent.keyboard(dateParts[0]);

  const monthInput = container.querySelector('.rru-date-input__header > input:nth-of-type(2)');
  monthInput && (await userEvent.click(monthInput));
  await userEvent.keyboard(parseInt(dateParts[1]) + '');

  const dayInput = container.querySelector(`[data-date="${date}"]`);
  dayInput && (await userEvent.click(dayInput));
};

export default selectDate;
