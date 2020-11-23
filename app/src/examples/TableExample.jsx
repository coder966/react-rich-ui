import React from 'react';
import {FormattedMessage} from 'react-intl';
import { RruPageableTable } from 'react-rich-ui';

const TableExample = props => {

  const columns = [
    {
      label: <FormattedMessage id='serialNo' />,
      value: '#'
    },
    {
      label: <FormattedMessage id='username' />,
      value: 'username'
    },
    {
      label: <FormattedMessage id='personName' />,
      value: row => (row.person.firstName + ' ' + row.person.lastName),
      sortKey: 'person.firstName'
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
      confirmationTitle: <FormattedMessage id='delete' />,
      confirmationDesc: <FormattedMessage id='deleteConfirmation' />,
      cancelLabel: <FormattedMessage id='cancel' />,
      confirmLabel: <FormattedMessage id='confirm' />,
    },
  ];

  return (
    <>
      <RruPageableTable
        id='UsersListTable'
        endpoint='https://338c0604-aac2-4d0b-a1b8-5edb481149bd.mock.pstmn.io/users'
        pageSize='5'
        columns={columns}
        actions={actions}
        search={{}}
        userPrivileges={['USER:VIEW']} />
    </>
  );
};

export default TableExample;
