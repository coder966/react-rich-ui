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
import { resolveObjectAttribute } from '../../utils/utils';

export type UseRruFormReturn = {
  $: (context: UseFormReturn) => void;
  getFieldsValues: () => Record<string, any>;
  getFieldValue: (fieldName: string) => any;
  setFieldValue: (fieldName: string, value: any) => void;
  addItemToFieldArray: (fieldArrayName: string, value?: any, prepend?: boolean) => void;
  removeItemFromFieldArray: (fieldArrayName: string, index: number) => void;
};

export const useRruForm = (): UseRruFormReturn => {
  const [formContext, setFormContext] = useState<UseFormReturn | null>(null);
  const [, setDummyState] = useState<number>(0); // used to force rerender in case needed

  const $ = (context: UseFormReturn) => {
    console.debug('setting form context');
    setFormContext(context);
  };

  const getFieldsValues = () => {
    if (formContext == null) {
      console.error('FormContext has not been set yet. Cannot read values, will return empty object.');
      return {};
    }

    return formContext.getValues();
  };

  const getFieldValue = (fieldName: string) => {
    return resolveObjectAttribute(fieldName, getFieldsValues());
  };

  const setFieldValue = (fieldName: string, value: any) => {
    if (formContext == null) {
      console.error('FormContext has not been set yet. Cannot set values.');
      return;
    }
    formContext.setValue(fieldName, value);
  };

  const addItemToFieldArray = (fieldArrayName: string, value?: any, prepend?: boolean) => {
    if (formContext == null) {
      console.error('FormContext has not been set yet. Cannot call addItemToFieldArray.');
      return;
    }

    const currentValue = getFieldValue(fieldArrayName);
    if(!Array.isArray(currentValue)){
      console.error(fieldArrayName, 'is not an array of fields, cannot add item.');
      return;
    }

    const newValue = prepend ? [value || {}, ...currentValue] : [...currentValue, value || {}];
    setFieldValue(fieldArrayName, newValue);

    // because the new item is not even rendered yet, the client components need us to re-render so it would read the array
    // and render fields for each item.
    setDummyState(s => s + 1);
  };

  const removeItemFromFieldArray = (fieldArrayName: string, index: number) => {
    if (formContext == null) {
      console.error('FormContext has not been set yet. Cannot call removeItemFromFieldArray.');
      return;
    }

    const currentValue = getFieldValue(fieldArrayName);
    if(!Array.isArray(currentValue)){
      console.error(fieldArrayName, 'is not an array of fields, cannot add item.');
      return;
    }

    const newValue = [...currentValue];
    newValue.splice(index, 1);
    setFieldValue(fieldArrayName, newValue);

    // see above comment in addItemToFieldArray
    setDummyState(s => s + 1);
  };

  return {
    $: $,
    getFieldsValues: getFieldsValues,
    getFieldValue: getFieldValue,
    setFieldValue: setFieldValue,
    addItemToFieldArray: addItemToFieldArray,
    removeItemFromFieldArray: removeItemFromFieldArray,
  };
};
