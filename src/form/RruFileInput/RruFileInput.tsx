import React, { FC, useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Label from '../Label/Label';
import './style.css';
import RruFileInputProps from './types/RruFileInputProps';

/**
 * @author coder966
 */
const RruFileInput: FC<RruFileInputProps> = (props) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const formContext = useFormContext();
  const ref = useRef<HTMLInputElement>(null);

  // init
  useEffect(() => {
    formContext.register({ name: props.name });
    formContext.setValue(props.name, null);
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filesList = e.target.files;
    if (filesList && filesList[0]) {
      setFileName(filesList[0].name);
      formContext.setValue(props.name, filesList[0]);
    } else {
      setFileName(null);
      formContext.setValue(props.name, null);
    }
  }

  return (
    <div className='form-group'>
      <Label inputName={props.name} label={props.label} requiredAsterisk={props.requiredAsterisk} />
      <input
        {...props}
        className='rru-file-input__input'
        type='file'
        ref={ref}
        name={props.name}
        onChange={onChange}
      />
      <div
        className={`form-control rru-file-input__visible-control ${formContext.errors[props.name] ? 'is-invalid' : ''}`}
        onClick={(e) => {
          if (ref.current) {
            ref.current.click();
          }
        }}
      >
        {fileName || props.placeholder}
      </div>
      <ErrorMessage inputName={props.name} />
    </div>
  );
};

export default RruFileInput;

