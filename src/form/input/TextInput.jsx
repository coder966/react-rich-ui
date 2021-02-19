import React from 'react';
import {useFormContext} from 'react-hook-form';
import Label from '../Label';
import ErrorMessage from '../ErrorMessage';
import './../style.css';

/**
  * @author coder966
  */
const TextInput = props => {
    const {
        name, disabled,
    } = props;

    const formContext = useFormContext();

    const sharedProps = {
        ref: formContext.register,
        id: name,
        name: name,
        disabled: disabled,
        placeholder: props.placeholder,
        maxLength: props.maxLength,
    }

    return (
        <div className={(props.className ? props.className : 'form-group')}>
            <Label inputName={props.name} label={props.label} requiredAsterisk={props.requiredAsterisk} labelClassName={props.labelClassName} />
            <input {...sharedProps} type='text' className={'form-control ' + (formContext.errors[name] ? 'is-invalid' : '')} />
            <ErrorMessage inputName={name} />
        </div>
    );
};

export default TextInput;
