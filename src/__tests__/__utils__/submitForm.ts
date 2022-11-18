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

const submitForm = async (container: Element) => {
  // obtain reference to the submit button element
  const submitButton = container.querySelector('button[type="submit"]');

  /**
   * Click outside any focused field before submitting the form in order to allow async state to finish.
   * This is only necessary in tests because here it behaves slightly differently from a typical browser.
   */
  submitButton?.parentElement && (await userEvent.click(submitButton?.parentElement));

  // click submit
  submitButton && (await userEvent.click(submitButton));
};

export default submitForm;
