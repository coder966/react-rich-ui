import React, { FC, useState } from 'react';
import { RruForm } from '../form/react-rich-ui-form';
import FormInitialValues from '../form/types/FormInitialValues';
import FormValues from '../form/types/FormValues';
import './style.css';

export interface RruButtonProps {
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
   * Use `RruFormElement` directly. The form `RruForm` is already embedded for you.
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

/**
 * A versatile button that can be used as an ordinary button or to
 * show a confirmation modal with a fully fledged form context (see `RruForm`).
 *
 * @author coder966
 */
const RruButton: FC<RruButtonProps> = ({
  label = 'Button',
  variant = 'primary',
  onClick,
  onConfirm,
  confirmationTitle,
  confirmationDesc,
  confirmLabel,
  cancelLabel,
  formElements,
  initialValues,
  validationSchema,
  watch,
  watcher,
}) => {
  const [show, setShow] = useState(false);

  if (onConfirm) {
    const handleConfirm = (data: object) => {
      const result = onConfirm(formElements ? data : undefined, setShow);
      if (result !== undefined) {
        setShow(!result);
      } else {
        setShow(false);
      }
    };
    return (
      <>
        <RruForm
          onSubmit={handleConfirm}
          initialValues={initialValues}
          validationSchema={validationSchema}
          watch={watch}
          watcher={watcher}
        >
          <div className={show ? 'rru-button-modal__container rru-button-modal__container--visible' : 'rru-button-modal__container rru-button-modal__container--hidden'}>
            <div className='rru-button-modal__box'>
              <section className='rru-button-modal__section rru-button-modal__header'>
                <span className='rru-button-modal__title'>{confirmationTitle}</span>
                <span className='rru-button-modal__close-button' onClick={() => setShow(false)}></span>
              </section>
              <section className='rru-button-modal__section'>
                {confirmationDesc}
                {formElements}
              </section>
              <section className='rru-button-modal__section rru-button-modal__footer'>
                <button type='button' className='btn btn-secondary m-1' onClick={() => setShow(false)}>
                  {cancelLabel}
                </button>
                <button className='btn btn-primary m-1' type='submit'>
                  {confirmLabel}
                </button>
              </section>
            </div>
          </div>
        </RruForm>

        <button className={'btn btn-' + variant} onClick={() => setShow(true)}>{label}</button>
      </>
    );
  } else {
    return <button className={'btn btn-' + variant} onClick={onClick}>{label}</button>
  }
};

export { RruButton };

