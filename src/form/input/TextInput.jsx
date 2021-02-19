import React from 'react';
import {useFormContext} from 'react-hook-form';
import Label from '../Label';
import './../style.css';

/**
  * @author coder966
  */
const TextInput = props => {
    const {
        name, disabled, prepend, append, 
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
            <div className='input-group'>
                {prepend ?
                    <div className='input-group-prepend'>
                        <span className='input-group-text'>{prepend}</span>
                    </div>
                : null}
                <input {...sharedProps} type='text' className={'form-control ' + (formContext.errors[name] ? 'is-invalid' : '')} />
                {append ?
                    <div className='input-group-append'>
                        <span className='input-group-text'>{append}</span>
                    </div>
                : null}
            </div>
            <div>{formContext.errors[name] ? formContext.errors[name].message : null}</div>
        </div>
    );
};

export default TextInput;