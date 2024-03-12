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
import { UseFormReturn } from 'react-hook-form';
import { cloneObjectFixingBadArrays } from '../../utils/utils';

export type UseRruFormReturn = {
  $: (context: UseFormReturn) => void;
  getFieldsValues: (preserveArrayKeys?: boolean) => Record<string, any>;
  getFieldValue: (fieldName: string, preserveArrayKeys?: boolean) => any;
  setFieldValue: (fieldName: string, value: any) => void;
};

export const useRruForm = (): UseRruFormReturn => {
  const [formContext, setFormContext] = useState<UseFormReturn | null>(null);

  const $ = (context: UseFormReturn) => {
    console.debug('setting form context');
    setFormContext(context);
  };

  const getFieldsValues = (preserveArrayKeys?: boolean) => {
    if (formContext == null) {
      console.error('FormContext has not been set yet. Cannot get values.');
      return {};
    }

    const formValuesObject = formContext.getValues();
    const fixedFormValuesObject = cloneObjectFixingBadArrays(formValuesObject);
    return preserveArrayKeys ? formValuesObject : fixedFormValuesObject;
  };

  const getFieldValue = (fieldName: string, preserveArrayKeys?: boolean) => {
    return getFieldsValues(preserveArrayKeys)[fieldName];
  };

  const setFieldValue = (fieldName: string, value: any) => {
    if (formContext == null) {
      console.error('FormContext has not been set yet. Cannot set values.');
      return;
    }
    formContext.setValue(fieldName, value);
  };

  return {
    $: $,
    getFieldsValues: getFieldsValues,
    getFieldValue: getFieldValue,
    setFieldValue: setFieldValue,
  };
};
