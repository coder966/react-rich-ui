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

  const renderModalSection = (modalBody?: React.ReactNode | ((closeModal: () => void) => React.ReactNode)): (React.ReactNode | undefined) => {
    if (modalBody) {
      if (typeof modalBody === 'function') {
        return modalBody(closeModal);
      } else {
        return modalBody;
      }
    } else {
      return undefined;
    }
  }

  return (
    <>
      <div className={`rru-modal-button__container rru-modal-button__container--${show ? 'visible' : 'hidden'}`}>
        <div className='rru-modal-button__box'>
          <section className='rru-modal-button__section rru-modal-button__header'>
            <span className='rru-modal-button__title'>{props.modalTitle}</span>
            <span className='rru-modal-button__close-button' onClick={() => setShow(false)}></span>
          </section>
          <section className='rru-modal-button__section'>
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

export default RruModalButton;

