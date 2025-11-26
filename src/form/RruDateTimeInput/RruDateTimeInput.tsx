/*
 * Copyright 2020 Khalid H. Alharisi
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { IntlDate } from 'intl-date';
import { FC, useEffect, useRef, useState } from 'react';
import { deepEqual, rangeOfSize } from '../../utils/utils';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Label from '../Label/Label';
import { useField } from '../hooks/useField';
import './style.css';
import RruDateTimeInputCalendarType from './types/RruDateTimeInputCalendarType';
import RruDateTimeInputDateConfig from './types/RruDateTimeInputDateConfig';
import RruDateTimeInputMode from './types/RruDateTimeInputMode';
import RruDateTimeInputProps from './types/RruDateTimeInputProps';
import generateSixWeeksCalendar from './utils/generateSixWeeksCalendar';
import useClickOutside from '../../utils/useClickOutside.ts';

const ISO8601_DATE = /([0-9]{4})-([0-9]{2})-([0-9]{2})/;
const ISO8601_DATETIME = /([0-9]{4})-([0-9]{2})-([0-9]{2})(T| {1})([0-9]{2}):([0-9]{2}):([0-9]{2})(.([0-9]+))?/;

const RruDateTimeInput: FC<RruDateTimeInputProps> = (props) => {
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [value, setValue] = useState<string | null>(null);

  const field = useField(props.name, (serializedValue) => {
    if (!deepEqual(serializedValue, value)) {
      setValue(serializedValue);
    }
  });

  const getCalendarType = (): RruDateTimeInputCalendarType => {
    return props.calendarType || 'gregorian';
  };

  const today = IntlDate.today();
  const [calendar, setCalendar] = useState<IntlDate[]>(
    generateSixWeeksCalendar(getCalendarType(), today.getYear(getCalendarType()), today.getMonth(getCalendarType()))
  );
  const [isPopupShown, setIsPopupShown] = useState<boolean>(false);

  const [hour, setHour] = useState<number>(0);
  const [minute, setMinute] = useState<number>(0);
  const [second, setSecond] = useState<number>(0);

  const [year, setYear] = useState<number>(today.getYear(getCalendarType()));
  const [month, setMonth] = useState<number>(today.getMonth(getCalendarType()));
  const [intlDate, setIntlDate] = useState<IntlDate | null>(null);

  const getMode = (): RruDateTimeInputMode => {
    return props.mode ? props.mode : 'datetime';
  };

  const getDateConfig = (date: IntlDate): RruDateTimeInputDateConfig | undefined | null | void => {
    if (props.getDateConfig) {
      return props.getDateConfig(date.toString(getCalendarType()));
    }
  };

  const previousMonth = () => {
    if (month === 1) {
      setYear(year - 1);
      setMonth(12);
    } else {
      setMonth(month - 1);
    }
  };

  const nextMonth = () => {
    if (month === 12) {
      setYear(year + 1);
      setMonth(1);
    } else {
      setMonth(month + 1);
    }
  };

  const onSelectDate = (date: IntlDate) => {
    if (getDateConfig(date)?.disabled) {
      return;
    } else {
      setIntlDate(date);
      setIsPopupShown(false);
      field.onBlur();
    }
  };

  const selectAllTextInInput = (e: React.MouseEvent) => {
    const input = e.target as HTMLInputElement;
    input.select();
  };

  const onIntegerInputChange = (val: string, min: number, max: number, changeStateFunction: (val: number) => void) => {
    let value: number | null = parseInt(val);
    if (isNaN(value)) {
      value = null;
    } else if (value < min) {
      value = min;
    } else if (value > max) {
      value = max;
    }
    if (value) {
      changeStateFunction(value);
    }
  };

  const onIntegerInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, inputPartType: 'date' | 'time') => {
    const isEnter = e.key === 'Enter';
    const shouldHidePopup = inputPartType === 'time' && intlDate;
    if (isEnter && !shouldHidePopup) {
      e.stopPropagation();
      e.preventDefault();
    }
  };

  const onYearBlur = () => {
    const MIN_YEAR = getCalendarType() === 'gregorian' ? 1901 : 1318;
    if (year < MIN_YEAR) {
      setYear(MIN_YEAR);
    }
  };

  /**
   * init
   */
  useEffect(() => {
    field.register((initialValue) => {
      try {
        if (initialValue) {
          const matches: string[] | null = initialValue.match(getMode() === 'datetime' ? ISO8601_DATETIME : ISO8601_DATE);
          if (matches) {
            const date = IntlDate.of(
              getCalendarType(),
              parseInt(matches[1]),
              parseInt(matches[2]),
              parseInt(matches[3])
            );
            setYear(date.getYear(getCalendarType()));
            setMonth(date.getMonth(getCalendarType()));
            setIntlDate(date);
            onIntegerInputChange(matches[5], 0, 23, setHour);
            onIntegerInputChange(matches[6], 0, 59, setMinute);
            onIntegerInputChange(matches[7], 0, 59, setSecond);
          }
        } else {
          setYear(today.getYear(getCalendarType()));
          setMonth(today.getMonth(getCalendarType()));
        }
      } catch (e) {
        console.error('Error while init RruDateTimeInput. Ignoring...', e);
      }
      setIsInitialized(true);
    });

    return () => field.unregister();
  }, [props.calendarType]);

  useEffect(() => {
    setCalendar(generateSixWeeksCalendar(getCalendarType(), year, month));
  }, [year, month]);

  useEffect(() => {
    let newValue: string | null = null;
    if (intlDate) {
      newValue = intlDate.format(getCalendarType(), 'yyyy-MM-dd');
      if (getMode() === 'datetime') {
        const h = hour.toString().padStart(2, '0');
        const m = minute.toString().padStart(2, '0');
        const s = second.toString().padStart(2, '0');
        newValue += ` ${h}:${m}:${s}`;
      }
    }

    setValue(newValue);
    field.setValue(newValue);

    if (props.onChange && isInitialized && !isPopupShown) {
      props.onChange(newValue);
    }
  }, [intlDate, hour, minute, second, isPopupShown]);

  const getDayClassName = (targetDate: IntlDate): string => {
    const dateConfig = getDateConfig(targetDate);
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
    if (dateConfig?.disabled) {
      className += ' rru-date-input__day--disabled';
    }
    if (dateConfig?.className) {
      className += ' ' + dateConfig.className;
    }
    return className;
  };

  // handle popup click outside to dismiss
  const inputContainerRef = useRef<HTMLDivElement>(null);
  const popupContainerRef = useRef<HTMLDivElement>(null);
  useClickOutside([inputContainerRef, popupContainerRef], () => {
    setIsPopupShown(false);
  });

  if (!calendar) {
    return null;
  }

  return (
    <div className='form-group' data-field-name={props.name} data-field-value={value} data-field-error={field.error ? field.error.message : ''}>
      <Label label={props.label} requiredAsterisk={props.requiredAsterisk}></Label>

      <div className='rru-date-input' ref={inputContainerRef}>
        <div className='rru-date-input__input-wrapper'>
          <input
            dir='ltr'
            type='text'
            autoComplete='off'
            name={props.name}
            disabled={props.disabled}
            value={value || ''}
            onChange={() => {}}
            onClick={() => setIsPopupShown(true)}
            className={`rru-date-input__input form-control ${field.error ? 'is-invalid' : ''}`}
          />

          {!props.disabled && value !== null && (
            <button type='button' onClick={() => setIntlDate(null)} className='rru-date-input__clear-button'>
              ⨯
            </button>
          )}
        </div>

        <div
          className={`rru-date-input__popup rru-date-input__popup--${isPopupShown ? 'visible' : 'hidden'}`} ref={popupContainerRef}>
          <div className='rru-date-input__container'>
            <div className='rru-date-input__header'>
              <div className='rru-date-input__month-button' onClick={previousMonth}>
                {'<'}
              </div>
              <input
                type='text'
                className='rru-date-input__date-part-input'
                onClick={selectAllTextInInput}
                onKeyDown={(e) => onIntegerInputKeyDown(e, 'date')}
                value={year}
                onChange={(e) => onIntegerInputChange(e.target.value, 1, 2300, setYear)}
                onBlur={onYearBlur}
              />
              <input
                type='text'
                className='rru-date-input__date-part-input'
                onClick={selectAllTextInInput}
                onKeyDown={(e) => onIntegerInputKeyDown(e, 'date')}
                value={month}
                onChange={(e) => onIntegerInputChange(e.target.value, 1, 12, setMonth)}
              />
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
                            <div
                              data-date={date.toString(getCalendarType())}
                              className={getDayClassName(date)}
                              style={getDateConfig(date)?.style}
                              onClick={() => onSelectDate(date)}>
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

            {getMode() === 'datetime' && (
              <div className='rru-date-input__footer'>
                <input
                  type='text'
                  className='rru-date-input__time-part-input'
                  onClick={selectAllTextInInput}
                  onKeyDown={(e) => onIntegerInputKeyDown(e, 'time')}
                  value={hour.toString().padStart(2, '0')}
                  onChange={(e) => onIntegerInputChange(e.target.value, 0, 23, setHour)}
                />
                {' : '}
                <input
                  type='text'
                  className='rru-date-input__time-part-input'
                  onClick={selectAllTextInInput}
                  onKeyDown={(e) => onIntegerInputKeyDown(e, 'time')}
                  value={minute.toString().padStart(2, '0')}
                  onChange={(e) => onIntegerInputChange(e.target.value, 0, 59, setMinute)}
                />
                {' : '}
                <input
                  type='text'
                  className='rru-date-input__time-part-input'
                  onClick={selectAllTextInInput}
                  onKeyDown={(e) => onIntegerInputKeyDown(e, 'time')}
                  value={second.toString().padStart(2, '0')}
                  onChange={(e) => onIntegerInputChange(e.target.value, 0, 59, setSecond)}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <ErrorMessage error={field.error} />
    </div>
  );
};

export default RruDateTimeInput;
