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

import { useState } from 'react';
import { useFormContext, useFormState } from 'react-hook-form';
import { resolveObjectAttribute } from '../../utils/utils';

export const useField = (name: string) => {
  const formContext = useFormContext();
  const formState = useFormState({ name: name });
  const [isTouched, setIsTouched] = useState<boolean>(false);

  const register = (onRegister: (initialValue: any) => void) => {
    const initialValue = formContext.formState.defaultValues
      ? resolveObjectAttribute(name, formContext.formState.defaultValues)
      : undefined;
    onRegister(initialValue);
  };

  const unregister = () => {
    formContext.unregister(name);
  };

  const markTouched = () => {
    if (!isTouched) {
      setIsTouched(true);
      formContext.trigger(name);
    }
  };

  const setValue = (value: any) => {
    formContext.setValue(name, value, {
      shouldValidate: isTouched || error,
    });
  };

  /**
   * don't use `formContext.getFieldState(name).error` as the error will not be updated until the next update;
   * delaying the error message, also delaying the clearance of the error message
   */
  const error = resolveObjectAttribute(name, formState.errors);

  return {
    register: register,
    unregister: unregister,
    setValue: setValue,
    error: error,
    onBlur: markTouched,
  };
};
