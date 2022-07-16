import HtmlInputElementProps from "../../types/HtmlInputElementProps";

export default interface RruTextInputProps extends HtmlInputElementProps {
  /**  */
  name: string;

  /**  */
  label?: React.ReactNode;

  /**  */
  requiredAsterisk?: boolean;

  /**  */
  isPassword?: boolean;
}
