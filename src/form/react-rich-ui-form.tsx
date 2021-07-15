import React, { useEffect } from 'react';
import {useForm, FormContext} from 'react-hook-form';
import TextInput from './input/TextInput';
import PasswordInput from './input/PasswordInput';
import TextareaInput from './input/TextareaInput';
import RadioInput from './input/RadioInput';
import SelectInput from './input/SelectInput';
import MultiSelectInput from './input/MultiSelectInput';
import CheckboxInput from './input/CheckboxInput';
import MultiCheckboxInput from './input/MultiCheckboxInput';
import GroupedMultiCheckboxInput from './input/GroupedMultiCheckboxInput';
import DateInput from './input/DateInput';
import TimeInput from './input/TimeInput';
import FileInput from './input/FileInput';
import './style.css';

/**
  * @author coder966
  */
const RruForm = ({ initialValues, validationSchema, onSubmit, watch, watcher, children, className }) => {
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
            if(Array.isArray(watch) && watcher){
                watcher(form.watch(watch))
            }else{
                // TODO: remove deprecated
                watch(form.watch);
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

export {RruForm, RruFormElement};
