import React, { FC, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
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
}

const getIcon = (name: (keyof typeof icons) | string) => isObjKey(icons, name) ? icons[name] : name;

export interface RruButtonProps {
  label?: React.ReactNode,
  confirmLabel?: React.ReactNode,
  cancelLabel?: React.ReactNode,
  confirmationTitle?: React.ReactNode,
  confirmationDesc?: React.ReactNode,
  icon?: 'view' | 'edit' | 'lock' | 'unlock' | 'delete' | 'add' | 'remove' | 'check' | 'times' | 'pdf' | 'excel' | 'download' | string,
  onConfirm?: (form?: FormValues, setShow?: (isShowing: boolean) => void) => boolean,
  onClick?: () => void,
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark' | 'light' | 'link' | 'outline-primary' | 'outline-secondary' | 'outline-success' | 'outline-danger' | 'outline-warning' | 'outline-info' | 'outline-dark' | 'outline-light',
  formElements?: React.ReactNode,
  initialValues?: FormInitialValues,
  validationSchema?: object,
  watch?: Array<string> | ((watch: ((fieldNames: Array<string>) => object)) => void),
  watcher?: (form: FormValues) => void,
  userPrivileges?: Array<string>,
  allowedPrivileges?: Array<string>,
}

/**
 * @author coder966
 */
const RruButton: FC<RruButtonProps> = ({label, confirmLabel, cancelLabel, confirmationTitle, confirmationDesc, icon, onConfirm, onClick, variant, formElements, initialValues, validationSchema, watch, watcher, userPrivileges, allowedPrivileges}) => {
  const [show, setShow] = useState(false);

  if(allowedPrivileges && userPrivileges && !userPrivileges.some(p => allowedPrivileges.includes(p))){
    return null;
  }

  if(onConfirm){
    const handleConfirm = (data: object) => {
      const result = onConfirm((formElements ? data : undefined), setShow);
      if(result !== undefined){
        setShow(!result);
      }else{
        setShow(false);
      }
    }
    return (
      <>
        <Modal show={show} onHide={() => setShow(false)} centered={true}>
          <Modal.Header closeButton>
            <Modal.Title>{confirmationTitle}</Modal.Title>
          </Modal.Header>
          <RruForm onSubmit={handleConfirm} initialValues={initialValues} validationSchema={validationSchema} watch={watch} watcher={watcher}>
            <Modal.Body>
              {confirmationDesc}
              {formElements}
            </Modal.Body>
            <Modal.Footer>
              <Button variant='secondary' onClick={() => setShow(false)}>{cancelLabel}</Button>
              <Button variant='primary' type='submit'>{confirmLabel}</Button>
            </Modal.Footer>
          </RruForm>
        </Modal>
        {icon ?
          <span onClick={() => setShow(true)} className={getIcon(icon)} />
        : 
          <Button variant={variant} onClick={() => setShow(true)}>{label}</Button>
        }
        
      </>
    )
  }else{
    return icon ?
      <span onClick={onClick} className={getIcon(icon)} />
    : 
      <Button variant={variant} onClick={onClick}>{label}</Button>
  }

}

export default RruButton;
