import FormInitialValues from "./FormInitialValues";
import FormValues from "./FormValues";

export default interface RruFormProps {
  /**  */
  initialValues?: FormInitialValues;

  /**  */
  validationSchema?: object;

  /**  */
  onSubmit: (form: FormValues) => void;

  /** An array of the filed names you want to watch for changes. */
  watch?: string[];

  /** The method that gets called whenever a watched field changes. */
  watcher?: (form: FormValues) => void;

  /**  */
  children: React.ReactNode | React.ReactNode[];
}

