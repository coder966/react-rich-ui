import React from 'react';
import {useFormContext} from 'react-hook-form';
import './../style.css';

/**
  * @author coder966
  */
const MultiCheckboxInput = props => {
    const {
        name, type, label, options, disabled, 
    } = props;

    const formContext = useFormContext();

    return (
        <div className={(props.className ? props.className : 'form-group')}>
            {label && type !== 'checkbox' ?
                <div className={(props.labelClassName ? props.labelClassName : 'mr-1 ml-1') + ' row'}>
                    <label className='custom-label' htmlFor={name}>{label}{props.requiredAsterisk ? <span style={{color: '#dc3545'}}> *</span> : ''}</label>
                </div>
            : null}
            <div className={(props.inputClassName ? props.inputClassName : label ? 'mr-1 ml-1' : '') + ' row'}>
                {/* these hidden options are important because if options size is 1 then form submit result will be string instead of array with one item
                and if options size is zero then will result in false instead of an empty array */}
                <input id={`${name}_hidden1`} name={name} ref={formContext.register} value={'hidden1'} type='checkbox' disabled style={{display: 'none'}} />
                <input id={`${name}_hidden2`} name={name} ref={formContext.register} value={'hidden2'} type='checkbox' disabled style={{display: 'none'}} />
                {options.map(o => (
                    <div key={`${name}_${o.id}`} className='col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3'>
                        <div className='custom-control custom-checkbox m-1'>
                            <input id={`${name}_${o.id}`} name={name} ref={formContext.register} value={o.id} type='checkbox' className='custom-control-input' disabled={disabled} />
                            <label htmlFor={`${name}_${o.id}`} className='custom-control-label'>{o.label}</label>
                        </div>
                    </div>
                ))}
                <div>{formContext.errors[name] ? formContext.errors[name].message : null}</div>
            </div>
        </div>
    );
};

export default MultiCheckboxInput;
