import React, { useEffect } from 'react';
import { useState } from 'react';
import {useFormContext} from 'react-hook-form';
import Select from "react-select";
import './../style.css';

/**
  * @author coder966
  */
const SelectInput = props => {
    const {
        name, label, options, disabled, 
    } = props;

    const [selectControlValue, setSelectControlValue] = useState();
    const formContext = useFormContext();
    formContext.register({name});

    const onSelectChange = opt => { // react-select option datatype
        setSelectControlValue({value: opt ? opt.value : '', label: opt ? opt.label : ''});
        formContext.setValue(name, opt ? opt.value : '');
    }

    // because controlled fields (registered through formContext.register) need to call setValue for the initial value
    // this issue is also present in date and time be is handled in the DatePicker constructor
    useEffect(() => {
        let defaultOption;
        if(props.defaultValue){
            defaultOption = options.find(o => o.id+'' === props.defaultValue+'');
        }else{
            defaultOption = options[0];
        }
        defaultOption = defaultOption || {id: '', label: ''};
        defaultOption.value = defaultOption.id;
        onSelectChange(defaultOption);
    }, []);

    useEffect(() => {
        const currentValue = formContext.getValues()[name];
        if(currentValue && !options.find(o => o.id+'' === currentValue+'')){
            onSelectChange({value: '', label: ''});
        }
    }, [options]);

    return (
        <div className={(props.className ? props.className : 'form-group')}>
            {label ?
                <div className={(props.labelClassName ? props.labelClassName : 'mr-1 ml-1') + ' row'}>
                    <label className='custom-label' htmlFor={name}>{label}{props.requiredAsterisk ? <span style={{color: '#dc3545'}}> *</span> : ''}</label>
                </div>
            : null}
            <div className={(props.inputClassName ? props.inputClassName : label ? 'mr-1 ml-1' : '') + ' row'}>
                {selectControlValue ?
                    <Select
                        name={name}
                        isMulti={false}
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
                <div>{formContext.errors[name] ? formContext.errors[name].message : null}</div>
            </div>
        </div>
    );
};

export default SelectInput;
