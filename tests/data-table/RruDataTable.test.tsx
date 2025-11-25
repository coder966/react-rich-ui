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

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RruDataTable } from '../../src';
import FetchedPage from '../../src/data-table/types/FetchedPage';
import PageFetcher from '../../src/data-table/types/PageFetcher';
import TableColumn from '../../src/data-table/types/TableColumn';

describe('RruDataTable', () => {
  it('should render table with loading state', async () => {
    // prepare
    const columns: TableColumn[] = [
      { label: 'ID', value: 'id' },
      { label: 'Name', value: 'name' },
    ];

    // Create a pageFetcher that returns a promise that never resolves (simulating loading)
    const pageFetcher: PageFetcher = jest.fn(
      (pageSize, pageNumber, sortKey, sortDir, search) =>
        new Promise<FetchedPage>(() => {
          // Never resolves to keep it in loading state
        })
    );

    // render
    const { container } = render(<RruDataTable pageFetcher={pageFetcher} columns={columns} />);

    // validation - check that loading bar is visible
    const loadingBar = container.querySelector('.rru-data-table__loading-bar-tr--visible');
    expect(loadingBar).toBeTruthy();

    // Ensure the pageFetcher was called
    await waitFor(() => {
      expect(pageFetcher).toHaveBeenCalled();
    });
  });

  it('should render table with error state', async () => {
    // prepare
    const columns: TableColumn[] = [
      { label: 'ID', value: 'id' },
      { label: 'Name', value: 'name' },
    ];

    // Create a pageFetcher that rejects with an error
    const pageFetcher: PageFetcher = jest.fn((pageSize, pageNumber, sortKey, sortDir, search) => {
        return Promise.reject(new Error('Failed to fetch data'))
      }
    );

    // render
    render(<RruDataTable pageFetcher={pageFetcher} columns={columns} errorLabel={'custom error message'}/>);

    // validation - check that the custom error message is displayed
    await waitFor(() => {
      expect(screen.getByText('custom error message')).toBeTruthy();
    });
  });

  it('should render table with empty data (no data)', async () => {
    // prepare
    const columns: TableColumn[] = [
      { label: 'ID', value: 'id' },
      { label: 'Name', value: 'name' },
    ];

    // Create a pageFetcher that returns empty data
    const pageFetcher: PageFetcher = jest.fn((pageSize, pageNumber, sortKey, sortDir, search) =>
      Promise.resolve({
        totalPages: 0,
        items: [],
      })
    );

    // render
    render(<RruDataTable pageFetcher={pageFetcher} columns={columns} noDataLabel={'custom no data message'}/>);

    // validation - check that the custom no data message is displayed
    await waitFor(() => {
      expect(screen.getByText('custom no data message')).toBeTruthy();
    });
  });

  it('should render table columns correctly', async () => {
    // prepare
    const columns: TableColumn[] = [
      { label: 'ID', value: 'id' },
      { label: 'Full Name', value: 'name' },
      { label: 'Email Address', value: 'email' },
    ];

    const pageFetcher: PageFetcher = jest.fn((pageSize, pageNumber, sortKey, sortDir, search) =>
      Promise.resolve({
        totalPages: 1,
        items: [
          { id: 1, name: 'John Doe', email: 'john@example.com' },
          { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
        ],
      })
    );

    // render
    const { container } = render(<RruDataTable pageFetcher={pageFetcher} columns={columns} />);

    // validation - check that column headers are rendered
    await waitFor(() => {
      expect(screen.getByText('ID')).toBeTruthy();
      expect(screen.getByText('Full Name')).toBeTruthy();
      expect(screen.getByText('Email Address')).toBeTruthy();
    });

    // validation - check that data is rendered in the correct rows
    await waitFor(() => {
      const rows = container.querySelectorAll('tbody tr');

      // First data row (John Doe)
      const row1Cells = rows[1]?.querySelectorAll('td');
      expect(row1Cells[0]?.textContent).toBe('1');
      expect(row1Cells[1]?.textContent).toBe('John Doe');
      expect(row1Cells[2]?.textContent).toBe('john@example.com');

      // Second data row (Jane Smith)
      const row2Cells = rows[2]?.querySelectorAll('td');
      expect(row2Cells[0]?.textContent).toBe('2');
      expect(row2Cells[1]?.textContent).toBe('Jane Smith');
      expect(row2Cells[2]?.textContent).toBe('jane@example.com');
    });
  });

  it('should handle pagination navigation (next/previous page)', async () => {
    // prepare
    const columns: TableColumn[] = [
      { label: 'ID', value: 'id' },
      { label: 'Name', value: 'name' },
    ];

    const pageFetcher: PageFetcher = jest.fn((pageSize, pageNumber, sortKey, sortDir, search) => {
      if (pageNumber === 0) {
        return Promise.resolve({
          totalPages: 3,
          items: [{ id: 1, name: 'Item 1' }],
        });
      } else if (pageNumber === 1) {
        return Promise.resolve({
          totalPages: 3,
          items: [{ id: 2, name: 'Item 2' }],
        });
      }
      return Promise.resolve({ totalPages: 3, items: [] });
    });

    // render
    const { container } = render(<RruDataTable pageFetcher={pageFetcher} columns={columns} pageSize={1} />);

    // validation - check initial page
    await waitFor(() => {
      expect(screen.getByText('Item 1')).toBeTruthy();
    });

    // Click on page 2
    const page2Button = container.querySelector('nav ul li[data-page-number="1"]');
    if (page2Button) {
      await userEvent.click(page2Button);
    }

    // validation - check page 2 data
    await waitFor(() => {
      expect(screen.getByText('Item 2')).toBeTruthy();
    });
  });

  it('should handle sorting on sortable columns', async () => {
    // prepare
    const columns: TableColumn[] = [
      { label: 'ID', value: 'id' },
      { label: 'Name', value: 'name' },
    ];

    const pageFetcher: PageFetcher = jest.fn((pageSize, pageNumber, sortKey, sortDir, search) =>
      Promise.resolve({
        totalPages: 1,
        items: [
          { id: 1, name: 'Alice' },
          { id: 2, name: 'Bob' },
        ],
      })
    );

    // render
    render(<RruDataTable pageFetcher={pageFetcher} columns={columns} />);

    // Wait for initial render
    await waitFor(() => {
      expect(screen.getByText('Alice')).toBeTruthy();
    });

    // Click on Name column header to sort
    const nameHeader = screen.getByText('Name');
    await userEvent.click(nameHeader);

    // validation - check that pageFetcher was called with sort parameters
    await waitFor(() => {
      expect(pageFetcher).toHaveBeenCalledWith(10, 0, 'name', 'asc', undefined);
    });
  });

  it('should toggle sort direction (asc/desc) on repeated clicks', async () => {
    // prepare
    const columns: TableColumn[] = [
      { label: 'Name', value: 'name' },
    ];

    const pageFetcher: PageFetcher = jest.fn((pageSize, pageNumber, sortKey, sortDir, search) =>
      Promise.resolve({
        totalPages: 1,
        items: [{ id: 1, name: 'Alice' }],
      })
    );

    // render
    render(<RruDataTable pageFetcher={pageFetcher} columns={columns} />);

    // Wait for initial render
    await waitFor(() => {
      expect(screen.getByText('Alice')).toBeTruthy();
    });

    const nameHeader = screen.getByText('Name');

    // First click - sort ascending
    await userEvent.click(nameHeader);

    await waitFor(() => {
      expect(pageFetcher).toHaveBeenCalledWith(10, 0, 'name', 'asc', undefined);
    });

    // Second click - sort descending
    await userEvent.click(nameHeader);

    await waitFor(() => {
      expect(pageFetcher).toHaveBeenCalledWith(10, 0, 'name', 'desc', undefined);
    });

    // Third click - sort ascending again
    await userEvent.click(nameHeader);

    await waitFor(() => {
      expect(pageFetcher).toHaveBeenCalledWith(10, 0, 'name', 'asc', undefined);
    });
  });

  it('should reset to page 0 when search changes', async () => {
    // prepare
    const columns: TableColumn[] = [
      { label: 'Name', value: 'name' },
    ];

    const pageFetcher = jest.fn((pageSize, pageNumber, sortKey, sortDir, search) =>
      Promise.resolve({
        totalPages: 2,
        items: [{ id: 1, name: 'Alice' }],
      })
    );

    // render
    const { container, rerender } = render(<RruDataTable pageFetcher={pageFetcher} columns={columns} />);

    // Navigate to page 2
    await waitFor(() => {
      expect(screen.getByText('Alice')).toBeTruthy();
    });

    const page2Button = container.querySelector('nav ul li[data-page-number="1"]');
    if (page2Button) {
      await userEvent.click(page2Button);
    }

    // Change search prop
    rerender(<RruDataTable pageFetcher={pageFetcher} columns={columns} search={{ query: 'test' }} />);

    // validation - check that pageFetcher was called with page 0
    await waitFor(() => {
      const lastCall = pageFetcher.mock.calls[pageFetcher.mock.calls.length - 1];
      expect(lastCall[1]).toBe(0); // pageNumber should be 0
    });
  });

  it('should render serial numbers correctly based on current page', async () => {
    // prepare
    const columns: TableColumn[] = [
      { label: '#', value: '#' },
      { label: 'Name', value: 'name' },
    ];

    const pageFetcher: PageFetcher = jest.fn((pageSize, pageNumber, sortKey, sortDir, search) => {
      if (pageNumber === 0) {
        return Promise.resolve({
          totalPages: 2,
          items: [
            { id: 1, name: 'Item 1' },
            { id: 2, name: 'Item 2' },
          ],
        });
      } else {
        return Promise.resolve({
          totalPages: 2,
          items: [
            { id: 3, name: 'Item 3' },
            { id: 4, name: 'Item 4' },
          ],
        });
      }
    });

    // render
    const { container } = render(<RruDataTable pageFetcher={pageFetcher} columns={columns} pageSize={2} />);

    // validation - check serial numbers on page 1 (1, 2)
    await waitFor(() => {
      const cells = container.querySelectorAll('tbody tr td:first-child');
      expect(cells[1]?.textContent).toBe('1');
      expect(cells[2]?.textContent).toBe('2');
    });

    // Navigate to page 2
    const page2Button = container.querySelector('nav ul li[data-page-number="1"]');
    if (page2Button) {
      await userEvent.click(page2Button);
    }

    // validation - check serial numbers on page 2 (3, 4)
    await waitFor(() => {
      const cells = container.querySelectorAll('tbody tr td:first-child');
      expect(cells[1]?.textContent).toBe('3');
      expect(cells[2]?.textContent).toBe('4');
    });
  });

  it('should call onChange callback when page/sort changes as well for initialization', async () => {
    // prepare
    const columns: TableColumn[] = [
      { label: 'Name', value: 'name' },
    ];

    const onChange = jest.fn();

    const pageFetcher: PageFetcher = jest.fn((pageSize, pageNumber, sortKey, sortDir, search) =>
      Promise.resolve({
        totalPages: 2,
        items: [{ id: 1, name: 'Alice' }],
      })
    );

    // render
    const { container } = render(<RruDataTable pageFetcher={pageFetcher} columns={columns} onChange={onChange} />);

    await waitFor(() => {
      expect(screen.getByText('Alice')).toBeTruthy();
    });

    // validation - onChange should be called for init
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledTimes(1);
    });


    // Click on page 2
    const page2Button = container.querySelector('nav ul li[data-page-number="1"]');
    if (page2Button) {
      await userEvent.click(page2Button);
    }

    // validation - onChange should be called
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledTimes(2);
    });

    // Click on Name column to sort
    const nameHeader = screen.getByText('Name');
    await userEvent.click(nameHeader);

    // validation - onChange should be called again
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledTimes(3);
    });
  });

  it('should handle columns with custom value functions', async () => {
    // prepare
    const columns: TableColumn[] = [
      { label: 'ID', value: 'id' },
      { label: 'Full Name', value: (item: any) => `${item.firstName} ${item.lastName}` },
      { label: 'Status', value: (item: any) => (item.active ? 'Active' : 'Inactive') },
    ];

    const pageFetcher: PageFetcher = jest.fn((pageSize, pageNumber, sortKey, sortDir, search) =>
      Promise.resolve({
        totalPages: 1,
        items: [
          { id: 1, firstName: 'John', lastName: 'Doe', active: true },
          { id: 2, firstName: 'Jane', lastName: 'Smith', active: false },
        ],
      })
    );

    // render
    render(<RruDataTable pageFetcher={pageFetcher} columns={columns} />);

    // validation - check that custom functions are executed correctly
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeTruthy();
      expect(screen.getByText('Jane Smith')).toBeTruthy();
      expect(screen.getByText('Active')).toBeTruthy();
      expect(screen.getByText('Inactive')).toBeTruthy();
    });
  });

  it('should apply correct CSS classes for sortable columns', async () => {
    // prepare
    const columns: TableColumn[] = [
      { label: 'ID', value: 'id' },
      { label: 'Name', value: 'name' },
      { label: 'Action', value: () => 'Edit', sortKey: null }, // Not sortable
    ];

    const pageFetcher: PageFetcher = jest.fn((pageSize, pageNumber, sortKey, sortDir, search) =>
      Promise.resolve({
        totalPages: 1,
        items: [{ id: 1, name: 'Alice' }],
      })
    );

    // render
    render(<RruDataTable pageFetcher={pageFetcher} columns={columns} />);

    await waitFor(() => {
      expect(screen.getByText('Alice')).toBeTruthy();
    });

    // validation - check that sortable columns have the correct class
    const idHeader = screen.getByText('ID').closest('th');
    const nameHeader = screen.getByText('Name').closest('th');
    const actionHeader = screen.getByText('Action').closest('th');

    expect(idHeader?.className).toContain('rru-data-table__th--sortable');
    expect(nameHeader?.className).toContain('rru-data-table__th--sortable');
    expect(actionHeader?.className).not.toContain('rru-data-table__th--sortable');

    // Click on Name column to sort
    await userEvent.click(nameHeader as Element);

    // validation - sorted column should have additional class
    await waitFor(() => {
      expect(nameHeader?.className).toContain('rru-data-table__th--sortable-asc');
    });

    // validation - unsortable column should still not have sortable classes
    expect(actionHeader?.className).not.toContain('rru-data-table__th--sortable');
    expect(actionHeader?.className).not.toContain('rru-data-table__th--sortable-asc');
    expect(actionHeader?.className).not.toContain('rru-data-table__th--sortable-desc');
  });

});
