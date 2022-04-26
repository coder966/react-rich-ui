import React, { FC, useState } from 'react';
import './style.css';
import RruModalButtonProps from './types/RruModalButtonProps';

/**
 * A button that shows a modal when clicked.
 *
 * @author coder966
 */
const RruModalButton: FC<RruModalButtonProps> = (props) => {
  const [show, setShow] = useState(false);

  const closeModal = (): void => {
    setShow(false);
  }

  const renderModalSection = (modalFooter?: React.ReactNode | ((closeModal: () => void) => React.ReactNode)): (React.ReactNode | undefined) => {
    if (modalFooter) {
      if (typeof modalFooter === 'function') {
        return modalFooter(closeModal);
      } else {
        return modalFooter;
      }
    } else {
      return undefined;
    }
  }

  return (
    <>
      <div className={show ? 'rru-button-modal__container rru-button-modal__container--visible' : 'rru-button-modal__container rru-button-modal__container--hidden'}>
        <div className='rru-button-modal__box'>
          <section className='rru-button-modal__section rru-button-modal__header'>
            <span className='rru-button-modal__title'>{props.modalTitle}</span>
            <span className='rru-button-modal__close-button' onClick={() => setShow(false)}></span>
          </section>
          <section className='rru-button-modal__section'>
            {renderModalSection(props.modalBody)}
          </section>
        </div>
      </div>
      <button
        {...props}
        onClick={() => setShow(true)}
      >
        {props.label ? props.label : props.children}
      </button>
    </>
  );
};

export { RruModalButton };

