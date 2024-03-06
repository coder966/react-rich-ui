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
import React, { FC, useEffect, useRef, useState } from 'react';
import { useDetectClickOutside } from 'react-detect-click-outside';
import { rangeOfSize } from '../../utils/utils';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Label from '../Label/Label';
import { useField } from '../hooks/useField';
import './style.css';
import RruDateTimeInputCalendarType from './types/RruDateTimeInputCalendarType';
import RruDateTimeInputDateConfig from './types/RruDateTimeInputDateConfig';
import RruDateTimeInputMode from './types/RruDateTimeInputMode';
import RruDateTimeInputProps from './types/RruDateTimeInputProps';
import generateSixWeeksCalendar from './utils/generateSixWeeksCalendar';

const ISO8601_DATE = /([0-9]{4})-([0-9]{2})-([0-9]{2})/;
const ISO8601_DATETIME = /([0-9]{4})-([0-9]{2})-([0-9]{2})(T| {1})([0-9]{2}):([0-9]{2}):([0-9]{2})(.([0-9]+))?/;

const RruDateTimeInput: FC<RruDateTimeInputProps> = (props) => {
  // init
  const [today] = useState<IntlDate>(IntlDate.today());
  const field = useField(props.name);

  const getCalendarType = (): RruDateTimeInputCalendarType => {
    return props.calendarType || 'gregorian';
  };

  // handle popup click outside to dismiss
  const inputRef = useRef<HTMLInputElement>(null);
  const popupRef = useDetectClickOutside({
    onTriggered: (e) => {
      if (e.target != inputRef.current) {
        closePopup();
      }
    },
  });

  const [calendar, setCalendar] = useState<IntlDate[]>(
    generateSixWeeksCalendar(getCalendarType(), today.getYear(getCalendarType()), today.getMonth(getCalendarType()))
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
  };

  const getDateConfig = (date: IntlDate): RruDateTimeInputDateConfig | undefined | null | void => {
    if (props.getDateConfig) {
      return props.getDateConfig(date.toString(getCalendarType()));
    }
  };

  const closePopup = () => {
    setIsPopupShown(false);
    field.onBlur();
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
      closePopup();
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
  };

  /**
   * init
   */
  useEffect(() => {
    field.register((initialValue) => {
      try {
        if (initialValue) {
          let matches: string[] | null = initialValue.match(getMode() === 'datetime' ? ISO8601_DATETIME : ISO8601_DATE);
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
        }
      } catch (e) {}
    });

    return () => field.unregister();
  }, []);

  useEffect(() => {
    setCalendar(generateSixWeeksCalendar(getCalendarType(), year, month));
  }, [year, month]);

  useEffect(() => {
    const value = getValue();
    field.setValue(value);
    if (props.onChange) {
      props.onChange(value);
    }
  }, [intlDate, hour, minute, second]);

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

  if (!calendar) {
    return null;
  }

  return (
    <div className='form-group'>
      <Label label={props.label} requiredAsterisk={props.requiredAsterisk}></Label>

      <div className='rru-date-input'>
        <div className='rru-date-input__input-wrapper'>
          <input
            ref={inputRef}
            dir='ltr'
            type='text'
            disabled={props.disabled}
            value={getValue() || ''}
            onChange={(e) => {}}
            onClick={(e) => setIsPopupShown(true)}
            className={`rru-date-input__input form-control ${field.error ? 'is-invalid' : ''}`}
          />

          {!props.disabled && getValue() !== null && (
            <button onClick={() => setIntlDate(null)} className='rru-date-input__clear-button'>
              ⨯
            </button>
          )}
        </div>

        <div
          ref={popupRef}
          className={`rru-date-input__popup rru-date-input__popup--${isPopupShown ? 'visible' : 'hidden'}`}>
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
                              className={getDayClassName(date)}
                              style={getDateConfig(date)?.style}
                              onClick={(e) => onSelectDate(date)}>
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
