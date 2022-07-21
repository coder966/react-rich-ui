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
import RruModalButtonProps from './types/RruModalButtonProps';

/**
 * A button that shows a modal when clicked.
 */
const RruModalButton: FC<RruModalButtonProps> = (props) => {
  const [id] = useState(new Date().getTime());

  const closeModal = (): void => {
    const modal = document.getElementById(`modal-close-${id}`);
    if (modal) {
      modal.click();
    }
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
      <button type='button'
        {...props}
        data-bs-toggle='modal'
        data-bs-target={`#modal-${id}`}
      >
        {props.children}
      </button>

      <div className='modal fade' id={`modal-${id}`} tabIndex={-1} aria-hidden='true'>
        <div className='modal-dialog modal-dialog-centered modal-dialog-scrollable'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title'>Modal title</h5>
              <button id={`modal-close-${id}`} type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
            </div>
            <div className='modal-body'>
              {renderModalBody(props.modalBody)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RruModalButton;

