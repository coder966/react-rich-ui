import React from 'react';
import useForm, {FormContext, useFormContext} from 'react-hook-form';
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
 * acceptable types: text (default), password, textarea, select, radio, checkbox, multi-checkbox, grouped-multi-checkbox, date, time, file
 */
const RruFormElement = props => {
  const {
    name, type, label, options, lang, disabled, prepend, append, stretch, 
  } = props;

  const formContext = useFormContext();

  const sharedProps = {
    ref: formContext.register,
    id: name,
    name: name,
    disabled: disabled,
    placeholder: props.placeholder,
    maxlength: props.maxlength,
  }

  // for date only
  if(type === 'date' || type === 'time' || type === 'datetime'){
    formContext.register({name});
  }

  return (
    <div className={(props.className ? props.className : 'form-group')  + ((stretch || type === 'multi-checkbox' || type === 'grouped-multi-checkbox')? ' col-xl-12' : ' col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4')}>
      {label ?
        <div className={(props.labelClassName ? props.labelClassName : 'mr-1 ml-1') + ' row'}>
          <label className='custom-label' htmlFor={name}>{label}</label>
        </div>
      : null}
      <div className={(props.inputClassName ? props.inputClassName : label ? 'mr-1 ml-1' : '') + ' row'}>
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
          <div className={props.inline ? 'form-check-inline' : null}>
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
            {props.longLabel && <label htmlFor={name}>{props.longLabel}</label>}
          </div>


          : type === 'multi-checkbox' ?
          options.map(o => (
            <div key={o.id} className='col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3'>
              <div className='custom-control custom-checkbox m-1'>
                <input id={o.id} name={name} ref={formContext.register} value={o.id} type='checkbox' className='custom-control-input' disabled={disabled} />
                <label htmlFor={o.id} className='custom-control-label'>{o.label[lang]}</label>
              </div>
            </div>
          ))


          : type === 'grouped-multi-checkbox' ?
          options.map(g => 
            <>
              <div className='grouped-multi-checkbox-group-header'>{g.label[lang]}</div>
              <div className='grouped-multi-checkbox-group-row row col'>
                {g.items.map(o => (
                  <div key={o.id} className='col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3'>
                    <div className='custom-control custom-checkbox m-1'>
                      <input id={o.id} name={name} ref={formContext.register} value={o.id} type='checkbox' className='custom-control-input' disabled={disabled} />
                      <label htmlFor={o.id} className='custom-control-label'>{o.label[lang]}</label>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )


          : type === 'date' || type === 'time' ?
          <div className='input-group'>
            <div className='input-group-prepend'>
              <span className={'input-group-text '+(type === 'date' ? 'fa fa-calendar-alt' : 'fas fa-clock')}></span>
            </div>
            <DatePicker
              type={type}
              onChange={value => formContext.setValue(name, value)}
              defaultValue={props.defaultValue}
              reverseOrder={props.reverseOrder}
              isHijri={props.isHijri}
              isFuture={props.isFuture}
              isPast={props.isPast}
              clock={props.clock}
              disabled={disabled} />
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
      </div>
    </div>
  );
};

/**
 * @author coder966
 * This is meant to be used internally
 */
class DatePicker extends React.Component {

  constructor(props){
    super(props);

    const todayH = new Intl.DateTimeFormat('en-US-u-ca-islamic', {day: 'numeric', month: 'numeric',year : 'numeric'}).format(Date.now()).replace(' AH', '').split('/');
    const todayG = new Date();

    // TODO: user default value from initial values
    const defaultPartsDate = props.defaultValue ? props.defaultValue.split('-') : undefined;
    const defaultPartsTime = props.defaultValue ? props.defaultValue.split(':') : undefined;

    const currentDayH = parseInt(defaultPartsDate ? defaultPartsDate[0] : todayH[1]);
    const currentDayG = parseInt(defaultPartsDate ? defaultPartsDate[0] : todayG.getDate());

    const currentMonthH = parseInt(defaultPartsDate ? defaultPartsDate[1] : todayH[0]);
    const currentMonthG = parseInt(defaultPartsDate ? defaultPartsDate[1] : todayG.getMonth()+1);

    const currentYearH = parseInt(defaultPartsDate ? defaultPartsDate[2] : todayH[2]);
    const currentYearG = parseInt(defaultPartsDate ? defaultPartsDate[2] : todayG.getFullYear());

    this.state = props.isHijri ? {day: currentDayH, month: currentMonthH, year: currentYearH} : {day: currentDayG, month: currentMonthG, year: currentYearG};

    this.state.minYearH = this.props.isFuture ? currentYearH : currentYearH-100;
    this.state.minYearG = this.props.isFuture ? currentYearG : currentYearG-100;

    this.state.maxYearH = this.props.isPast ? currentYearH : currentYearH+100;
    this.state.maxYearG = this.props.isPast ? currentYearG : currentYearG+100;

    this.state.hour = defaultPartsTime ? parseInt(defaultPartsTime[0]) : 0;
    this.state.minute = defaultPartsTime ? parseInt(defaultPartsTime[1]) : 0;

    // for performance
    this.daysH = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30'];
    this.daysG28 = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28'];
    this.daysG29 = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29'];
    this.daysG30 = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30'];
    this.daysG31 = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31'];
    this.months = ['1','2','3','4','5','6','7','8','9','10','11','12'];
    this.hours24 = ['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23'];
    this.hours12 = ['12 AM','01 AM','02 AM','03 AM','04 AM','05 AM','06 AM','07 AM','08 AM','09 AM','10 AM','11 AM','12 PM','01 PM','02 PM','03 PM','04 PM','05 PM','06 PM','07 PM','08 PM','09 PM','10 PM','11 PM'];
    this.minutes = ['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40','41','42','43','44','45','46','47','48','49','50','51','52','53','54','55','56','57','58','59'];

    this.componentDidUpdate(props, null);
  }

  componentDidUpdate = (prevProps, prevState) => {
    let {day, month, year, hour, minute} = this.state;
    day = parseInt(day);
    month = parseInt(month);
    year = parseInt(year);
    hour = parseInt(hour);
    minute = parseInt(minute);
    if(this.props.onChange){
      if(this.props.type === 'date' && (!prevState || prevState.day !== day || prevState.month !== month || prevState.year !== year)){
        if(day < 10){day = '0'+day}
        if(month < 10){month = '0'+month}
        this.props.onChange(`${day}-${month}-${year}`);
      } else if(this.props.type === 'time' && (!prevState || prevState.minute !== minute || prevState.hour !== hour)){
        if(hour < 10){hour = '0'+hour}
        if(minute < 10){minute = '0'+minute}
        this.props.onChange(`${hour}:${minute}:00.00`);
      }
    }
  }

  range = (s, e) => Array(e-s+1).fill(s).map((x, y) => x + y);

  getDays = () => {
    if(this.props.isHijri){
      return this.daysH;
    }else{
      const month = parseInt(this.state.month);
      if(month === 2){
        const year = parseInt(this.state.year);
        const isLeapYear = ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
        return isLeapYear ? this.daysG29 : this.daysG28;
      }else{
        return [1,3,5,7,8,10,12].includes(month) ? this.daysG31 : this.daysG30;
      }
    }
  };

  getMonths = () => this.months;
  getYears = () => this.props.isHijri ? this.range(this.state.minYearH, this.state.maxYearH) : this.range(this.state.minYearG, this.state.maxYearG);
  getHours = () => this.props.clock === 24 ? this.hours24 : this.hours12;
  getMinutes = () => this.minutes;

  handleField = event => {
    const name = event.target.name;
    if(name === 'year'){
      this.setState({year: event.target.value, month: '1', day: '1'});
    }else if(name === 'month'){
      this.setState({month: event.target.value, day: '1'});
    }else{
      this.setState({[name]: event.target.value});
    }
  };

  renderField = (name, valuesGetter) => <select name={name} className='custom-select' value={this.state[name]} disabled={this.props.disabled} onChange={this.handleField}>{valuesGetter().map((v, i) => <option key={v} value={name === 'hour' ? i : v}>{v}</option>)}</select>;

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
