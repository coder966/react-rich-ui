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
 * acceptable types: text (default), password, textarea, select, radio, checkbox
 */
const RruFormElement = props => {
  const {
    name, labelId, type, placeholder, disabled,
    options, inline, longLabel, prepend, append,
    spans, lang
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


          : type === 'textarea' ?
          <textarea {...sharedProps} className={'form-control ' + (formContext.errors[name] ? 'is-invalid' : null)} />


          : type === 'select' ?
          <select className='custom-select' {...sharedProps}>
            {options.map(o => <option key={o.id} value={o.id}>{o.label[lang]}</option>)}
          </select>


          : type === 'radio' ?
          <div className={inline ? 'form-check-inline' : null}>
            {options.map(o => (
              <div className={'form-check' + disabled ? ' disabled' : null}> 
                <input type='radio' {...sharedProps} value={o.id} id={o.id} />
                <label className='form-check-label' htmlFor={o.id}>{o.label[lang]}</label>
              </div>
            ))}
          </div>


          : type === 'checkbox' ?
          <div>  
            <input {...sharedProps} type='checkbox' className={'form-check-input ' + (formContext.errors[name] ? 'is-invalid' : null)}/>
            {longLabel && <label htmlFor={name}>{longLabel}</label>}
          </div>

          : null
        }
        <div>{formContext.errors[name] ? formContext.errors[name].message : null}</div>
      </Row>
    </Col>
  );
};

export {RruForm, RruFormElement};
