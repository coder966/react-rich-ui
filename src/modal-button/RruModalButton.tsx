/*
 * Copyright 2020 Khalid H. Alharisi
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { FC, useState } from 'react';
import './style.css';
import RruModalButtonProps from './types/RruModalButtonProps';

/**
 * A button that shows a modal when clicked.
 */
const RruModalButton: FC<RruModalButtonProps> = (props) => {
  const [show, setShow] = useState(false);

  const closeModal = (): void => {
    setShow(false);
  }

  const renderModalBody = (modalBody?: React.ReactNode | ((closeModal: () => void) => React.ReactNode)): (React.ReactNode | undefined) => {
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
            {renderModalBody(props.modalBody)}
          </section>
        </div>
      </div>
      <button
        {...props}
        onClick={() => setShow(true)}
      >
        {props.children}
      </button>
    </>
  );
};

export default RruModalButton;

