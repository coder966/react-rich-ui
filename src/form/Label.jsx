import React from 'react';

/**
  * @author coder966
  */
const Label = props => {
    const {
        inputName, label, requiredAsterisk
    } = props;

    return label ?
        <label className={requiredAsterisk ? 'required-asterisk' : ''} htmlFor={inputName}>{label}</label>
    : null;
};

export default Label;
