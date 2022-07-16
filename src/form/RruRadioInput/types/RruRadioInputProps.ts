import HtmlInputElementProps from "../../types/HtmlInputElementProps";
import RruOption from "../../types/RruOption";

export default interface RruRadioInputProps extends HtmlInputElementProps {
  /**  */
  name: string;

  /**  */
  label?: React.ReactNode;

  /**  */
  requiredAsterisk?: boolean;

  /**  */
  options: RruOption[];

  /** Display all radio buttons in the same line */
  inline?: boolean;
}
