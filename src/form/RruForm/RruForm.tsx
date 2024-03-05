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
import React, { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import './style.css';
import RruFormProps from './types/RruFormProps';

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

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit((formValuesObject, event) => {
          // @ts-ignore
          // this fixes when buttons with type != submit would cause the form to submit,
          // this appears to be a bug in react-hook-form, remove when fixed
          if (event?.nativeEvent?.submitter?.attributes?.type?.value?.toLowerCase() === 'submit') {
            props.onSubmit(formValuesObject);
          }
        })}
        id={props.id}>
        {props.children}
      </form>
    </FormProvider>
  );
};

export default RruForm;
