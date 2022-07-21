import React, { FC } from 'react';
import './style.css';

export interface LabelProps {
  /**  */
  inputName: string;

  /**  */
  label?: React.ReactNode;

  /**  */
  requiredAsterisk?: boolean;
}

/**
 * @author coder966
 */
const Label: FC<LabelProps> = (props) => {
  const { inputName, label, requiredAsterisk } = props;

  return label ? (
    <label className={requiredAsterisk ? 'rru-form-label--required-asterisk' : ''} htmlFor={inputName}>
      {label}
    </label>
  ) : null;
};

export default Label;
