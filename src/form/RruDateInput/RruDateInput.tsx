import { IntlDate } from 'intl-date';
import CalendarType from 'intl-date/dist/types/CalendarType';
import React, { FC, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { range, rangeOfSize } from '../../utils/utils';
import ErrorMessage from '../common/ErrorMessage';
import Label from '../common/Label';
import './style.css';

export interface RruDateInputProps {
  /**  */
  name: string;

  /**  */
  label?: React.ReactNode;

  /**  */
  disabled?: boolean;

  /**  */
  requiredAsterisk?: boolean;

  /** The minium selectable year */
  minYear?: number;

  /** The maximum selectable year */
  maxYear?: number;

  /**  */
  isHijri?: boolean;

  /**  */
  filterDates?: (date: string) => boolean;
}

/**
 * @author coder966
 */
const RruDateInput: FC<RruDateInputProps> = (props) => {
  const formContext = useFormContext();

  const [calendar, setCalendar] = useState<IntlDate[]>();
  const [isPopupShown, setIsPopupShown] = useState<boolean>(false);
  const [todayIntlDate] = useState<IntlDate>(IntlDate.today());

  const [year, setYear] = useState<number>(0);
  const [month, setMonth] = useState<number>(0);
  const [intlDate, setIntlDate] = useState<IntlDate>();

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

  const generateSixWeeksCalendar = (year: number, month: number): IntlDate[] => {
    const firstDayOfMonthDate = IntlDate.of(getCalendarType(), year, month, 1);
    const firstDayOfTheVisibleCalendar = firstDayOfMonthDate.minusDays(firstDayOfMonthDate.getDayOfWeek() - 1);

    const result: IntlDate[] = [firstDayOfTheVisibleCalendar];
    for (let i = 1; i < 42; i++) {
      // 6 rows of 7 days each = 42 days
      result.push(firstDayOfTheVisibleCalendar.plusDays(i));
    }

    return result;
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

  /**
   * init
   */
  useEffect(() => {
    // read the initial value
    formContext.register({ name: props.name });
    const initialValue = formContext.getValues()[props.name];

    // determine the default date
    let initialDateObject: IntlDate;
    try {
      initialDateObject = IntlDate.parse(getCalendarType(), initialValue);
    } catch (e) {
      initialDateObject = IntlDate.today();
      console.warn(
        `RruDateInput(${props.name}) failing to today = ${initialDateObject.toString(
          getCalendarType()
        )} Original error = `,
        e
      );
    }

    // set state to the default date
    setYear(initialDateObject.getYear(getCalendarType()));
    setMonth(initialDateObject.getMonth(getCalendarType()));
    setIntlDate(initialDateObject);
  }, []);

  useEffect(() => {
    if (year === 0 || month === 0) {
      return;
    } else {
      setCalendar(generateSixWeeksCalendar(year, month));
    }
  }, [year, month]);

  useEffect(() => {
    formContext.setValue(props.name, intlDate?.toString(getCalendarType()));
  }, [intlDate]);

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
          type='text'
          disabled={props.disabled}
          value={intlDate && intlDate.toString(getCalendarType())}
          onChange={(e) => { }}
          onClick={(e) => setIsPopupShown(true)}
          className={`form-control ${formContext.errors[props.name] ? 'is-invalid' : ''}`}
        />

        <div
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
          </div>
        </div>
      </div>
      <ErrorMessage inputName={props.name} />
    </div>
  );
}

export { RruDateInput };
