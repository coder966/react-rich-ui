/*
 * Copyright 2020 Khalid H. Alharisi
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

export default interface RruTextareaInputProps {
  /**  */
  name: string;

  /**  */
  label?: React.ReactNode;

  /**  */
  requiredAsterisk?: boolean;

  // HTML props

  /**
   * Controls whether the input field is disabled or not
   */
  disabled?: boolean;

  /**
   * A short hint that describes the expected value
   */
  placeholder?: string;

  /**
   * The maximum number of characters allowed
   */
  maxLength?: number;

  /**
   * Provides guidance to the browser as to the type of information expected in the field, 
   * this could allow the browser to provide automated assistance in filling out the form field.
   * More info at [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete)
   */
  autoComplete?: string;

  /**
   * Specifies the visible number of lines in the textarea
   */
  rows?: number;

  /**
   * Specifies the visible width of the textarea
   */
  cols?: number;

  /**
   * Specifies how the text is to be wrapped when submitted in a form.
   * More info at [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#attr-wrap)
   */
  wrap?: string;

}
