import { action } from '@storybook/addon-actions';
import { Meta } from '@storybook/react';
import React, { useState } from 'react';
import '../src/button/style.css';
import { RruPageableTable, RruPageableTableProps } from '../src/pageable-table/react-rich-ui-pageable-table';
import '../src/pageable-table/style.css';

const storyMeta: Meta = {
  title: 'Table',
  component: RruPageableTable,
};

export default storyMeta;

export const TableExample = (args: RruPageableTableProps) => {

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
      action: user => action('view user')(user),
    },
    {
      icon: 'edit',
      privileges: ['USER:EDIT'],
      action: user => action('edit user')(user),
      display: user => user.status === 'CONFIRMED'
    },
    {
      icon: 'delete',
      action: user => action('delete user')(user),
      onConfirm: user => action('confirm delete user')(user),
      confirmationTitle: 'Delete',
      confirmationDesc: 'Are you sure you want to delete ?',
      cancelLabel: 'Cancel',
      confirmLabel: 'Confirm',
    },
  ];

  return (
    <>
      <form onSubmit={onSearch}>
        <label>Name</label>
        <input name='name'/>
        <label>Email</label>
        <input name='email' />
        <button type='submit'>Search</button>
      </form>

      <br />

      <RruPageableTable
        id='UsersListTable'
        endpoint='http://spring-pagination-example.coder966.net/api/user'
        pageSize={5}
        columns={columns}
        actions={actions}
        search={searchParams}
        userPrivileges={['USER:VIEW']}
        {...args} />
    </>
  );
};
