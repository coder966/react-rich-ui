import { CalendarType, IntlDate } from "intl-date";

const generateSixWeeksCalendar = (calendarType: CalendarType, year: number, month: number): IntlDate[] => {
  const firstDayOfMonthDate = IntlDate.of(calendarType, year, month, 1);
  const firstDayOfTheVisibleCalendar = firstDayOfMonthDate.minusDays(firstDayOfMonthDate.getDayOfWeek() - 1);

  const result: IntlDate[] = [firstDayOfTheVisibleCalendar];
  for (let i = 1; i < 42; i++) {
    // 6 rows of 7 days each = 42 days
    result.push(firstDayOfTheVisibleCalendar.plusDays(i));
  }

  return result;
}

export default generateSixWeeksCalendar;
