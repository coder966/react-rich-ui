/*
 * Copyright 2020 Khalid H. Alharisi
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
    sortKey: null // to disable sorting for this column
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
  const [searchParams, setSearchParams] = useState({
    name: '', email: ''
  });

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
