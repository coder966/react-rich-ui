import React from 'react';
import useForm, {FormContext, useFormContext} from 'react-hook-form';
import moment from 'moment-hijri';
import {Container, Row, Col} from 'react-bootstrap';
import './style.css';

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
 * acceptable types: text (default), password, textarea, select, radio, checkbox, multi-checkbox, grouped-multi-checkbox, date, file
 */
const RruFormElement = props => {
  const {
    name, label, type, placeholder, disabled,
    options, inline, longLabel, prepend, append, isHijri, isFuture, isPast, maxlength,
    spans, lang
  } = props;

  const formContext = useFormContext();

  const sharedProps = {
    id: name, name, placeholder, disabled, maxlength,
    ref: formContext.register
  }

  // for date only
  if(type === 'date' || type === 'time' || type === 'datetime'){
    formContext.register({name})
  }

  const onDateChange = date => formContext.setValue(name, date);

  return (
    <Col md={spans ? spans : 4} className={props.className ? props.className : 'form-group'}>
      {label ?
        <Row className={props.labelClassName ? props.labelClassName : 'mr-4 ml-4'}>
          <label className='custom-label' htmlFor={name}>{label}</label>
        </Row>
      : null}
      <Row className={props.inputClassName ? props.inputClassName : label ? 'mr-4 ml-4' : ''}>
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


          : type === 'multi-checkbox' ?
          <Container>
            <Row>
              {options.map(o => (
                <Col key={o.id} md='3'>
                  <div className='custom-control custom-checkbox m-1'>
                    <input id={o.id} name={name} ref={formContext.register} value={o.id} type='checkbox' className='custom-control-input' disabled={disabled} />
                    <label htmlFor={o.id} className='custom-control-label'>{o.label[lang]}</label>
                  </div>
                </Col>
              ))}
            </Row>
          </Container>


          : type === 'grouped-multi-checkbox' ?
          <Container>
            {options.map(g => 
              <>
                <div className='grouped-multi-checkbox-group-header'>{g.label[lang]}</div>
                <Row className='grouped-multi-checkbox-group-row'>
                  {g.items.map(o => (
                    <Col key={o.id} md='3'>
                      <div className='custom-control custom-checkbox m-1'>
                        <input id={o.id} name={name} ref={formContext.register} value={o.id} type='checkbox' className='custom-control-input' disabled={disabled} />
                        <label htmlFor={o.id} className='custom-control-label'>{o.label[lang]}</label>
                      </div>
                    </Col>
                  ))}
                </Row>
              </>
            )}
          </Container>


          : type === 'date' || type === 'time' ?
          <div className='input-group'>
            <div className='input-group-prepend'>
              <span className={'input-group-text '+(type === 'date' ? 'fa fa-calendar-alt' : 'fas fa-clock')}></span>
            </div>
            <DatePicker disabled={disabled} onChange={onDateChange} isHijri={isHijri} isFuture={isFuture} isPast={isPast} type={type} />
          </div>


          : type === 'file' ?
          <div className='input-group'>
            <div className='input-group-prepend'>
              <span className='input-group-text fas fa-file'></span>
            </div>
            <input type='file' {...sharedProps} />
            <div className={'fileUpload' + (formContext.errors[name] ? ' is-invalid' : '')} onClick={e => document.getElementById(name).click()}>
            {(() => {
              const e = document.getElementById(name);
              return e && e.files[0] ? e.files[0].name : null;
            })()}
            </div>
          </div>


          : null
        }
        <div>{formContext.errors[name] ? formContext.errors[name].message : null}</div>
      </Row>
    </Col>
  );
};

/**
 * @author coder966
 * This is meant to be used internally
 */
class DatePicker extends React.Component {

  constructor(props){
    super(props);

    const currentDayH = parseInt(moment().format('iD'));
    const currentDayG = parseInt(moment().format('D'));

    const currentMonthH = parseInt(moment().format('iM'));
    const currentMonthG = parseInt(moment().format('M'));

    const currentYearH = parseInt(moment().format('iYYYY'));
    const currentYearG = parseInt(moment().format('YYYY'));

    this.state = props.isHijri ? {day: currentDayH, month: currentMonthH, year: currentYearH} : {day: currentDayG, month: currentMonthG, year: currentYearG};

    this.state.minYearH = this.props.isFuture ? currentYearH : currentYearH-100;
    this.state.minYearG = this.props.isFuture ? currentYearG : currentYearG-100;

    this.state.maxYearH = this.props.isPast ? currentYearH : currentYearH+100;
    this.state.maxYearG = this.props.isPast ? currentYearG : currentYearG+100;

    this.state.hour = 0;
    this.state.minute = 0;

    // for performance
    this.daysH = this.range(1, 30);
    this.daysG = this.range(1, 31);
    this.months = this.range(1, 12);
    this.hours = this.range(0, 23);
    this.minutes = this.range(0, 59);
  }

  componentDidUpdate = () => {
    let {day, month, year, hour, minute} = this.state;
    if(this.props.onChange){
      if(day < 10){day = '0'+day}
      if(month < 10){month = '0'+month}

      if(this.props.type === 'date'){
        this.props.onChange(`${day}-${month}-${year}`);
      } else if(this.props.type === 'time'){
        this.props.onChange(`${hour}:${minute}:00.00`);
      }
    }
  }

  range = (s, e) => Array(e-s+1).fill(s).map((x, y) => x + y);

  getDays = () => this.props.isHijri ? this.daysH : this.daysG;
  getMonths = () => this.months;
  getYears = () => this.props.isHijri ? this.range(this.state.minYearH, this.state.maxYearH) : this.range(this.state.minYearG, this.state.maxYearG);
  getHours = () => this.hours;
  getMinutes = () => this.minutes;

  handleField = event => this.setState({[event.target.name]: event.target.value});

  render = () => (
    <>
      {this.props.type === 'date' ? 
        <>
          <select name='day' className='custom-select' value={this.state.day} disabled={this.props.disabled} onChange={this.handleField}>{this.getDays().map(i => <option key={i}>{i}</option>)}</select>
          <select name='month' className='custom-select' value={this.state.month} disabled={this.props.disabled} onChange={this.handleField}>{this.getMonths().map(i => <option key={i}>{i}</option>)}</select>
          <select name='year' className='custom-select' value={this.state.year} disabled={this.props.disabled} onChange={this.handleField}>{this.getYears().map(i => <option key={i}>{i}</option>)}</select>
        </>
      :this.props.type === 'time' ? 
      <>
        <select name='hour' className='custom-select' value={this.state.hour} disabled={this.props.disabled} onChange={this.handleField}>{this.getHours().map(i => <option key={i}>{i}</option>)}</select>
        <select name='minute' className='custom-select' value={this.state.minute} disabled={this.props.disabled} onChange={this.handleField}>{this.getMinutes().map(i => <option key={i}>{i}</option>)}</select>
      </>
      :null
      }
    </>
  );
}

// TODO: fix this issue and remove these two helper methods
const getInitialValueForMultiCheckbox = array => array.length > 0 ? array.map(item => item.id+'') : undefined;

const getSubmitValueForMultiCheckbox = array => {
  if(!array){
    return [];
  }else if(typeof array === 'string'){
    return [array];
  }else{
    return array;
  }
};

export {RruForm, RruFormElement, getInitialValueForMultiCheckbox, getSubmitValueForMultiCheckbox};
