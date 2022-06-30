import React, { FC, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import ErrorMessage from '../common/ErrorMessage';
import Label from '../common/Label';

type InputProps = JSX.IntrinsicElements['input'];

export interface RruFileInputProps extends InputProps {
  /**  */
  name: string;

  /**  */
  label?: React.ReactNode;

  /** A placeholder to be displayed in the place of the filename of the file selected. */
  placeholder?: string;

  /**  */
  requiredAsterisk?: boolean;
}

/**
 * @author coder966
 */
const RruFileInput: FC<RruFileInputProps> = (props) => {
  const { name, placeholder } = props;

  const [fileName, setFileName] = useState<string | null>(null);
  const formContext = useFormContext();

  return (
    <div className='form-group'>
      <Label inputName={props.name} label={props.label} requiredAsterisk={props.requiredAsterisk} />
      <input
        {...props}
        type='file'
        id={`file_${name}`}
        ref={(input) => {formContext.register(input)}}
        name={name}
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

export { RruFileInput };

