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
  RruDataTable
} from '../src/index';

const storyMeta: Meta = {
  title: 'RruDataTable',
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

const springPageFetcher = async (pageSize: number, pageNumber: number, sortKey: string | undefined, sortDir: 'asc' | 'desc' | undefined, search: any) => {
  const response = await fetch('http://localhost:8080/api/user?' + new URLSearchParams({
    size: pageSize,
    page: pageNumber,
    sort: sortKey ? sortKey + ',' + (sortDir ? sortDir : '') : '',
    ...search
  }));
  const json = await response.json();
  return {
    totalPages: json.totalPages,
    items: json.content,
  }
}

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

      <RruDataTable
        pageFetcher={springPageFetcher}
        pageSize={5}
        columns={columns}
        defaultSortKey='id'
        defaultSortDir='desc'
        search={searchParams}
      />
    </>
  );
};

export const RetainState = (args) => {

  const saveState = (search: any, pageNumber: number, sortKey?: string, sortDir?: 'asc' | 'desc') => {
    // example of retaining table state:
    // you may want to use Redux or React Context
    // use whatever storage you like, but here I will use session storage for simplicity
    sessionStorage.setItem('my-page-state', JSON.stringify({
      search, pageNumber, sortKey, sortDir
    }));
  }

  const restoreState = () => {
    const json = sessionStorage.getItem('my-page-state');
    if (json) {
      return JSON.parse(json);
    } else {
      return undefined
    }
  }

  const [retainedState,] = useState<any>(restoreState());
  const [searchParams, setSearchParams] = useState<any>(retainedState?.search);


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

  const onTableChange = (pageNumber: number, sortKey?: string, sortDir?: 'asc' | 'desc'): void => {
    saveState(searchParams, pageNumber, sortKey, sortDir);
  }

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

      <RruDataTable
        pageFetcher={springPageFetcher}
        pageSize={5}
        columns={columns}
        search={searchParams}
        defaultPageNumber={retainedState?.pageNumber}
        defaultSortKey={retainedState?.sortKey}
        defaultSortDir={retainedState?.sortDir}
        onChange={onTableChange}
      />
    </>
  );
};
