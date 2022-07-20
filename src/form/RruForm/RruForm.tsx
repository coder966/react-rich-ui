import React, { FC, useEffect } from 'react';
import { FormContext, useForm } from 'react-hook-form';
import './style.css';
import RruFormProps from './types/RruFormProps';

/**
 * A form that is capable of initializing and validating uncontrolled input elements as well as
 * providing a subscription pattern to these elements.
 *
 * @author coder966
 */
const RruForm: FC<RruFormProps> = (props) => {
  const form = useForm({
    mode: 'onChange',
    defaultValues: props.initialValues,
    validationSchema: props.validationSchema,
  });

  useEffect(() => {
    if (props.watch) {
      if (Array.isArray(props.watch) && props.watcher) {
        props.watcher(form.watch(props.watch));
      }
    }
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
