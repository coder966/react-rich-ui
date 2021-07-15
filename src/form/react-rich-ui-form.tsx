import React, { FC, useEffect } from 'react';
import { FormContext, useForm } from 'react-hook-form';
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

export interface RruFormProps {
    initialValues?: object,
    validationSchema?: object,
    onSubmit: (form: object) => void,
    watch?: Array<string> | ((watch: ((fieldNames: Array<string>) => object)) => void),
    watcher?: (form: object) => void,
    children: JSX.Element | JSX.Element[],
    className?: string,
}

/**
  * @author coder966
  */
const RruForm: FC<RruFormProps> = ({ initialValues, validationSchema, onSubmit, watch, watcher, children, className }) => {
    // transform initialValues object to meet our requirements:
    // 1- grouped-multi-checkbox and multi-checkbox elements needs initial value array to have string items not integers
    if(initialValues){
        for(const [key, value] of Object.entries(initialValues)){
            if(value && Array.isArray(value)){
                initialValues[key] = value.map(item => {
                    if(typeof item === 'object' && item.id){
                        return item.id+'';
                    }else{
                        return item+'';
                    }
                });
            }
        }
    }

    const form = useForm({
        mode: 'onChange',
        defaultValues: initialValues,
        validationSchema: validationSchema
    });

    useEffect(() => {
        if(watch){
            if(typeof watch === 'function'){
                // TODO: remove deprecated
                watch(form.watch);
            }else if(Array.isArray(watch) && watcher){
                watcher(form.watch(watch))
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
  * @author coder966
  */
const RruFormElement = props => {
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
