import React, { FC, useEffect } from 'react';
import { FormContext, useForm } from 'react-hook-form';
import { isObjKey } from '../../utils/utils';
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
const RruForm: FC<RruFormProps> = ({
  initialValues,
  validationSchema,
  onSubmit,
  watch,
  watcher,
  children,
}) => {
  // transform initialValues object to meet our requirements:
  // 1- grouped-multi-checkbox and multi-checkbox elements needs initial value array to have string items not integers
  if (initialValues) {
    for (const [key, value] of Object.entries(initialValues)) {
      if (value && Array.isArray(value) && isObjKey(initialValues, key)) {
        initialValues[key] = (value as any[]).map((item) => {
          if (typeof item === 'object' && item.id) {
            return item.id + '';
          } else {
            return item + '';
          }
        });
      }
    }
  }

  const form = useForm({
    mode: 'onChange',
    defaultValues: initialValues as IRHFDefaultValues,
    validationSchema: validationSchema,
  });

  useEffect(() => {
    if (watch) {
      if (Array.isArray(watch) && watcher) {
        watcher(form.watch(watch));
      }
    }
  });

  return (
    <FormContext {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {children}
      </form>
    </FormContext>
  );
};

export { RruForm };
