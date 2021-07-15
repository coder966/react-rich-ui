interface TableColumn {
    label: JSX.Element,
    value: string | ((row: object) => JSX.Element),
    sortable: boolean,
    sortKey: string,
    display: boolean,
}

export default TableColumn;
