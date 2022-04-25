interface TableAction {
  label: React.ReactNode;
  action: (row: object) => void;
  display?: boolean | ((row: object) => boolean);
  onConfirm?: (row: object) => boolean | void;
  confirmLabel?: React.ReactNode;
  cancelLabel?: React.ReactNode;
  confirmationTitle?: React.ReactNode;
  confirmationDesc?: React.ReactNode;
}

export default TableAction;
