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
  label?: React.ReactNode;
  confirmLabel?: React.ReactNode;
  cancelLabel?: React.ReactNode;
  confirmationTitle?: React.ReactNode;
  confirmationDesc?: React.ReactNode;
  icon?: 'view' | 'edit' | 'lock' | 'unlock' | 'delete' | 'add' | 'remove' | 'check' | 'times' | 'pdf' | 'excel' | 'download' | string;
  onConfirm?: (form?: FormValues, setShow?: (isShowing: boolean) => void) => boolean;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark' | 'light' | 'link' | 'outline-primary' | 'outline-secondary' | 'outline-success' | 'outline-danger' | 'outline-warning' | 'outline-info' | 'outline-dark' | 'outline-light';
  formElements?: React.ReactNode;
  initialValues?: FormInitialValues;
  validationSchema?: object;
  watch?: string[] | ((watch: (fieldNames: string[]) => object) => void);
  watcher?: (form: FormValues) => void;
  userPrivileges?: string[];
  allowedPrivileges?: string[];
}

/**
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
          <div className={show ? "modal display-block" : "modal display-none"}>
            <div>
              <section className='modal-header'>
                <span className='modal-header-close'>{confirmationTitle}</span>
                <span className='modal-header-close' onClick={() => setShow(false)}>X</span>
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
          <button className={'btn btn-'+variant} onClick={() => setShow(true)}>
            {label}
          </button>
        )}
      </>
    );
  } else {
    return icon ? (
      <span onClick={onClick} className={getIcon(icon)} />
    ) : (
      <button className={'btn btn-'+variant} onClick={onClick}>
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

