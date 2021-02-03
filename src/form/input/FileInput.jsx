import React from 'react';
import { useState } from 'react';
import {useFormContext} from 'react-hook-form';
import './../style.css';

/**
  * @author coder966
  */
const FileInput = props => {
    const {
        name, type, label, disabled, 
    } = props;

    const [fileName, setFileName] = useState(null);
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
                    <div className='input-group-prepend'>
                        <span className='input-group-text fas fa-file'></span>
                    </div>
                    <input type='file' {...sharedProps} onChange={e => {
                        const filesList = e.target.files;
                        if(filesList && filesList[0]){
                            setFileName(filesList[0].name);
                        }else{
                            setFileName(null);
                        }
                    }} />
                    <div className={'form-control fileUpload ' + (formContext.errors[name] ? ' is-invalid' : '')} onClick={e => document.getElementById(name).click()}>
                        {fileName}
                    </div>
                </div>
                <div>{formContext.errors[name] ? formContext.errors[name].message : null}</div>
            </div>
        </div>
    );
};

export default FileInput;
