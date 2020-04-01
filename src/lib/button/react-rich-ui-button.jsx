import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap'
import {RruForm} from '../form/react-rich-ui-form';
import './style.css';

const icons = {
    view: 'fa fa-eye icon view',
    edit: 'fas fa-edit icon edit',
    lock: 'fas fa-lock icon lock',
    unlock: 'fas fa-unlock icon unlock',
    delete: 'far fa-trash-alt icon delete',
}

/**
 * @author coder966
 */
const RruButton = ({label, confirmLabel, cancelLabel, confirmationTitle, confirmationDesc, icon, onConfirm, onClick, variant, formElements, validationSchema, watcher, userPrivileges, allowedPrivileges}) => {
    const [show, setShow] = useState(false);

    if(allowedPrivileges && userPrivileges && !userPrivileges.some(p => allowedPrivileges.includes(p))){
        return null;
    }

    if(onConfirm){
        const handleConfirm = data => {
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
                    <RruForm onSubmit={handleConfirm} validationSchema={validationSchema} watch={watcher}>
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
                    <span onClick={() => setShow(true)} className={'ml-1 '+icons[icon]} />
                : 
                    <Button variant={variant} onClick={() => setShow(true)} className={'ml-1 '+icons[icon]}>{label}</Button>
                }
                
            </>
        )
    }else{
        return icon ?
            <span onClick={onClick} className={'ml-1 '+icons[icon]} />
        : 
            <Button variant={variant} onClick={onClick} className={'ml-1 '+icons[icon]}>{label}</Button>
    }

}

export default RruButton;
