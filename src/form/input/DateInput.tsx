import React from 'react';
import {useFormContext} from 'react-hook-form';
import DateTimePicker from "../DateTimePicker";
import Label from '../Label';
import ErrorMessage from '../ErrorMessage';
import './../style.css';

/**
  * @author coder966
  */
const DateInput = props => {
    const {
        name, disabled, 
    } = props;

    const formContext = useFormContext();
    formContext.register({name});

    return (
        <div className={(props.className ? props.className : 'form-group')}>
            <Label inputName={props.name} label={props.label} requiredAsterisk={props.requiredAsterisk} />
            <DateTimePicker
                type='date'
                onChange={value => formContext.setValue(name, value)}
                defaultValue={props.defaultValue}
                reverseDisplayOrder={props.reverseDisplayOrder}
                isHijri={props.isHijri}
                isFuture={props.isFuture}
                isPast={props.isPast}
                clock={props.clock}
                maxYearLength={props.maxYearLength}
                disabled={disabled} />
            <ErrorMessage inputName={name} />
        </div>
    );
};

export default DateInput;
