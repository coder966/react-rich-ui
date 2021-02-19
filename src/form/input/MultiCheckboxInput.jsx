import React from 'react';
import {useFormContext} from 'react-hook-form';
import Label from '../Label';
import ErrorMessage from '../ErrorMessage';
import './../style.css';

/**
  * @author coder966
  */
const MultiCheckboxInput = props => {
    const {
        name, options, disabled, 
    } = props;

    const formContext = useFormContext();

    return (
        <div className={(props.className ? props.className : 'form-group')}>
            <Label inputName={props.name} label={props.label} requiredAsterisk={props.requiredAsterisk} labelClassName={props.labelClassName} />
            {/* these hidden options are important because if options size is 1 then form submit result will be string instead of array with one item
            and if options size is zero then will result in false instead of an empty array */}
            <input id={`${name}_hidden1`} name={name} ref={formContext.register} value={'hidden1'} type='checkbox' disabled style={{display: 'none'}} />
            <input id={`${name}_hidden2`} name={name} ref={formContext.register} value={'hidden2'} type='checkbox' disabled style={{display: 'none'}} />
            <div className='row'>
                {options.map(o => (
                    <div key={`${name}_${o.id}`} className='col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3'>
                        <div className='custom-control custom-checkbox m-1'>
                            <input id={`${name}_${o.id}`} name={name} ref={formContext.register} value={o.id} type='checkbox' className='custom-control-input' disabled={disabled} />
                            <label htmlFor={`${name}_${o.id}`} className='custom-control-label'>{o.label}</label>
                        </div>
                    </div>
                ))}
            </div>
            <ErrorMessage inputName={name} />
        </div>
    );
};

export default MultiCheckboxInput;
