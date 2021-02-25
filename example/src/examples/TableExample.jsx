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
    {
      label: <FormattedMessage id='Actions' />,
      value: row => <>
        <button onClick={event => console.log('Viewing user: '+row.id)}>View</button>
        <button onClick={event => console.log('Deleting user: '+row.id)}>Delete</button>
      </>,
    },
  ];

  return (
    <>
      <RruPageableTable
        id='UsersListTable'
        endpoint='https://gtntvvjsp0.execute-api.us-east-2.amazonaws.com/default/spring-page-rest-api'
        pageSize='5'
        columns={columns}
        search={{}} />
    </>
  );
};

export default TableExample;
