import React from "react";

type ButtonProps = JSX.IntrinsicElements['button'];

interface RruModalButtonProps extends ButtonProps {

  /**
   * The modal title.
   */
  modalTitle?: React.ReactNode;

  /**
   * The modal body.
   */
  modalBody?: React.ReactNode | ((closeModal: () => void) => React.ReactNode);

}

export default RruModalButtonProps;
