import React, { useEffect } from 'react';
import { useState } from 'react';
import {useFormContext} from 'react-hook-form';
import Select from "react-select";
import Label from '../Label';
import ErrorMessage from '../ErrorMessage';
import './../style.css';

/**
  * @author coder966
  */
const MultiSelectInput = props => {
    const {
        name, options, disabled, 
    } = props;

    const [selectControlValue, setSelectControlValue] = useState();
    const formContext = useFormContext();
    formContext.register({name});

    const onSelectChange = opt => { // react-select option datatype
        setSelectControlValue(opt || []);
        formContext.setValue(name, opt ? opt.map(o => o.value) : []);
    }

    // because controlled fields (registered through formContext.register) need to call setValue for the initial value
    // this issue is also present in date and time be is handled in the DatePicker constructor
    useEffect(() => {
        let defaultOptions = [];
        if(props.defaultValue && Array.isArray(props.defaultValue)){
            defaultOptions = options.filter(o => props.defaultValue.includes(o.id+''));
        }
        onSelectChange(defaultOptions.map(o => ({value: o.id, label: o.label})));
    }, []);

    useEffect(() => {
        const currentValue = formContext.getValues()[name];
        if(currentValue){
            onSelectChange(options.filter(o => currentValue.includes(o.id+'')).map(o => ({value: o.id, label: o.label})));
        }
    }, [options]);

    return (
        <div className={(props.className ? props.className : 'form-group')}>
            <Label inputName={props.name} label={props.label} requiredAsterisk={props.requiredAsterisk} labelClassName={props.labelClassName} />
            {selectControlValue ?
                <Select
                    name={name}
                    isMulti={true}
                    isDisabled={disabled}
                    value={selectControlValue}
                    onChange={onSelectChange}
                    options={options.map(o => ({value: o.id, label: o.label}))}
                    styles={{
                        container: (provided, state) => ({
                            ...provided,
                            width: '100%',
                        }),
                        control: (provided, state) => ({
                            ...provided,
                            [formContext.errors[name] ? 'borderColor' : 'dummy']: '#dc3545',
                        }),
                    }}
                />
            : null}
            <ErrorMessage inputName={name} />
        </div>
    );
};

export default MultiSelectInput;
