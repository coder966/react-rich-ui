import React, { FC, useState } from 'react';
import { RruForm } from '../form/react-rich-ui-form';
import FormInitialValues from '../form/types/FormInitialValues';
import FormValues from '../form/types/FormValues';
import { isObjKey } from '../utils/utilFunction';

const icons = {
  view: 'fa fa-eye icon view',
  edit: 'fas fa-edit icon edit',
  lock: 'fas fa-lock icon lock',
  unlock: 'fas fa-unlock icon unlock',
  delete: 'far fa-trash-alt icon delete',
  add: 'fas fa-plus icon add',
  remove: 'fas fa-minus icon remove',
  check: 'fas fa-check icon check',
  times: 'fas fa-times icon remove',
  pdf: 'far fa-file-pdf icon pdf',
  excel: 'far fa-file-excel icon excel',
  download: 'fas fa-download icon download',
};

const getIcon = (name: keyof typeof icons | string) => (isObjKey(icons, name) ? icons[name] : name);

export interface RruButtonProps {
  /** Button label */
  label?: React.ReactNode;

  /** An icon name from the predefined-list or a string representing a css class name for an icon from external library like `font-awesome`. */
  icon?: 'view' | 'edit' | 'lock' | 'unlock' | 'delete' | 'add' | 'remove' | 'check' | 'times' | 'pdf' | 'excel' | 'download' | string;

  /**  */
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark' | 'light' | 'link' | 'outline-primary' | 'outline-secondary' | 'outline-success' | 'outline-danger' | 'outline-warning' | 'outline-info' | 'outline-dark' | 'outline-light';

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

  /** If you want render this component conditionally based on whether the use has enough permissions from this array. */
  allowedPrivileges?: string[];

  /** The use privileges array. */
  userPrivileges?: string[];
}

/**
 * A versatile button that can be used as an ordinary button or to
 * show a confirmation modal with a fully fledged form context (see `RruForm`).
 *
 * @author coder966
 */
const RruButton: FC<RruButtonProps> = ({ label, confirmLabel, cancelLabel, confirmationTitle, confirmationDesc, icon, onConfirm, onClick, variant, formElements, initialValues, validationSchema, watch, watcher, userPrivileges, allowedPrivileges }) => {
  const [show, setShow] = useState(false);

  if (allowedPrivileges && userPrivileges && !userPrivileges.some((p) => allowedPrivileges.includes(p))) {
    return null;
  }

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
        <RruForm onSubmit={handleConfirm} initialValues={initialValues} validationSchema={validationSchema} watch={watch} watcher={watcher}>
          <div className={show ? 'modal display-block' : 'modal display-none'}>
            <div>
              <section className='modal-header'>
                <span className='modal-header-close'>{confirmationTitle}</span>
                <span className='modal-header-close' onClick={() => setShow(false)}>
                  X
                </span>
              </section>
              <section>
                {confirmationDesc}
                {formElements}
              </section>
              <section className='modal-footer'>
                <button className='btn btn-secondary' onClick={() => setShow(false)}>
                  {cancelLabel}
                </button>
                <button className='btn btn-primary' type='submit'>
                  {confirmLabel}
                </button>
              </section>
            </div>
          </div>
        </RruForm>

        {icon ? (
          <span onClick={() => setShow(true)} className={getIcon(icon)} />
        ) : (
          <button className={'btn btn-' + variant} onClick={() => setShow(true)}>
            {label}
          </button>
        )}
      </>
    );
  } else {
    return icon ? (
      <span onClick={onClick} className={getIcon(icon)} />
    ) : (
      <button className={'btn btn-' + variant} onClick={onClick}>
        {label}
      </button>
    );
  }
};

RruButton.defaultProps = {
  label: 'Button',
  variant: 'primary',
};

export { RruButton };
