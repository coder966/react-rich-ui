import { Meta } from '@storybook/react';
import React from 'react';
import { RruModalButton } from '../src/modal-button/RruModalButton';
import RruModalButtonProps from '../src/modal-button/types/RruModalButtonProps';

const storyMeta: Meta = {
  title: 'ModalButton',
  component: RruModalButton,
};

export default storyMeta;

export const Basic = (args: RruModalButtonProps) => {

  return (
    <RruModalButton
      label='Basic Modal Button'
      modalTitle='Modal Title'
      modalBody='Modal Body' />
  );
  
};

export const Advanced = (args: RruModalButtonProps) => {

  return (
    <RruModalButton
      className='btn btn-primary'
      modalTitle={<span style={{color: 'red'}}>Red Title</span>}
      modalBody={(closeModal) => {
        return <div>
          <span>Hi, This is the modal content. I can programmatically close the modal</span>
          <br></br>
          <br></br>
          <button onClick={closeModal}>Close Modal</button>
        </div>
      }}
      >

        <h1>Big Label</h1>

      </RruModalButton>
  );

};

