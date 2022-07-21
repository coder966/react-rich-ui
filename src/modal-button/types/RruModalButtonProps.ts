import React from "react";

type ButtonProps = JSX.IntrinsicElements['button'];

interface RruModalButtonBaseProps {

  /**
   * Button label.
   */
  label?: React.ReactNode;

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
