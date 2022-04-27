import { fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

const asyncFireClickEvent = async (element: Element | null) => {
  if(element){
    await act(async () => {
      fireEvent.click(element);
    });
  }
}

const asyncFireChangeEvent = async (element: Element | null, event: {}) => {
  if(element){
    await act(async () => {
      fireEvent.change(element, event);
    });
  }
}


export { asyncFireClickEvent, asyncFireChangeEvent };

