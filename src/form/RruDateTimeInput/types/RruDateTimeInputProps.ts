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

import RruDateTimeInputCalendarType from "./RruDateTimeInputCalendarType";
import RruDateTimeInputDateConfig from "./RruDateTimeInputDateConfig";
import RruDateTimeInputMode from "./RruDateTimeInputMode";

export default interface RruDateTimeInputProps {
  /**  */
  name: string;

  /**  */
  label?: React.ReactNode;

  /**  */
  requiredAsterisk?: boolean;

  /** The minium selectable year */
  mode?: RruDateTimeInputMode;

  /**  */
  calendarType?: RruDateTimeInputCalendarType;

  /**  */
  getDateConfig?: (date: string) => RruDateTimeInputDateConfig | undefined | null | void;

  // HTML props

  /**
   * Controls whether the input field is disabled or not
   */
  disabled?: boolean;
}
