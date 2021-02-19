import React from 'react';

/**
  * @author coder966
  */
const Label = props => {
    const {
        inputName, label, requiredAsterisk, labelClassName
    } = props;

    return label ?
        <div className={(labelClassName ? labelClassName : 'mr-1 ml-1') + ' row'}>
            <label className={requiredAsterisk ? 'required-asterisk' : ''} htmlFor={inputName}>{label}</label>
        </div>
    : null;
};

export default Label;
