import FormInitialValues from "../../form/types/FormInitialValues";
import FormValues from "../../form/types/FormValues";

interface RruButtonProps {

  /** Button label */
  label?: React.ReactNode;

  /**  */
  variant?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'dark'
    | 'light'
    | 'link'
    | 'outline-primary'
    | 'outline-secondary'
    | 'outline-success'
    | 'outline-danger'
    | 'outline-warning'
    | 'outline-info'
    | 'outline-dark'
    | 'outline-light';

  /**  */
  onClick?: () => void;

  /** Set this function if you want the button to act as a confirmation button.
   * This function will be called when the user confirms the action.
   *
   * When this function is defined, the `onClick` function will be ignored.
   */
  onConfirm?: (form?: FormValues, setShow?: (isShowing: boolean) => void) => boolean;

  /** The modal title. */
  confirmationTitle?: React.ReactNode;

  /** The description for the operation rendered in the body of the modal. */
  confirmationDesc?: React.ReactNode;

  /** The confirm button label. */
  confirmLabel?: React.ReactNode;

  /** The cancel button label. */
  cancelLabel?: React.ReactNode;

  /** If you want to have a form in the confirmation modal use this to render the form elements.
   * The form `RruForm` is already embedded for you.
   */
  formElements?: React.ReactNode;

  /** The `initialValues` to be injected into the form `RruForm`. */
  initialValues?: FormInitialValues;

  /** The `validationSchema` to be injected into the form `RruForm`. */
  validationSchema?: object;

  /** The `watch` to be injected into the form `RruForm`. */
  watch?: string[] | ((watch: (fieldNames: string[]) => object) => void);

  /** The `watcher` to be injected into the form `RruForm`. */
  watcher?: (form: FormValues) => void;

}

export default RruButtonProps;
