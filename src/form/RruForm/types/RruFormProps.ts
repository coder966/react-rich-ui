export default interface RruFormProps {
  /**  */
  initialValues?: Record<string, any>;

  /**  */
  validationSchema?: object;

  /**  */
  onSubmit: (form: Record<string, any>) => void;

  /** An array of the filed names you want to watch for changes. */
  watch?: string[];

  /** The method that gets called whenever a watched field changes. */
  watcher?: (form: Record<string, any>) => void;

  /**  */
  children: React.ReactNode | React.ReactNode[];
}
