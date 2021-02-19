import React from 'react';
import {useFormContext} from 'react-hook-form';
import Label from '../Label';
import './../style.css';

/**
  * @author coder966
  */
const PasswordInput = props => {
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
            <input {...sharedProps} type='password' className={'form-control ' + (formContext.errors[name] ? 'is-invalid' : '')} />
            <div>{formContext.errors[name] ? formContext.errors[name].message : null}</div>
        </div>
    );
};

export default PasswordInput;
