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

import { Meta } from '@storybook/react-vite';
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

export const Customized = (args) => {
  return (
    <RruModalButton
      className='btn btn-primary'
      modalTitle={<span style={{ color: 'red' }}>Red Title</span>}
      modalBody={(closeModal) => {
        return (
          <div>
            <span>Hi, This is the modal content. I can programmatically close the modal</span>
            <br></br>
            <br></br>
            <button onClick={closeModal}>Close Modal</button>
          </div>
        );
      }}>
      <h1>Big Label</h1>
    </RruModalButton>
  );
};

export const LongContent = (args) => {
  return (
    <div>
      <RruModalButton
        modalTitle='Modal Title'
        modalBody={(closeModal) => {
          return (
            <div>
              <p>This is a dummy text</p>
              <p>This is a dummy text</p>
              <p>This is a dummy text</p>
              <p>This is a dummy text</p>
              <p>This is a dummy text</p>
              <p>This is a dummy text</p>
              <p>This is a dummy text</p>
              <p>This is a dummy text</p>
              <p>This is a dummy text</p>
              <p>This is a dummy text</p>
              <p>This is a dummy text</p>
              <p>This is a dummy text</p>
              <p>This is a dummy text</p>
              <p>This is a dummy text</p>
              <p>This is a dummy text</p>
              <p>This is a dummy text</p>
              <p>This is a dummy text</p>
              <p>This is a dummy text</p>
              <p>This is a dummy text</p>
              <p>This is a dummy text</p>
              <p>This is a dummy text</p>
              <p>This is a dummy text</p>
              <p>This is a dummy text</p>
              <p>This is a dummy text</p>
              <p>This is a dummy text</p>
              <p>This is a dummy text</p>
              <p>This is a dummy text</p>
              <p>This is a dummy text</p>
              <p>This is a dummy text</p>
              <p>This is a dummy text</p>
              <p>This is a dummy text</p>
              <p>This is a dummy text</p>
              <p>This is a dummy text</p>
              <p>This is a dummy text</p>
              <p>This is a dummy text</p>
              <button onClick={closeModal}>Close Modal</button>
            </div>
          );
        }}>
        Click Me
      </RruModalButton>

      <p>This is a dummy text</p>
      <p>This is a dummy text</p>
      <p>This is a dummy text</p>
      <p>This is a dummy text</p>
      <p>This is a dummy text</p>
      <p>This is a dummy text</p>
      <p>This is a dummy text</p>
      <p>This is a dummy text</p>
      <p>This is a dummy text</p>
      <p>This is a dummy text</p>
      <p>This is a dummy text</p>
      <p>This is a dummy text</p>
      <p>This is a dummy text</p>
      <p>This is a dummy text</p>
      <p>This is a dummy text</p>
      <p>This is a dummy text</p>
      <p>This is a dummy text</p>
      <p>This is a dummy text</p>
      <p>This is a dummy text</p>
      <p>This is a dummy text</p>
      <p>This is a dummy text</p>
      <p>This is a dummy text</p>
      <p>This is a dummy text</p>
      <p>This is a dummy text</p>
      <p>This is a dummy text</p>
      <p>This is a dummy text</p>
      <p>This is a dummy text</p>
      <p>This is a dummy text</p>
      <p>This is a dummy text</p>
      <p>This is a dummy text</p>
      <p>This is a dummy text</p>
      <p>This is a dummy text</p>
      <p>This is a dummy text</p>
      <p>This is a dummy text</p>
      <p>This is a dummy text</p>
    </div>
  );
};
