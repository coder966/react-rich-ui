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
        name, placeholder, disabled
    } = props;

    const [fileName, setFileName] = useState(null);
    const formContext = useFormContext();

    return (
        <div className={(props.className ? props.className : 'form-group')}>
            <Label inputName={props.name} label={props.label} requiredAsterisk={props.requiredAsterisk} />
            <input type='file' id={`file_${name}`} ref={formContext.register} name={name} disabled={disabled} onChange={e => {
                const filesList = e.target.files;
                if(filesList && filesList[0]){
                    setFileName(filesList[0].name);
                }else{
                    setFileName(null);
                }
            }} />
            <div className={'form-control fileUpload ' + (formContext.errors[name] ? ' is-invalid' : '')} onClick={e => document.getElementById(`file_${name}`).click()}>
                {fileName || placeholder}
            </div>
            <ErrorMessage inputName={name} />
        </div>
    );
};

export default FileInput;
