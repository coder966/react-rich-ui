import React, { FC, useEffect } from 'react';
import { FormContext, useForm } from 'react-hook-form';
import { isObjKey } from '../utils/utilFunction';
import CheckboxInput from './input/CheckboxInput';
import DateInput from './input/DateInput';
import FileInput from './input/FileInput';
import GroupedMultiCheckboxInput from './input/GroupedMultiCheckboxInput';
import MultiCheckboxInput from './input/MultiCheckboxInput';
import MultiSelectInput from './input/MultiSelectInput';
import PasswordInput from './input/PasswordInput';
import RadioInput from './input/RadioInput';
import SelectInput from './input/SelectInput';
import TextareaInput from './input/TextareaInput';
import TextInput from './input/TextInput';
import TimeInput from './input/TimeInput';
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
  watch?: string[] | ((watch: (fieldNames: string[]) => FormValues) => void);

  /** The method that gets called whenever a watched field changes. */
  watcher?: (form: FormValues) => void;

  /**  */
  children: React.ReactNode | React.ReactNode[];

  /**  */
  className?: string;

}

/**
 * A form that is capable of initializing and validating uncontrolled input elements as well as
 * providing a subscription pattern to these elements.
 * 
 * @author coder966
 */
const RruForm: FC<RruFormProps> = ({ initialValues, validationSchema, onSubmit, watch, watcher, children, className }) => {
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
      if (typeof watch === 'function') {
        // TODO: remove deprecated
        watch(form.watch);
      } else if (Array.isArray(watch) && watcher) {
        watcher(form.watch(watch));
      }
    }
  });

  return (
    <FormContext {...form}>
      <form className={className} onSubmit={form.handleSubmit(onSubmit)}>
        {children}
      </form>
    </FormContext>
  );
};

/**
 * An uncontrolled input element. Checkout the props definition based on the type of the element.
 * 
 * @author coder966
 */
const RruFormElement = (props: any) => {
  switch (props.type) {
    case 'text':
      return <TextInput {...props} />;
    case 'password':
      return <PasswordInput {...props} />;
    case 'textarea':
      return <TextareaInput {...props} />;
    case 'radio':
      return <RadioInput {...props} />;
    case 'select':
      return <SelectInput {...props} />;
    case 'multi-select':
      return <MultiSelectInput {...props} />;
    case 'checkbox':
      return <CheckboxInput {...props} />;
    case 'multi-checkbox':
      return <MultiCheckboxInput {...props} />;
    case 'grouped-multi-checkbox':
      return <GroupedMultiCheckboxInput {...props} />;
    case 'date':
      return <DateInput {...props} />;
    case 'time':
      return <TimeInput {...props} />;
    case 'file':
      return <FileInput {...props} />;
    default:
      return null;
  }
};

export { RruForm, RruFormElement };
