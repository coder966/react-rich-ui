import React, { FC, useState } from 'react';
import { RruForm } from '../form/react-rich-ui-form';
import './style.css';
import RruButtonProps from './types/RruButtonProps';

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

