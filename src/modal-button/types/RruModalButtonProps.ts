import React from "react";

type ButtonProps = JSX.IntrinsicElements['button'];

interface RruModalButtonBaseProps {

  /**
   * The modal title.
   */
  modalTitle?: React.ReactNode;

  /**
   * The modal body.
   */
  modalBody?: React.ReactNode | ((closeModal: () => void) => React.ReactNode);

}

type RruModalButtonProps = (RruModalButtonBaseProps & ButtonProps);

export default RruModalButtonProps;
