import { action } from '@storybook/addon-actions';
import { Meta } from '@storybook/react';
import React, { useState } from 'react';
import '../src/button/style.css';
import {
  getRetainedTableSearchObject,
  RruPageableTable,
  RruPageableTableProps
} from '../src/pageable-table/react-rich-ui-pageable-table';
import '../src/pageable-table/style.css';

const storyMeta: Meta = {
  title: 'Table',
  component: RruPageableTable,
};

export default storyMeta;

export const TableExample = (args: RruPageableTableProps) => {
  const [searchParams1, setSearchParams1] = useState(getRetainedTableSearchObject());
  const [searchParams2, setSearchParams2] = useState(getRetainedTableSearchObject(2));

  /**
   * not the best way to get form data,
   * this is just an example to show how you may want to implement search
   */
  const onSearch1 = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setSearchParams1({
      name: event.target.elements.name.value,
      email: event.target.elements.email.value,
    });
  };

  /**
   * not the best way to get form data,
   * this is just an example to show how you may want to implement search
   */
  const onSearch2 = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setSearchParams2({
      name: event.target.elements.name.value,
      email: event.target.elements.email.value,
    });
  };

  const columns = [
    {
      label: 'No.',
      value: '#',
    },
    {
      label: 'Name',
      value: 'name',
    },
    {
      label: 'Email',
      value: 'email',
    },
    {
      label: 'Address',
      value: (row) => row.address.city + ' - ' + row.address.street,
      sortKey: 'address.city',
    },
  ];

  const actions = [
    {
      icon: 'view',
      privileges: ['USER:VIEW'],
      action: (user) => action('view user')(user),
    },
    {
      icon: 'edit',
      privileges: ['USER:EDIT'],
      action: (user) => action('edit user')(user),
      display: (user) => user.status === 'CONFIRMED',
    },
    {
      icon: 'delete',
      action: (user) => action('delete user')(user),
      onConfirm: (user) => action('confirm delete user')(user),
      confirmationTitle: 'Delete',
      confirmationDesc: 'Are you sure you want to delete ?',
      cancelLabel: 'Cancel',
      confirmLabel: 'Confirm',
    },
  ];

  return (
    <>
      <form onSubmit={onSearch1}>
        <label>Name</label>
        <input name='name' defaultValue={searchParams1?.name || ''} />
        <label>Email</label>
        <input name='email' defaultValue={searchParams1?.email || ''} />
        <button type='submit'>Search</button>
      </form>

      <br />

      <RruPageableTable
        endpoint='http://localhost:8080/api/user1'
        pageSize={5}
        columns={columns}
        actions={actions}
        defaultSortBy='id'
        defaultSortDir='desc'
        search={searchParams1}
        retainSearchObject={true}
        userPrivileges={['USER:VIEW']}
        {...args}
      />

      <form onSubmit={onSearch2}>
        <label>Name</label>
        <input name='name' defaultValue={searchParams2?.name || ''} />
        <label>Email</label>
        <input name='email' defaultValue={searchParams2?.email || ''} />
        <button type='submit'>Search</button>
      </form>

      <br />

      <RruPageableTable
        endpoint='http://localhost:8080/api/user2'
        pageSize={5}
        columns={columns}
        actions={actions}
        defaultSortBy='id'
        defaultSortDir='desc'
        search={searchParams2}
        retainSearchObject={true}
        userPrivileges={['USER:VIEW']}
        {...args}
      />
    </>
  );
};
