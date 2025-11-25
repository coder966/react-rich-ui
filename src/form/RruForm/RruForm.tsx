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

import { yupResolver } from '@hookform/resolvers/yup';
import { BaseSyntheticEvent, FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import './style.css';
import RruFormProps, { RruFormFieldValueType } from './types/RruFormProps';

const RruForm: FC<RruFormProps> = (props) => {
  let config: any = {
    defaultValues: props.initialValues,
  };

  if (props.yupValidationSchema) {
    config = {
      ...config,
      resolver: yupResolver(props.yupValidationSchema),
    };
  }

  const form = useForm(config);

  if (props.context) {
    props.context.$(form);
  }

  const onSubmit = (formValuesObject: Record<string, RruFormFieldValueType>, event?: BaseSyntheticEvent) => {
    // @ts-expect-error Property submitter does not exist on type object
    const isSubmitButton = event?.nativeEvent?.submitter?.attributes?.type?.value?.toLowerCase() === 'submit';

    // the default behaviour of <button> without "type" attribute set to "submit", is to submit its parent form, if any.
    // while this is the default on web, it is very strange to me, so I will restrict `type="submit"` only

    if (isSubmitButton) {
      props.onSubmit(formValuesObject);
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} id={props.id}>
        {props.children}
      </form>
    </FormProvider>
  );
};

export default RruForm;
