import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  Table as ShadcnTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/shadcn/ui/table';
import Pagination from './Pagination';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  totalPageCount: number;
}

const SORT_SEPARATOR = '@SORT@';
const FILTER_SEPARATOR = '@FILTER@';

const getInitialPagination = (): { pageIndex: number; pageSize: number } => {
  const searchParams = new URLSearchParams(window.location.search);
  const pageIndex = Number(searchParams.get('page')) || 0;
  const pageSize = Number(searchParams.get('size')) || 10;

  return {
    pageIndex,
    pageSize,
  };
};

const getInitialSort = (): SortingState => {
  const searchParams = new URLSearchParams(window.location.search);
  const value = searchParams.get('sort');

  if (value) {
    const [id, order] = value.split(SORT_SEPARATOR);
    return [
      {
        id,
        desc: order === 'desc',
      },
    ];
  }

  return [];
};

const getInitialFilter = (): ColumnFiltersState => {
  const searchParams = new URLSearchParams(window.location.search);
  const values = searchParams.getAll('filter');
  const result: ColumnFiltersState = [];

  if (values) {
    values.forEach((filterQuery) => {
      const [filterField, filterValuesStr] = filterQuery.split(FILTER_SEPARATOR);
      const filterValues = JSON.parse(filterValuesStr);

      if (filterValues.length > 0) {
        result.push({ id: filterField, value: filterValues });
      }
    });
    return result;
  }

  return [];
};
function Table<TData, TValue>({ columns, data, totalPageCount }: DataTableProps<TData, TValue>) {
  const [pagination, setPagination] = useState(getInitialPagination());
  const [rowSelection, setRowSelection] = useState({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(getInitialFilter());
  const [sorting, setSorting] = useState<SortingState>(getInitialSort());
  const [searchparams, setSearchParams] = useSearchParams();
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      rowSelection,
      columnFilters,
      pagination,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    pageCount: totalPageCount,
  });

  useEffect(() => {
    const sorting = table.getState().sorting[0];
    const filtering = table.getState().columnFilters;
    const pagination = table.getState().pagination;

    searchparams.delete('sort');
    searchparams.delete('filter');

    if (sorting) {
      searchparams.set('sort', `${sorting.id}${SORT_SEPARATOR}${sorting.desc ? 'desc' : 'asc'}`);
    }

    if (filtering.length) {
      filtering.forEach((filter) => {
        if (Array.isArray(filter.value) && filter.value.length) {
          searchparams.append(
            'filter',
            `${filter.id}${FILTER_SEPARATOR}${JSON.stringify(filter.value)}`,
          );
        }
      });
    }

    searchparams.set('page', String(Number(pagination.pageIndex || 0)));

    if (pagination.pageSize) {
      searchparams.set('size', String(pagination.pageSize));
    }

    setSearchParams(searchparams);
  }, [JSON.stringify(table.getState())]);

  return (
    <div className='space-y-4'>
      <div className='rounded-md border'>
        <ShadcnTable>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      colSpan={header.colSpan}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </ShadcnTable>
      </div>
      <Pagination table={table} />
    </div>
  );
}

export default Table;
