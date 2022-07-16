
type HtmlTextareaElementProps = JSX.IntrinsicElements['textarea'];

export default interface RruTextareaInputProps extends HtmlTextareaElementProps {
  /**  */
  name: string;

  /**  */
  label?: React.ReactNode;

  /**  */
  requiredAsterisk?: boolean;
}
