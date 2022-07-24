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

import React, { FC } from 'react';
import { FormContext, useForm } from 'react-hook-form';
import RruFormProps from './types/RruFormProps';

const RruForm: FC<RruFormProps> = (props) => {
  const form = useForm({
    mode: 'onChange',
    defaultValues: props.initialValues,
    validationSchema: props.validationSchema,
  });

  return (
    <FormContext {...form}>
      <form onSubmit={form.handleSubmit(props.onSubmit)}>
        {props.children}
      </form>
    </FormContext>
  );
};

export default RruForm;
