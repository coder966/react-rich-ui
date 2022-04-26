import React from "react";

type ButtonProps = JSX.IntrinsicElements['button'];

interface RruModalButtonBaseProps {

  /**
   * Button label.
   */
  label?: React.ReactNode;

  /**
   * Returns weather to to proceed showing the modal or not.
   */
  onClick?: (event: React.MouseEventHandler<HTMLButtonElement>) => boolean;

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
