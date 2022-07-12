import React, { FC, useEffect } from 'react';
import { FormContext, useForm } from 'react-hook-form';
import './style.css';
import FormInitialValues from './types/FormInitialValues';
import FormValues from './types/FormValues';
import IRHFDefaultValues from './types/IRHFDefaultValues';

export interface RruFormProps {
  /**  */
  initialValues?: FormInitialValues;

  /**  */
  validationSchema?: object;

  /**  */
  onSubmit: (form: FormValues) => void;

  /** An array of the filed names you want to watch for changes. */
  watch?: string[];

  /** The method that gets called whenever a watched field changes. */
  watcher?: (form: FormValues) => void;

  /**  */
  children: React.ReactNode | React.ReactNode[];
}

/**
 * A form that is capable of initializing and validating uncontrolled input elements as well as
 * providing a subscription pattern to these elements.
 *
 * @author coder966
 */
const RruForm: FC<RruFormProps> = (props) => {
  const form = useForm({
    mode: 'onChange',
    defaultValues: props.initialValues as IRHFDefaultValues,
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

export { RruForm };
