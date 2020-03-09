import React from 'react';
import useForm, {FormContext, useFormContext} from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import {Row, Col} from 'react-bootstrap';


/**
 * @author coder966
 */
const RruForm = ({ initialValues, validationSchema, onSubmit, watch, children, className }) => {
  const form = useForm({
    mode: 'onChange',
    defaultValues: initialValues,
    validationSchema: validationSchema
  });

  if(watch){
    watch(form.watch);
  }

  return (
    <FormContext {...form}>
      <form className={className} onSubmit={form.handleSubmit(onSubmit)}>
        {children}
      </form>
    </FormContext>
  );
};


/**
 * @author coder966
 * acceptable types: text (default), password
 */
const RruFormElement = props => {
  const {
    name, labelId, type, placeholder, disabled,
    prepend, append,
    spans
  } = props;

  const formContext = useFormContext();

  const sharedProps = {
    id: name, name, placeholder, disabled,
    ref: formContext.register
  }

  // for date only
  if(type === 'date'){
    formContext.register({name})
  }

  return (
    <Col md={spans ? spans : 4} className={props.className ? props.className : 'form-group'}>
      {labelId ?
        <Row className={props.labelClassName ? props.labelClassName : 'mr-4 ml-4'}>
          <label className='custom-label' htmlFor={name}><FormattedMessage id={labelId} /></label>
        </Row>
      : null}
      <Row className={props.inputClassName ? props.inputClassName : labelId ? 'mr-4 ml-4' : ''}>
        {

          !type || type === 'text' || type === 'password' ?
          <div className='input-group'>
            {prepend ?
              <div className='input-group-prepend'>
                <span className='input-group-text'>{prepend}</span>
              </div>
            : null}
            <input {...sharedProps} type={type} className={'form-control ' + (formContext.errors[name] ? 'is-invalid' : null)} />
            {append ?
              <div className='input-group-prepend'>
                <span className='input-group-text'>{append}</span>
              </div>
            : null}
          </div>

          : null
        }
        <div>{formContext.errors[name] ? formContext.errors[name].message : null}</div>
      </Row>
    </Col>
  );
};

export {RruForm, RruFormElement};
