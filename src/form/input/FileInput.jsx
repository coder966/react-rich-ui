import React from 'react';
import { useState } from 'react';
import {useFormContext} from 'react-hook-form';
import Label from '../Label';
import ErrorMessage from '../ErrorMessage';
import './../style.css';

/**
  * @author coder966
  */
const FileInput = props => {
    const {
        name, placeholder
    } = props;

    const [fileName, setFileName] = useState(null);
    const formContext = useFormContext();

    const sharedProps = {
        ref: formContext.register,
        id: name,
        name: name,
        disabled: props.disabled,
        maxLength: props.maxLength,
    }

    return (
        <div className={(props.className ? props.className : 'form-group')}>
            <Label inputName={props.name} label={props.label} requiredAsterisk={props.requiredAsterisk} labelClassName={props.labelClassName} />
            <input type='file' {...sharedProps} onChange={e => {
                const filesList = e.target.files;
                if(filesList && filesList[0]){
                    setFileName(filesList[0].name);
                }else{
                    setFileName(null);
                }
            }} />
            <div className={'form-control fileUpload ' + (formContext.errors[name] ? ' is-invalid' : '')} onClick={e => document.getElementById(name).click()}>
                {fileName || placeholder}
            </div>
            <ErrorMessage inputName={name} />
        </div>
    );
};

export default FileInput;
