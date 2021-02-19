import React from 'react';
import './style.css';

/**
 * @author coder966
 * TODO: directly implement into appropriate components
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

    const currentDayH = parseInt(defaultPartsDate ? defaultPartsDate[2] : todayH[1]);
    const currentDayG = parseInt(defaultPartsDate ? defaultPartsDate[2] : todayG.getDate());

    const currentMonthH = parseInt(defaultPartsDate ? defaultPartsDate[1] : todayH[0]);
    const currentMonthG = parseInt(defaultPartsDate ? defaultPartsDate[1] : todayG.getMonth()+1);

    const currentYearH = parseInt(defaultPartsDate ? defaultPartsDate[0] : todayH[2]);
    const currentYearG = parseInt(defaultPartsDate ? defaultPartsDate[0] : todayG.getFullYear());

    this.state = props.isHijri ? {day: currentDayH, month: currentMonthH, year: currentYearH} : {day: currentDayG, month: currentMonthG, year: currentYearG};

    const maxYearLength = this.props.maxYearLength || 100;

    this.state.minYearH = this.props.isFuture ? currentYearH : currentYearH-maxYearLength;
    this.state.minYearG = this.props.isFuture ? currentYearG : currentYearG-maxYearLength;

    this.state.maxYearH = this.props.isPast ? currentYearH : currentYearH+maxYearLength;
    this.state.maxYearG = this.props.isPast ? currentYearG : currentYearG+maxYearLength;

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

      // because controlled fields need to call setValue for the initial value
    this.componentDidUpdate(props, null);
  }

  componentDidUpdate = (prevProps, prevState) => {
    let {day, month, year, hour, minute} = this.state;
    if(this.props.onChange){
      if(this.props.type === 'date' && (!prevState || prevState.day !== day || prevState.month !== month || prevState.year !== year)){
        day = parseInt(day);
        month = parseInt(month);
        year = parseInt(year);    
        if(day < 10){day = '0'+day}
        if(month < 10){month = '0'+month}
        this.props.onChange(`${year}-${month}-${day}`);
      } else if(this.props.type === 'time' && (!prevState || prevState.minute !== minute || prevState.hour !== hour)){
        hour = parseInt(hour);
        minute = parseInt(minute);
        if(hour < 10){hour = '0'+hour}
        if(minute < 10){minute = '0'+minute}
        this.props.onChange(`${hour}:${minute}`);
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
        const isLeapYear = ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0);
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

  renderField = (name, valuesGetter) => <select name={name} className='custom-select' value={this.state[name]} disabled={this.props.disabled} onChange={this.handleField}>{valuesGetter().map((v, i) => <option key={v} value={name === 'hour' || name === 'minute' ? i : v}>{v}</option>)}</select>;

  render = () => (
    <div className='rru-datepicker'>
      {this.props.type === 'date' ? 
        (this.props.reverseDisplayOrder ?
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
      (this.props.reverseDisplayOrder ?
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
    </div>
  );
}

export default DatePicker;
