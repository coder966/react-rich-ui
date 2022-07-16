import HtmlInputElementProps from "../../types/HtmlInputElementProps";

export default interface RruFileInputProps extends HtmlInputElementProps {
  /**  */
  name: string;

  /**  */
  label?: React.ReactNode;

  /** A placeholder to be displayed in the place of the filename of the file selected. */
  placeholder?: string;

  /**  */
  requiredAsterisk?: boolean;
}
