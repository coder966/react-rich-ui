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
      label: <FormattedMessage id='companyName' />,
      value: 'company.name'
    },
    {
      label: <FormattedMessage id='address' />,
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
