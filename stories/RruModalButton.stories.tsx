import { Meta } from '@storybook/react';
import React from 'react';
import { RruModalButton } from '../src/index';

const storyMeta: Meta = {
  title: 'RruModalButton',
};

export default storyMeta;

export const Basic = (args) => {

  return (
    <RruModalButton modalTitle='Modal Title' modalBody='Modal Body'>
      Basic Modal Button
    </RruModalButton>
  );

};

export const Advanced = (args) => {

  return (
    <RruModalButton
      className='btn btn-primary'
      modalTitle={<span style={{ color: 'red' }}>Red Title</span>}
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

