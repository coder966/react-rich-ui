import { IntlDate } from 'intl-date';
import CalendarType from 'intl-date/dist/types/CalendarType';
import React, { FC, useEffect, useRef, useState } from 'react';
import { useDetectClickOutside } from 'react-detect-click-outside';
import { useFormContext } from 'react-hook-form';
import { range, rangeOfSize } from '../../utils/utils';
import ErrorMessage from '../common/ErrorMessage';
import Label from '../common/Label';
import './style.css';
import RruDateTimeInputMode from './types/RruDateTimeInputMode';
import RruDateTimeInputProps from './types/RruDateTimeInputProps';
import generateSixWeeksCalendar from './utils/generateSixWeeksCalendar';

const ISO8261_DATE = /([0-9]{4})-([0-9]{2})-([0-9]{2})/;
const ISO8261_DATETIME = /([0-9]{4})-([0-9]{2})-([0-9]{2})(T| {1})([0-9]{2}):([0-9]{2}):([0-9]{2})(.([0-9]+))?/;

/**
 * @author coder966
 */
const RruDateTimeInput: FC<RruDateTimeInputProps> = (props) => {
  const formContext = useFormContext();

  // handle popup click outside to dismiss
  const inputRef = useRef<HTMLInputElement>(null);
  const popupRef = useDetectClickOutside({
    onTriggered: (e) => {
      if (e.target != inputRef.current) {
        setIsPopupShown(false);
      }
    }
  });

  const [calendar, setCalendar] = useState<IntlDate[]>();
  const [isPopupShown, setIsPopupShown] = useState<boolean>(false);
  const [todayIntlDate] = useState<IntlDate>(IntlDate.today());

  const [hour, setHour] = useState<number>(0);
  const [minute, setMinute] = useState<number>(0);
  const [second, setSecond] = useState<number>(0);

  const [year, setYear] = useState<number>(0);
  const [month, setMonth] = useState<number>(0);
  const [intlDate, setIntlDate] = useState<IntlDate>();


  const getMode = (): RruDateTimeInputMode => {
    return props.mode ? props.mode : 'datetime';
  }

  const getCalendarType = (): CalendarType => {
    return props.isHijri ? 'islamic-umalqura' : 'gregorian';
  }

  const getMinLimit = () => {
    return props.isHijri ? 1300 : 1800;
  }

  const getMaxLimit = () => {
    return props.isHijri ? 1500 : 2200;
  }

  const getValidMinYear = () => {
    if (props.minYear && props.minYear > getMinLimit() && props.minYear < getMaxLimit()) {
      return props.minYear;
    } else {
      return getMinLimit();
    }
  }

  const getValidMaxYear = () => {
    if (
      props.maxYear &&
      props.maxYear > getMinLimit() &&
      props.maxYear < getMaxLimit() &&
      props.maxYear > getValidMinYear()
    ) {
      return props.maxYear;
    } else {
      return getMaxLimit();
    }
  }

  const isDateDisabled = (date: IntlDate): boolean => {
    if (props.filterDates) {
      return !props.filterDates(date.toString(getCalendarType()));
    } else {
      return false;
    }
  }

  const previousMonth = () => {
    if (month === 1) {
      setYear(year - 1);
      setMonth(12);
    } else {
      setMonth(month - 1);
    }
  }

  const nextMonth = () => {
    if (month === 12) {
      setYear(year + 1);
      setMonth(1);
    } else {
      setMonth(month + 1);
    }
  }

  const onSelectDate = (date: IntlDate) => {
    if (isDateDisabled(date)) {
      return;
    } else {
      setIntlDate(date);
      setIsPopupShown(false);
    }
  }

  const selectAllTextInInput = (e: React.MouseEvent) => {
    const input = e.target as HTMLInputElement;
    input.select();
  }

  const onChangeTimePart = (val: string, max: number, changeStateFunction: (val: number) => void) => {
    let value = parseInt(val);
    if (isNaN(value) || value < 0) {
      value = 0;
    }
    if (value > max) {
      value = max;
    }
    changeStateFunction(value);
  }

  const getValue = (): string | null => {
    if (intlDate) {
      let value = intlDate.format(getCalendarType(), 'yyyy-MM-dd');
      if (getMode() === 'datetime') {
        const h = hour.toString().padStart(2, '0');
        const m = minute.toString().padStart(2, '0');
        const s = second.toString().padStart(2, '0');
        value += ` ${h}:${m}:${s}`;
      }
      return value;
    } else {
      return null;
    }
  }

  /**
   * init
   */
  useEffect(() => {
    let date: IntlDate;
    let h: number;
    let m: number;
    let s: number;

    try {
      // read the initial value
      formContext.register({ name: props.name });
      const initialValue: string = formContext.getValues()[props.name];

      // parse
      let matches: string[] | null = initialValue.match(getMode() === 'datetime' ? ISO8261_DATETIME : ISO8261_DATE);

      // determine the default value
      if (matches) {
        date = IntlDate.of(getCalendarType(), parseInt(matches[1]), parseInt(matches[2]), parseInt(matches[3]));
        h = parseInt(matches[5]);
        m = parseInt(matches[6]);
        s = parseInt(matches[7]);
      } else {
        date = IntlDate.today();
        h = 0;
        m = 0;
        s = 0;
      }
    } catch (e) {
      date = IntlDate.today();
      h = 0;
      m = 0;
      s = 0;
    }

    // set state to the default value
    setYear(date.getYear(getCalendarType()));
    setMonth(date.getMonth(getCalendarType()));
    setIntlDate(date);
    onChangeTimePart(h.toString(), 23, setHour);
    onChangeTimePart(m.toString(), 59, setMinute);
    onChangeTimePart(s.toString(), 59, setSecond);
  }, []);

  useEffect(() => {
    if (year === 0 || month === 0) {
      return;
    } else {
      setCalendar(generateSixWeeksCalendar(getCalendarType(), year, month));
    }
  }, [year, month]);

  useEffect(() => {
    formContext.setValue(props.name, getValue());
  }, [intlDate, hour, minute, second]);

  const getDayClassName = (targetDate: IntlDate): string => {
    let className = 'rru-date-input__day';
    if (targetDate.getMonth(getCalendarType()) != month) {
      className += ' rru-date-input__day--not-same-month';
    }
    if (targetDate.toString(getCalendarType()) === todayIntlDate.toString(getCalendarType())) {
      className += ' rru-date-input__day--today';
    }
    if (targetDate.toString(getCalendarType()) === intlDate?.toString(getCalendarType())) {
      className += ' rru-date-input__day--selected';
    }
    if (isDateDisabled(targetDate)) {
      className += ' rru-date-input__day--disabled';
    }
    return className;
  }

  if (!calendar) {
    return null;
  }

  return (
    <div className='form-group'>
      <Label inputName={props.name} label={props.label} requiredAsterisk={props.requiredAsterisk} />

      <div className='rru-date-input'>
        <input
          ref={inputRef}
          type='text'
          disabled={props.disabled}
          value={getValue() || ''}
          onChange={(e) => { }}
          onClick={(e) => setIsPopupShown(true)}
          className={`form-control ${formContext.errors[props.name] ? 'is-invalid' : ''}`}
        />

        <div
          ref={popupRef}
          className={`rru-date-input__popup ${isPopupShown ? 'rru-date-input__popup--shown' : 'rru-date-input__popup--hidden'
            }`}
        >
          <div className='rru-date-input__container'>

            <div className='rru-date-input__header'>
              <div className='rru-date-input__month-button' onClick={previousMonth}>
                {'<'}
              </div>
              <select value={year} onChange={(e) => setYear(parseInt(e.target.value))}>
                {range(getValidMinYear(), getValidMaxYear()).map((y) => (
                  <option key={`y${y}`}>{y}</option>
                ))}
              </select>
              <select value={month} onChange={(e) => setMonth(parseInt(e.target.value))}>
                {range(1, 12).map((m) => (
                  <option key={`m${m}`}>{m}</option>
                ))}
              </select>
              <div className='rru-date-input__month-button' onClick={nextMonth}>
                {'>'}
              </div>
            </div>

            <div className='rru-date-input__body'>
              <table>
                <tbody>
                  {rangeOfSize(6).map((i) => (
                    <tr key={`r${i}`}>
                      {rangeOfSize(7).map((j) => {
                        const index = i * 7 + j;
                        const date = calendar[index];
                        return (
                          <td key={`d${date.toString(getCalendarType())}`}>
                            <div className={getDayClassName(date)} onClick={(e) => onSelectDate(date)}>
                              {date.getDay(getCalendarType())}
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {getMode() === 'datetime' &&
              <div className='rru-date-input__footer'>
                <input
                  type='text'
                  className='rru-date-input__time-input'
                  onClick={selectAllTextInInput}
                  value={hour.toString().padStart(2, '0')}
                  onChange={e => onChangeTimePart(e.target.value, 23, setHour)} />
                {' : '}
                <input
                  type='text'
                  className='rru-date-input__time-input'
                  onClick={selectAllTextInInput}
                  value={minute.toString().padStart(2, '0')}
                  onChange={e => onChangeTimePart(e.target.value, 59, setMinute)} />
                {' : '}
                <input
                  type='text'
                  className='rru-date-input__time-input'
                  onClick={selectAllTextInInput}
                  value={second.toString().padStart(2, '0')}
                  onChange={e => onChangeTimePart(e.target.value, 59, setSecond)} />
              </div>
            }

          </div>
        </div>
      </div>
      <ErrorMessage inputName={props.name} />
    </div>
  );
}

export default RruDateTimeInput;
