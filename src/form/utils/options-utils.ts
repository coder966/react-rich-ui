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

import { retainAll } from '../../utils/utils';
import RruOption from '../types/RruOption';
import RruOptionsGroup from '../types/RruOptionsGroup';
import RruOptionsPropType from '../types/RruOptionsPropType';

const isOptionsGroup = (option: RruOption | RruOptionsGroup): option is RruOptionsGroup => {
  return (option as RruOptionsGroup).options !== undefined;
};

const findOptions = (optionsProp: RruOptionsPropType, optionsValues: string[]): RruOption[] => {
  // flatten optionsProp
  let flatOptions: RruOption[] = [];
  optionsProp.forEach((opt) => {
    if (isOptionsGroup(opt)) {
      flatOptions = flatOptions.concat(opt.options);
    } else {
      flatOptions.push(opt);
    }
  });

  // find
  const searchResult = retainAll(flatOptions, optionsValues, (opt, val) => opt.value + '' === val + '');

  // return
  return searchResult;
};

const findOption = (optionsProp: RruOptionsPropType, optionValue: string): RruOption | null => {
  // find
  const searchResult = findOptions(optionsProp, [optionValue]);

  // return
  return searchResult.length === 1 ? searchResult[0] : null;
};

export { isOptionsGroup, findOptions, findOption };
