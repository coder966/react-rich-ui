import React from 'react';
import {useFormContext} from 'react-hook-form';
import './../style.css';

/**
  * @author coder966
  */
const TextInput = props => {
    const {
        name, type, label, disabled, prepend, append, 
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
            {label && type !== 'checkbox' ?
                <div className={(props.labelClassName ? props.labelClassName : 'mr-1 ml-1') + ' row'}>
                    <label className='custom-label' htmlFor={name}>{label}{props.requiredAsterisk ? <span style={{color: '#dc3545'}}> *</span> : ''}</label>
                </div>
            : null}
            <div className={(props.inputClassName ? props.inputClassName : label ? 'mr-1 ml-1' : '') + ' row'}>
                <div className='input-group'>
                    {prepend ?
                        <div className='input-group-prepend'>
                            <span className='input-group-text'>{prepend}</span>
                        </div>
                    : null}
                    <input {...sharedProps} type={type} className={'form-control ' + (formContext.errors[name] ? 'is-invalid' : '')} />
                    {append ?
                        <div className='input-group-prepend'>
                            <span className='input-group-text'>{append}</span>
                        </div>
                    : null}
                </div>
                <div>{formContext.errors[name] ? formContext.errors[name].message : null}</div>
            </div>
        </div>
    );
};

export default TextInput;
