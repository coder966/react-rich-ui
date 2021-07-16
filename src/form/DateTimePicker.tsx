import React from 'react';

// precomputed arrays for performance
const precomputed = {
  daysH: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'],
  daysG28: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28'],
  daysG29: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29'],
  daysG30: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'],
  daysG31: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],
  months: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
  hours24: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
  hours12: ['12 AM', '01 AM', '02 AM', '03 AM', '04 AM', '05 AM', '06 AM', '07 AM', '08 AM', '09 AM', '10 AM', '11 AM', '12 PM', '01 PM', '02 PM', '03 PM', '04 PM', '05 PM', '06 PM', '07 PM', '08 PM', '09 PM', '10 PM', '11 PM'],
  minutes: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59'],
};

export interface DateTimePickerProps {
  type: 'time' | 'date';
  onChange: (value: string) => void;
  disabled?: boolean;
  defaultValue?: string;
  isHijri?: boolean;
  isPast?: boolean;
  isFuture?: boolean;
  maxYearLength?: number;
  reverseDisplayOrder?: boolean;
  clock?: 24 | 12;
}

interface DateTimePickerState {
  hour: number;
  minute: number;
  day: number;
  month: number;
  year: number;
  minYearH: number;
  maxYearH: number;
  minYearG: number;
  maxYearG: number;
}

/**
 * @author coder966
 * TODO: directly implement into appropriate components
 * This is meant to be used internally
 */
class DateTimePicker extends React.Component<DateTimePickerProps, DateTimePickerState> {
  constructor(props: DateTimePickerProps) {
    super(props);

    const todayH = new Intl.DateTimeFormat('en-US-u-ca-islamic', { day: 'numeric', month: 'numeric', year: 'numeric' }).format(Date.now()).replace(' AH', '').split('/');
    const todayG = new Date();

    // TODO: user default value from initial values
    const defaultPartsDate = props.defaultValue ? props.defaultValue.split('-') : undefined;
    const defaultPartsTime = props.defaultValue ? props.defaultValue.split(':') : undefined;

    const currentDayH = parseInt(defaultPartsDate ? defaultPartsDate[2] : todayH[1]);
    const currentDayG = parseInt(defaultPartsDate ? defaultPartsDate[2] : todayG.getDate() + '');

    const currentMonthH = parseInt(defaultPartsDate ? defaultPartsDate[1] : todayH[0]);
    const currentMonthG = parseInt(defaultPartsDate ? defaultPartsDate[1] : todayG.getMonth() + 1 + '');

    const currentYearH = parseInt(defaultPartsDate ? defaultPartsDate[0] : todayH[2]);
    const currentYearG = parseInt(defaultPartsDate ? defaultPartsDate[0] : todayG.getFullYear() + '');

    const maxYearLength = this.props.maxYearLength || 100;

    this.state = {
      ...this.state,

      // time related state
      hour: defaultPartsTime ? parseInt(defaultPartsTime[0]) : 0,
      minute: defaultPartsTime ? parseInt(defaultPartsTime[1]) : 0,

      // date related state
      day: props.isHijri ? currentDayH : currentDayG,
      month: props.isHijri ? currentMonthH : currentMonthG,
      year: props.isHijri ? currentYearH : currentYearG,
      minYearH: this.props.isFuture ? currentYearH : currentYearH - maxYearLength,
      minYearG: this.props.isFuture ? currentYearG : currentYearG - maxYearLength,
      maxYearH: this.props.isPast ? currentYearH : currentYearH + maxYearLength,
      maxYearG: this.props.isPast ? currentYearG : currentYearG + maxYearLength,
    };

    // because controlled fields need to call setValue for the initial value
    this.componentDidUpdate(props, null);
  }

  componentDidUpdate = (prevProps: any, prevState: any) => {
    let { day, month, year, hour, minute } = this.state;
    if (this.props.onChange) {
      if (this.props.type === 'date' && (!prevState || prevState.day !== day || prevState.month !== month || prevState.year !== year)) {
        this.props.onChange(`${year}-${(month < 10 ? '0' : '') + month}-${(day < 10 ? '0' : '') + day}`);
      } else if (this.props.type === 'time' && (!prevState || prevState.minute !== minute || prevState.hour !== hour)) {
        this.props.onChange(`${(hour < 10 ? '0' : '') + hour}:${(minute < 10 ? '0' : '') + minute}`);
      }
    }
  };

  range = (s: number, e: number) =>
    Array(e - s + 1)
      .fill(s)
      .map((x, y) => x + y);

  getDays = () => {
    if (this.props.isHijri) {
      return precomputed.daysH;
    } else {
      const month = this.state.month;
      if (month === 2) {
        const year = this.state.year;
        const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
        return isLeapYear ? precomputed.daysG29 : precomputed.daysG28;
      } else {
        return [1, 3, 5, 7, 8, 10, 12].includes(month) ? precomputed.daysG31 : precomputed.daysG30;
      }
    }
  };

  getMonths = (): string[] => precomputed.months;
  getYears = (): string[] => (this.props.isHijri ? this.range(this.state.minYearH, this.state.maxYearH) : this.range(this.state.minYearG, this.state.maxYearG));
  getHours = (): string[] => (this.props.clock === 24 ? precomputed.hours24 : precomputed.hours12);
  getMinutes = (): string[] => precomputed.minutes;

  handleField = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const name = event.target.name;
    const value = parseInt(event.target.value);
    if (name === 'year') {
      this.setState({ year: value, month: 1, day: 1 });
    } else if (name === 'month') {
      this.setState({ month: value, day: 1 });
    } else {
      this.setState({
        ...this.state,
        [name]: value,
      });
    }
  };

  renderField = (name: keyof DateTimePickerState, valuesGetter: () => string[]) => (
    <select name={name} className='custom-select' value={this.state[name]} disabled={this.props.disabled} onChange={this.handleField}>
      {valuesGetter().map((v, i) => (
        <option key={v} value={name === 'hour' || name === 'minute' ? i : v}>
          {v}
        </option>
      ))}
    </select>
  );

  render = () => (
    <div className='rru-datepicker'>
      {this.props.type === 'date' ? (
        this.props.reverseDisplayOrder ? (
          <>
            {this.renderField('day', this.getDays)}
            {this.renderField('month', this.getMonths)}
            {this.renderField('year', this.getYears)}
          </>
        ) : (
          <>
            {this.renderField('year', this.getYears)}
            {this.renderField('month', this.getMonths)}
            {this.renderField('day', this.getDays)}
          </>
        )
      ) : this.props.type === 'time' ? (
        this.props.reverseDisplayOrder ? (
          <>
            {this.renderField('minute', this.getMinutes)}
            {this.renderField('hour', this.getHours)}
          </>
        ) : (
          <>
            {this.renderField('hour', this.getHours)}
            {this.renderField('minute', this.getMinutes)}
          </>
        )
      ) : null}
    </div>
  );
}

export default DateTimePicker;
