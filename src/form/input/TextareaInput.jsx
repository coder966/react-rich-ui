import React from 'react';
import {useFormContext} from 'react-hook-form';
import Label from '../Label';
import ErrorMessage from '../ErrorMessage';
import './../style.css';

/**
  * @author coder966
  */
const TextareaInput = props => {
    const {
        name, disabled, maxLength, placeholder
    } = props;

    const formContext = useFormContext();

    return (
        <div className={(props.className ? props.className : 'form-group')}>
            <Label inputName={props.name} label={props.label} requiredAsterisk={props.requiredAsterisk} />
            <textarea ref={formContext.register} name={name} disabled={disabled} maxLength={maxLength} placeholder={placeholder} className={'form-control ' + (formContext.errors[name] ? 'is-invalid' : '')} />
            <ErrorMessage inputName={name} />
        </div>
    );
};

export default TextareaInput;
