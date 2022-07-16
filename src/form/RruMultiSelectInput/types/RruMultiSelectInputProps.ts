import RruOption from "../../types/RruOption";

export default interface RruMultiSelectInputProps {
  /**  */
  name: string;

  /**  */
  label?: React.ReactNode;

  /**  */
  disabled?: boolean;

  /**  */
  requiredAsterisk?: boolean;

  /**  */
  options: RruOption[];
}

