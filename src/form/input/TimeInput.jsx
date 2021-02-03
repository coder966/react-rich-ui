import React from 'react';
import {useFormContext} from 'react-hook-form';
import DatePicker from "../DatePicker";
import './../style.css';

/**
  * @author coder966
  */
export default TimeInput = props => {
    const {
        name, type, label, disabled, 
    } = props;

    const formContext = useFormContext();
    formContext.register({name});

    return (
        <div className={(props.className ? props.className : 'form-group')}>
            {label && type !== 'checkbox' ?
                <div className={(props.labelClassName ? props.labelClassName : 'mr-1 ml-1') + ' row'}>
                    <label className='custom-label' htmlFor={name}>{label}{props.requiredAsterisk ? <span style={{color: '#dc3545'}}> *</span> : ''}</label>
                </div>
            : null}
            <div className={(props.inputClassName ? props.inputClassName : label ? 'mr-1 ml-1' : '') + ' row'}>
                <div className='input-group'>
                    <div className='input-group-prepend'>
                        <span className={'input-group-text '+(type === 'date' ? 'fa fa-calendar-alt' : 'fas fa-clock')}></span>
                    </div>
                    <DatePicker
                        type='time'
                        onChange={value => formContext.setValue(name, value)}
                        defaultValue={props.defaultValue}
                        reverseDisplayOrder={props.reverseDisplayOrder}
                        isHijri={props.isHijri}
                        isFuture={props.isFuture}
                        isPast={props.isPast}
                        clock={props.clock}
                        maxYearLength={props.maxYearLength}
                        disabled={disabled} />
                </div>
                <div>{formContext.errors[name] ? formContext.errors[name].message : null}</div>
            </div>
        </div>
    );
};
