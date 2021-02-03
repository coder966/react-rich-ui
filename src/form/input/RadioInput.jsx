import React from 'react';
import {useFormContext} from 'react-hook-form';
import './../style.css';

/**
  * @author coder966
  */
const RadioInput = props => {
    const {
        name, type, label, options, disabled, 
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
                <div className={props.inline ? 'form-check-inline' : null}>
                    {options.map(o => (
                        <div key={`${name}_${o.id}`} className={'form-check' + disabled ? ' disabled' : null}> 
                            <input type='radio' {...sharedProps} value={o.id} id={o.id} />
                            <label className='form-check-label' htmlFor={o.id}>{o.label}</label>
                        </div>
                    ))}
                </div>
                <div>{formContext.errors[name] ? formContext.errors[name].message : null}</div>
            </div>
        </div>
    );
};

export default RadioInput;
