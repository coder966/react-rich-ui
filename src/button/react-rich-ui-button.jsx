import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap'
import {RruForm} from '../form/react-rich-ui-form';

/**
 * @author coder966
 */
const RruButton = ({label, confirmLabel, cancelLabel, confirmationTitle, confirmationDesc, onConfirm, onClick, variant, formElements, initialValues, validationSchema, watch, watcher}) => {
    const [show, setShow] = useState(false);

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
                <Button variant={variant} onClick={() => setShow(true)}>{label}</Button>
            </>
        )
    }else{
        return <Button variant={variant} onClick={onClick}>{label}</Button>
    }

}

export default RruButton;
