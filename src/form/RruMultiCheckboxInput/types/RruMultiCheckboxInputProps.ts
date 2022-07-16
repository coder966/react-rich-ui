import HtmlInputElementProps from "../../types/HtmlInputElementProps";
import RruOption from "../../types/RruOption";

export default interface RruMultiCheckboxInputProps extends HtmlInputElementProps {
  /**  */
  name: string;

  /**  */
  label?: React.ReactNode;

  /**  */
  requiredAsterisk?: boolean;

  /**  */
  options: RruOption[];
}

