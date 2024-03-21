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
import { fireEvent, getByText, waitFor } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

const selectOption = async (container: HTMLElement, optionLabel: string) => {
  // open the menu
  const inputElement = container.querySelector('input');
  inputElement && fireEvent.keyDown(inputElement, { key: 'ArrowDown' });

  // select
  await waitFor(() => {
    expect(getByText(container, optionLabel)).toBeTruthy();
  });
  const optionElement = getByText(container, optionLabel);
  optionElement && (await userEvent.click(optionElement));
};

export default selectOption;
