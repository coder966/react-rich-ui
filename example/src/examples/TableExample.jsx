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
    {
      label: 'Actions',
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
