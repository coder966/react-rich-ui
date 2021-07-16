interface TableColumn {
    label: React.ReactNode,
    value: string | ((row: object) => React.ReactNode),
    sortable: boolean,
    sortKey: string,
    display: boolean,
}

export default TableColumn;
