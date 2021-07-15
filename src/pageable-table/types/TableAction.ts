interface TableAction {
    label?: JSX.Element,
    icon?: ((row: object) => string) | 'view' | 'edit' | 'lock' | 'unlock' | 'delete' | 'add' | 'remove' | 'check' | 'times' | 'pdf' | 'excel' | 'download' | string,
    action: (row: object) => void,
    display?: boolean | ((row: object) => boolean),
    privileges?: Array<string>,
    onConfirm?: (row: object) => boolean,
    confirmLabel?: JSX.Element,
    cancelLabel?: JSX.Element,
    confirmationTitle?: JSX.Element,
    confirmationDesc?: JSX.Element,  
}

export default TableAction;
