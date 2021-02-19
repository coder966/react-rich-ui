import React from 'react';
import {useFormContext} from 'react-hook-form';
import DatePicker from "../DatePicker";
import Label from '../Label';
import './../style.css';

/**
  * @author coder966
  */
const TimeInput = props => {
    const {
        name, disabled, 
    } = props;

    const formContext = useFormContext();
    formContext.register({name});

    return (
        <div className={(props.className ? props.className : 'form-group')}>
            <Label inputName={props.name} label={props.label} requiredAsterisk={props.requiredAsterisk} labelClassName={props.labelClassName} />
            <div className='input-group'>
                <div className='input-group-prepend'>
                    <span className={'input-group-text fas fa-clock'}></span>
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
    );
};

export default TimeInput;
