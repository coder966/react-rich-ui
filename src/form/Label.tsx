import React, { FC } from 'react';

export interface LabelProps {
    inputName: string,
    label?: React.ReactNode,
    requiredAsterisk?: boolean,
}

/**
  * @author coder966
  */
const Label: FC<LabelProps> = props => {
    const {
        inputName, label, requiredAsterisk
    } = props;

    return label ?
        <label className={requiredAsterisk ? 'required-asterisk' : ''} htmlFor={inputName}>{label}</label>
    : null;
};

export default Label;
