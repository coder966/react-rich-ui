import React, { useState } from 'react';
import { RruPageableTable } from 'react-rich-ui';

const TableExample = props => {

  const [searchParams, setSearchParams] = useState({});

  /**
   * not the best way to get form data,
   * this is just an example to show how you may want to implement search
   */
  const onSearch = event => {
    event.preventDefault();
    event.stopPropagation();
    setSearchParams({
      name: event.target.elements.name.value,
      email: event.target.elements.email.value
    })
  }

  const columns = [
    {
      label: 'No.',
      value: '#'
    },
    {
      label: 'Name',
      value: 'name'
    },
    {
      label: 'Email',
      value: 'email'
    },
    {
      label: 'Address',
      value: row => (row.address.city + ' - ' + row.address.street),
      sortKey: 'address.city'
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
      <form onSubmit={onSearch}>
        <label>Name</label><input name='name' />
        <label>Email</label><input name='email' />
        <button type='submit'>Search</button>
      </form>

      <br />

      <RruPageableTable
        id='UsersListTable'
        endpoint='http://spring-pagination-example.coder966.net/api/user'
        pageSize='5'
        columns={columns}
        actions={actions}
        search={searchParams}
        userPrivileges={['USER:VIEW']} />
    </>
  );
};

export default TableExample;
