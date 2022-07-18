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

  /**  */
  calendarType?: RruDateTimeInputCalendarType;

  /**  */
  filterDates?: (date: string) => boolean;
}
