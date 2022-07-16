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
  isHijri?: boolean;

  /**  */
  filterDates?: (date: string) => boolean;
}
