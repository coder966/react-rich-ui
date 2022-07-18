import { IntlDate } from 'intl-date';
import React, { FC, useEffect, useRef, useState } from 'react';
import { useDetectClickOutside } from 'react-detect-click-outside';
import { useFormContext } from 'react-hook-form';
import { rangeOfSize } from '../../utils/utils';
import ErrorMessage from '../common/ErrorMessage';
import Label from '../common/Label';
import './style.css';
import RruDateTimeInputCalendarType from './types/RruDateTimeInputCalendarType';
import RruDateTimeInputMode from './types/RruDateTimeInputMode';
import RruDateTimeInputProps from './types/RruDateTimeInputProps';
import generateSixWeeksCalendar from './utils/generateSixWeeksCalendar';

const ISO8601_DATE = /([0-9]{4})-([0-9]{2})-([0-9]{2})/;
const ISO8601_DATETIME = /([0-9]{4})-([0-9]{2})-([0-9]{2})(T| {1})([0-9]{2}):([0-9]{2}):([0-9]{2})(.([0-9]+))?/;

/**
 * @author coder966
 */
const RruDateTimeInput: FC<RruDateTimeInputProps> = (props) => {
  // init
  const [today] = useState<IntlDate>(IntlDate.today());
  const formContext = useFormContext();

  const getCalendarType = (): RruDateTimeInputCalendarType => {
    return props.calendarType || 'gregorian';
  }

  // handle popup click outside to dismiss
  const inputRef = useRef<HTMLInputElement>(null);
  const popupRef = useDetectClickOutside({
    onTriggered: (e) => {
      if (e.target != inputRef.current) {
        setIsPopupShown(false);
      }
    }
  });

  const [calendar, setCalendar] = useState<IntlDate[]>(
    generateSixWeeksCalendar(
      getCalendarType(),
      today.getYear(getCalendarType()),
      today.getMonth(getCalendarType())
    )
  );
  const [isPopupShown, setIsPopupShown] = useState<boolean>(false);

  const [hour, setHour] = useState<number>(0);
  const [minute, setMinute] = useState<number>(0);
  const [second, setSecond] = useState<number>(0);

  const [year, setYear] = useState<number>(today.getYear(getCalendarType()));
  const [month, setMonth] = useState<number>(today.getMonth(getCalendarType()));
  const [intlDate, setIntlDate] = useState<IntlDate | null>();


  const getMode = (): RruDateTimeInputMode => {
    return props.mode ? props.mode : 'datetime';
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

  const onIntegerInputChange = (val: string, min: number, max: number, changeStateFunction: (val: number) => void) => {
    let value = parseInt(val);
    if (isNaN(value) || value < 0) {
      value = 0;
    }
    if (value > max) {
      value = max;
    }
    changeStateFunction(value);
  }

  const onIntegerInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, inputPartType: 'date' | 'time') => {
    const isEnter = e.key === 'Enter';
    const shouldHidePopup = inputPartType === 'time' && intlDate;
    if (isEnter && !shouldHidePopup) {
      e.stopPropagation();
      e.preventDefault();
    }
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
    formContext.register({ name: props.name });
    try {
      const initialValue: string = formContext.getValues()[props.name];
      if (initialValue) {
        let matches: string[] | null = initialValue.match(getMode() === 'datetime' ? ISO8601_DATETIME : ISO8601_DATE);
        if (matches) {
          const date = IntlDate.of(getCalendarType(), parseInt(matches[1]), parseInt(matches[2]), parseInt(matches[3]));
          setYear(date.getYear(getCalendarType()));
          setMonth(date.getMonth(getCalendarType()));
          setIntlDate(date);
          onIntegerInputChange(matches[5], 0, 23, setHour);
          onIntegerInputChange(matches[6], 0, 59, setMinute);
          onIntegerInputChange(matches[7], 0, 59, setSecond);
        }
      }
    } catch (e) { }
  }, []);

  useEffect(() => {
    setCalendar(generateSixWeeksCalendar(getCalendarType(), year, month));
  }, [year, month]);

  useEffect(() => {
    formContext.setValue(props.name, getValue());
  }, [intlDate, hour, minute, second]);

  const getDayClassName = (targetDate: IntlDate): string => {
    let className = 'rru-date-input__day';
    if (targetDate.getMonth(getCalendarType()) != month) {
      className += ' rru-date-input__day--not-same-month';
    }
    if (targetDate.isEqual(today)) {
      className += ' rru-date-input__day--today';
    }
    if (intlDate && targetDate.isEqual(intlDate)) {
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
              <div className='rru-date-input__month-button' onClick={previousMonth}>{'<'}</div>
              <input
                type='text'
                className='rru-date-input__date-part-input'
                onClick={selectAllTextInInput}
                onKeyDown={(e) => onIntegerInputKeyDown(e, 'date')}
                value={year}
                onChange={e => onIntegerInputChange(e.target.value, 1300, 2300, setYear)} />
              <input
                type='text'
                className='rru-date-input__date-part-input'
                onClick={selectAllTextInInput}
                onKeyDown={(e) => onIntegerInputKeyDown(e, 'date')}
                value={month}
                onChange={e => onIntegerInputChange(e.target.value, 1, 12, setMonth)} />
              <div className='rru-date-input__month-button' onClick={nextMonth}>{'>'}</div>
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
                  className='rru-date-input__time-part-input'
                  onClick={selectAllTextInInput}
                  onKeyDown={(e) => onIntegerInputKeyDown(e, 'time')}
                  value={hour.toString().padStart(2, '0')}
                  onChange={e => onIntegerInputChange(e.target.value, 0, 23, setHour)} />
                {' : '}
                <input
                  type='text'
                  className='rru-date-input__time-part-input'
                  onClick={selectAllTextInInput}
                  onKeyDown={(e) => onIntegerInputKeyDown(e, 'time')}
                  value={minute.toString().padStart(2, '0')}
                  onChange={e => onIntegerInputChange(e.target.value, 0, 59, setMinute)} />
                {' : '}
                <input
                  type='text'
                  className='rru-date-input__time-part-input'
                  onClick={selectAllTextInInput}
                  onKeyDown={(e) => onIntegerInputKeyDown(e, 'time')}
                  value={second.toString().padStart(2, '0')}
                  onChange={e => onIntegerInputChange(e.target.value, 0, 59, setSecond)} />
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
