import React from 'react';
import {useFormContext} from 'react-hook-form';
import './../style.css';

/**
  * @author coder966
  */
const CheckboxInput = props => {
    const {
        name, label, disabled, 
    } = props;

    const formContext = useFormContext();

    return (
        <div className={(props.className ? props.className : 'form-group')}>
            <div className={(props.inputClassName ? props.inputClassName : label ? 'mr-1 ml-1' : '') + ' row'}>
                <div className='custom-control custom-checkbox m-1'>
                    <input id={name} name={name} ref={formContext.register} type='checkbox' className={'custom-control-input ' + (formContext.errors[name] ? 'is-invalid' : '')} disabled={disabled} />
                    <label htmlFor={name} className='custom-control-label'>{label}</label>
                </div>
                <div>{formContext.errors[name] ? formContext.errors[name].message : null}</div>
            </div>
        </div>
    );
};

export default CheckboxInput;
