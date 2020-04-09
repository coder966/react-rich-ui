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
    formContext.register({name});
  }

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
            <DatePicker disabled={disabled} onChange={value => formContext.setValue(name, value)} isHijri={isHijri} isFuture={isFuture} isPast={isPast} type={type} defaultValue={props.defaultValue} reverseOrder={props.reverseOrder} />
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

    // TODO: user default value from initial values
    const defaultPartsDate = props.defaultValue ? props.defaultValue.split('-') : undefined;
    const defaultPartsTime = props.defaultValue ? props.defaultValue.split(':') : undefined;

    const currentDayH = parseInt(defaultPartsDate ? defaultPartsDate[0] : moment().format('iD'));
    const currentDayG = parseInt(defaultPartsDate ? defaultPartsDate[0] : moment().format('D'));

    const currentMonthH = parseInt(defaultPartsDate ? defaultPartsDate[1] : moment().format('iM'));
    const currentMonthG = parseInt(defaultPartsDate ? defaultPartsDate[1] : moment().format('M'));

    const currentYearH = parseInt(defaultPartsDate ? defaultPartsDate[2] : moment().format('iYYYY'));
    const currentYearG = parseInt(defaultPartsDate ? defaultPartsDate[2] : moment().format('YYYY'));

    this.state = props.isHijri ? {day: currentDayH, month: currentMonthH, year: currentYearH} : {day: currentDayG, month: currentMonthG, year: currentYearG};

    this.state.minYearH = this.props.isFuture ? currentYearH : currentYearH-100;
    this.state.minYearG = this.props.isFuture ? currentYearG : currentYearG-100;

    this.state.maxYearH = this.props.isPast ? currentYearH : currentYearH+100;
    this.state.maxYearG = this.props.isPast ? currentYearG : currentYearG+100;

    this.state.hour = defaultPartsTime ? parseInt(defaultPartsTime[0]) : 0;
    this.state.minute = defaultPartsTime ? parseInt(defaultPartsTime[1]) : 0;

    // for performance
    this.daysH = this.range(1, 30);
    this.daysG = this.range(1, 31);
    this.months = this.range(1, 12);
    this.hours = this.range(0, 23);
    this.minutes = this.range(0, 59);

    this.componentDidUpdate(props, null);
  }

  componentDidUpdate = (prevProps, prevState) => {
    let {day, month, year, hour, minute} = this.state;
    if(this.props.onChange){
      if(this.props.type === 'date' && (!prevState || prevState.day !== day || prevState.month !== month || prevState.year !== year)){
        if(parseInt(day) < 10){day = '0'+day}
        if(parseInt(month) < 10){month = '0'+month}
        this.props.onChange(`${day}-${month}-${year}`);
      } else if(this.props.type === 'time' && (!prevState || prevState.minute !== minute || prevState.hour !== hour)){
        if(parseInt(hour) < 10){hour = '0'+hour}
        if(parseInt(minute) < 10){minute = '0'+minute}
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

  renderField = (name, valuesGetter) => <select name={name} className='custom-select' value={this.state[name]} disabled={this.props.disabled} onChange={this.handleField}>{valuesGetter().map(i => <option key={i}>{i}</option>)}</select>;

  render = () => (
    <>
      {this.props.type === 'date' ? 
        (this.props.reverseOrder ?
          <>
            {this.renderField('day', this.getDays)}
            {this.renderField('month', this.getMonths)}
            {this.renderField('year', this.getYears)}
          </>
          :
          <>
            {this.renderField('year', this.getYears)}
            {this.renderField('month', this.getMonths)}
            {this.renderField('day', this.getDays)}
          </>
        )
      :this.props.type === 'time' ? 
      (this.props.reverseOrder ?
        <>
          {this.renderField('minute', this.getMinutes)}
          {this.renderField('hour', this.getHours)}
        </>
        :
        <>
          {this.renderField('hour', this.getHours)}
          {this.renderField('minute', this.getMinutes)}
        </>
      )
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
