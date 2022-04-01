import React, { FC, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import ErrorMessage from '../ErrorMessage';
import Label from '../Label';

export interface FileInputProps {
  /**  */
  name: string;

  /**  */
  label?: React.ReactNode;

  /**  */
  disabled?: boolean;

  /**  */
  className?: string;

  /** A placeholder to be displayed in the place of the filename of the file selected. */
  placeholder?: string;

  /**  */
  accept?: string;

  /**  */
  requiredAsterisk?: boolean;
}

/**
 * @author coder966
 */
const FileInput: FC<FileInputProps> = (props) => {
  const { name, placeholder, disabled } = props;

  const [fileName, setFileName] = useState<string | null>(null);
  const formContext = useFormContext();

  return (
    <div className={props.className ? props.className : 'form-group'}>
      <Label inputName={props.name} label={props.label} requiredAsterisk={props.requiredAsterisk} />
      <input
        type='file'
        id={`file_${name}`}
        ref={formContext.register}
        name={name}
        disabled={disabled}
        accept={props.accept}
        onChange={(e) => {
          const filesList = e.target.files;
          if (filesList && filesList[0]) {
            setFileName(filesList[0].name);
          } else {
            setFileName(null);
          }
        }}
      />
      <div
        className={'form-control fileUpload ' + (formContext.errors[name] ? ' is-invalid' : '')}
        onClick={(e) => {
          const fileInput = document.getElementById(`file_${name}`);
          if (fileInput) {
            fileInput.click();
          }
        }}
      >
        {fileName || placeholder}
      </div>
      <ErrorMessage inputName={name} />
    </div>
  );
};

export default FileInput;
