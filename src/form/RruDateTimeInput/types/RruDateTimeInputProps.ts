import RruDateTimeInputCalendarType from "./RruDateTimeInputCalendarType";
import RruDateTimeInputMode from "./RruDateTimeInputMode";

export default interface RruDateTimeInputProps {
  /**  */
  name: string;

  /**  */
  label?: React.ReactNode;

  /**  */
  disabled?: boolean;

  /**  */
  requiredAsterisk?: boolean;

  /** The minium selectable year */
  mode?: RruDateTimeInputMode;

  /** The minium selectable year */
  minYear?: number;

  /** The maximum selectable year */
  maxYear?: number;

  /**  */
  calendarType?: RruDateTimeInputCalendarType;

  /**  */
  filterDates?: (date: string) => boolean;
}
