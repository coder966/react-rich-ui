import React, { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import ErrorMessage from '../common/ErrorMessage';
import Label from '../common/Label';
import RruMultiCheckboxInputProps from './types/RruMultiCheckboxInputProps';

/**
 * @author coder966
 */
const RruMultiCheckboxInput: FC<RruMultiCheckboxInputProps> = (props) => {
  const { name, options } = props;

  const formContext = useFormContext();

  return (
    <div className='form-group'>
      <Label inputName={props.name} label={props.label} requiredAsterisk={props.requiredAsterisk} />
      {/* these hidden options are important because if options size is 1 then form submit result will be string instead of array with one item
            and if options size is zero then will result in false instead of an empty array */}
      <input
        id={`${name}_hidden1`}
        name={name}
        ref={formContext.register}
        value={'hidden1'}
        type='checkbox'
        disabled
        style={{ display: 'none' }}
      />
      <input
        id={`${name}_hidden2`}
        name={name}
        ref={formContext.register}
        value={'hidden2'}
        type='checkbox'
        disabled
        style={{ display: 'none' }}
      />
      <div className='row'>
        {options.map((o) => (
          <div key={`${name}_${o.value}`} className='col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3'>
            <div className='custom-control custom-checkbox m-1'>
              <input
                {...props}
                id={`${name}_${o.value}`}
                name={name}
                ref={formContext.register}
                value={o.value}
                type='checkbox'
                className='custom-control-input'
              />
              <label htmlFor={`${name}_${o.value}`} className='custom-control-label'>
                {o.label}
              </label>
            </div>
          </div>
        ))}
      </div>
      <ErrorMessage inputName={name} />
    </div>
  );
};

export default RruMultiCheckboxInput;

