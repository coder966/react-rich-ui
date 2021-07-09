import React from 'react';
import { RruPageableTable } from 'react-rich-ui';

const TableExample = props => {

  const columns = [
    {
      label: 'No.',
      value: '#'
    },
    {
      label: 'Username',
      value: 'username'
    },
    {
      label: 'Company',
      value: 'company.name'
    },
    {
      label: 'Address',
      value: row => (row.address.city + ' - ' + row.address.zipCode),
      sortKey: 'address.zipCode'
    },
  ];

  const actions = [
    {
      icon: 'view',
      privileges: ['USER:VIEW'],
      action: user => console.log('view user'+user.id),
    },
    {
      icon: 'edit',
      privileges: ['USER:EDIT'],
      action: user => console.log('edit user'+user.id),
      display: user => user.status === 'CONFIRMED'
    },
    {
      icon: 'delete',
      action: user => console.log('delete user'+user.id),
      onConfirm: user => console.log('confirm delete user'+user.id),
      confirmationTitle: 'Delete',
      confirmationDesc: 'Are you sure you want to delete ?',
      cancelLabel: 'Cancel',
      confirmLabel: 'Confirm',
    },
  ];

  return (
    <>
      <RruPageableTable
        id='UsersListTable'
        endpoint='https://gtntvvjsp0.execute-api.us-east-2.amazonaws.com/default/spring-page-rest-api'
        pageSize='5'
        columns={columns}
        actions={actions}
        search={{}}
        userPrivileges={['USER:VIEW']} />
    </>
  );
};

export default TableExample;
