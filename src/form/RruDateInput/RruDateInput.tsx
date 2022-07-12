import React, { FC, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { addOrSubtractDays, isValidDateObject, range } from '../../utils/utils';
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

  /**  */
  isHijri?: boolean;

  /** Display only past years */
  isPast?: boolean;

  /** Display future past years */
  isFuture?: boolean;

  /** The maximum number of years +/- current year that will be available in the select menus */
  maxYearLength?: number;

  /** Reverse the render order of the date parts selectors */
  reverseDisplayOrder?: boolean;
}

/**
 * @author coder966
 */
const RruDateInput: FC<RruDateInputProps> = (props) => {
  const formContext = useFormContext();

  const [calendar, setCalendar] = useState<Date[]>();
  const [isPopupShown, setIsPopupShown] = useState<boolean>(false);
  const [year, setYear] = useState<number>(0);
  const [month, setMonth] = useState<number>(0);
  const [date, setDate] = useState<Date>();

  const generateSixWeeksCalendar = (year: number, month: number): Date[] => {
    const firstDayOfMonthDate = new Date(year, month - 1, 1);
    const firstDayOfTheVisibleCalendar = addOrSubtractDays(firstDayOfMonthDate, -firstDayOfMonthDate.getDay());

    const result = [firstDayOfTheVisibleCalendar];
    for (let i = 1; i < 42; i++) { // 6 rows of 7 days each = 42 days
      result.push(addOrSubtractDays(firstDayOfTheVisibleCalendar, i));
    }

    return result;
  }

  /**
   * init
   */
  useEffect(() => {
    // read the initial value
    formContext.register({ name: props.name });
    const initialValue = formContext.getValues()[props.name];
    const initialDateObject = new Date(initialValue);

    // determine the default date
    let defaultSelectedDate;
    if(isValidDateObject(initialDateObject)){
      defaultSelectedDate = initialDateObject;
    }else{
      defaultSelectedDate = new Date();
    }

    // set state to the default date
    setYear(defaultSelectedDate.getFullYear());
    setMonth(defaultSelectedDate.getMonth() + 1);
    setDate(defaultSelectedDate);
  }, [])

  useEffect(() => {
    setCalendar(generateSixWeeksCalendar(year, month));
  }, [year, month])

  useEffect(() => {
    const newValue = date?.toISOString().substring(0, 10);
    console.log('date changed newValue = ', newValue);
    formContext.setValue(props.name, newValue);
  }, [date])

  const getDayClassName = (date: Date): string => {
    return `rru-date-input__day ${date.getMonth() + 1 === month ? '' : 'rru-date-input__day--grey'}`;
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
          value={date?.toISOString().substring(0, 10)}
          onChange={e => {}}
          onClick={e => setIsPopupShown(true)} className='form-control'
        />

        <div className={`rru-date-input__popup ${isPopupShown ? 'rru-date-input__popup--shown' : 'rru-date-input__popup--hidden'}`}>
          <div className='rru-date-input__container'>

            <div className='rru-date-input__header'>
              <select value={year} onChange={e => setYear(parseInt(e.target.value))}>
                {range(100, -50).map(i => <option key={`y${i}`}>{(new Date()).getFullYear() + i}</option>)}
              </select>
              <select value={month} onChange={e => setMonth(parseInt(e.target.value))}>
                {range(12, 1).map(i => <option key={`m${i}`}>{i}</option>)}
              </select>
            </div>

            <div className='rru-date-input__body'>
              <table>
                <tbody>
                  {range(6).map(i => (
                    <tr key={`r${i}`}>
                      {range(7).map(j => {
                        const index = ((i * 7) + j);
                        const date = calendar[index];
                        return <td key={`d${date.getTime()}`}>
                          <div className={getDayClassName(date)} onClick={e => {
                            setDate(date);
                            setIsPopupShown(false);
                          }}>{date.getDate()}</div>
                        </td>
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
};

export { RruDateInput };

