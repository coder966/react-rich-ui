interface TableAction {
  label?: React.ReactNode;
  icon?: ((row: object) => string) | 'view' | 'edit' | 'lock' | 'unlock' | 'delete' | 'add' | 'remove' | 'check' | 'times' | 'pdf' | 'excel' | 'download' | string;
  action: (row: object) => void;
  display?: boolean | ((row: object) => boolean);
  privileges?: string[];
  onConfirm?: (row: object) => boolean;
  confirmLabel?: React.ReactNode;
  cancelLabel?: React.ReactNode;
  confirmationTitle?: React.ReactNode;
  confirmationDesc?: React.ReactNode;
}

export default TableAction;
