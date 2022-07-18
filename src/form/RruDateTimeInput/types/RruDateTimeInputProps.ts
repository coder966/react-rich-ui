import RruDateTimeInputCalendarType from "./RruDateTimeInputCalendarType";
import RruDateTimeInputDateConfig from "./RruDateTimeInputDateConfig";
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
  getDateConfig?: (date: string) => RruDateTimeInputDateConfig | undefined | null | void;
}
