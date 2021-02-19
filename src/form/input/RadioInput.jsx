import React from 'react';
import {useFormContext} from 'react-hook-form';
import Label from '../Label';
import ErrorMessage from '../ErrorMessage';
import './../style.css';

/**
  * @author coder966
  */
const RadioInput = props => {
    const {
        name, options, disabled, 
    } = props;

    const formContext = useFormContext();

    return (
        <div className={(props.className ? props.className : 'form-group')}>
            <Label inputName={props.name} label={props.label} requiredAsterisk={props.requiredAsterisk} />
            <div className={props.inline ? 'form-check-inline' : null}>
                {options.map(o => (
                    <div key={`${name}_${o.id}`} className={'form-check' + disabled ? ' disabled' : null}> 
                        <input type='radio' ref={formContext.register} name={name} disabled={disabled} value={o.id} id={`${name}_${o.id}`} />
                        <label className='form-check-label' htmlFor={`${name}_${o.id}`}>{o.label}</label>
                    </div>
                ))}
            </div>
            <ErrorMessage inputName={name} />
        </div>
    );
};

export default RadioInput;
