import { action } from '@storybook/addon-actions';
import { Meta } from '@storybook/react';
import React, { useState } from 'react';
import {
  getRetainedTableSearchObject,
  RruPageableTable
} from '../src/index';

const storyMeta: Meta = {
  title: 'RruPageableTable',
};

export default storyMeta;

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
  {
    label: 'Actions',
    value: (user) => <>
      <button onClick={e => action('view user')(user)}>View</button>
      {user.status === 'CONFIRMED' && <button onClick={e => action('edit user')(user)}>Edit</button>}
    </>,
  },
];



export const Basic = (args) => {
  const [searchParams, setSearchParams] = useState(getRetainedTableSearchObject('http://localhost:8080/api/user'));

  /**
   * not the best way to get form data,
   * this is just an example to show how you may want to implement search
   */
  const onSearch = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setSearchParams({
      name: event.target.elements.name.value,
      email: event.target.elements.email.value,
    });
  };

  return (
    <>
      <form onSubmit={onSearch}>
        <label>Name</label>
        <input name='name' defaultValue={searchParams?.name || ''} />
        <label>Email</label>
        <input name='email' defaultValue={searchParams?.email || ''} />
        <button type='submit'>Search</button>
      </form>

      <br />

      <RruPageableTable
        endpoint='http://localhost:8080/api/user'
        pageSize={5}
        columns={columns}
        defaultSortBy='id'
        defaultSortDir='desc'
        search={searchParams}
      />
    </>
  );
};

export const RetainState = (args) => {
  const [searchParams, setSearchParams] = useState(getRetainedTableSearchObject('http://localhost:8080/api/user'));

  /**
   * not the best way to get form data,
   * this is just an example to show how you may want to implement search
   */
  const onSearch = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setSearchParams({
      name: event.target.elements.name.value,
      email: event.target.elements.email.value,
    });
  };

  return (
    <>
      <form onSubmit={onSearch}>
        <label>Name</label>
        <input name='name' defaultValue={searchParams?.name || ''} />
        <label>Email</label>
        <input name='email' defaultValue={searchParams?.email || ''} />
        <button type='submit'>Search</button>
      </form>

      <br />

      <RruPageableTable
        endpoint='http://localhost:8080/api/user'
        pageSize={5}
        columns={columns}
        defaultSortBy='id'
        defaultSortDir='desc'
        search={searchParams}
        retainTableState={true}
      />
    </>
  );
};

export const TwoTablesInTheSamePage = (args) => {
  const [searchParams1, setSearchParams1] = useState(getRetainedTableSearchObject('http://localhost:8080/api/user'));
  const [searchParams2, setSearchParams2] = useState(getRetainedTableSearchObject('http://localhost:8080/api/user'));

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
        endpoint='http://localhost:8080/api/user'
        pageSize={5}
        columns={columns}
        defaultSortBy='id'
        defaultSortDir='desc'
        search={searchParams1}
        retainTableState={true}
      />

      <br /><br />

      <form onSubmit={onSearch2}>
        <label>Name</label>
        <input name='name' defaultValue={searchParams2?.name || ''} />
        <label>Email</label>
        <input name='email' defaultValue={searchParams2?.email || ''} />
        <button type='submit'>Search</button>
      </form>

      <br />

      <RruPageableTable
        endpoint='http://localhost:8080/api/user'
        pageSize={5}
        columns={columns}
        defaultSortBy='id'
        defaultSortDir='desc'
        search={searchParams2}
        retainTableState={true}
      />
    </>
  );
};
