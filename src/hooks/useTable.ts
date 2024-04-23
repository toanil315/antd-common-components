import { usePagination } from './usePagination';
import { useState } from 'react';
import { SORT_ORDER_ENUM } from '@/constants';
import { TablePaginationConfig, TableProps } from 'antd';
import { useNavigate } from '@tanstack/react-router';
import { SorterResult } from 'antd/es/table/interface';

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface SortParams {
  field: string;
  order: SORT_ORDER_ENUM;
}

export interface FilterParams {
  [key: string]: unknown[] | null;
}

interface UseTableProps {
  pagination: PaginationParams;
  sort?: SortParams;
  filter?: FilterParams;
}

const sortParamsSeparator = '@SORT@';
const filterParamsSeparator = '@FILTER@';

export const useTable = ({
  pagination: defaultPagination,
  sort: defaultSort,
  filter: defaultFilter,
}: UseTableProps) => {
  const pagination = usePagination(defaultPagination);
  const sort = useSortTable(defaultSort);
  const filter = useFilterTable(defaultFilter);
  const navigate = useNavigate();

  const createLegacySearchParams = (
    paginationValue: TablePaginationConfig,
    filterValue: Record<string, unknown[]> | FilterParams,
    sortValue: SorterResult<any> | SorterResult<any>[] | SortParams,
  ) => {
    const searchParams: Record<string, any> = {};

    // Pagination params
    if (paginationValue) {
      searchParams.page = paginationValue.current || pagination.currentPage;
      searchParams.limit = paginationValue.pageSize || pagination.limit;
    }

    // Filter params
    if (filterValue) {
      const filterEntries = Object.entries(filterValue);
      filterEntries.forEach(([field, values]) => {
        if (values && values.length) {
          if (!searchParams.filter) searchParams.filter = [];
          searchParams.filter.push(`${field}${filterParamsSeparator}${values.join(',')}`);
          searchParams.page = 1;
        }
      });
    }

    // Sort params
    if (sortValue) {
      const { field, order } = sortValue as SortParams;
      if (field && order) {
        searchParams.sort = `${field}${sortParamsSeparator}${order}`;
      }
    }

    return searchParams;
  };

  const onChange: TableProps['onChange'] = (paginationValue, filterValue, sortValue) => {
    pagination.onPageChange(
      paginationValue?.current || pagination.currentPage,
      paginationValue?.pageSize || pagination.limit,
    );
    if (filterValue) filter.onFilter(filterValue);
    if (sortValue) sort.onSort(sortValue as SortParams);
    navigate({
      search: createLegacySearchParams(paginationValue, filterValue, sortValue),
    });
  };

  return {
    pagination,
    sort,
    filter,
    onChange,
  };
};

const useSortTable = (initialSort?: SortParams) => {
  const [sortedInfo, setSortedInfo] = useState<Partial<SortParams>>(getInitialSort(initialSort));

  const onSort = ({ field, order }: SortParams) => {
    if (field && order) {
      setSortedInfo({ field, order });
    } else {
      setSortedInfo({});
    }
  };

  return {
    sortedInfo,
    onSort,
  };
};
const useFilterTable = (initialFilter?: FilterParams) => {
  const [filteredInfo, setFilteredInfo] = useState<Partial<FilterParams>>(
    getInitialFilter(initialFilter),
  );

  const onFilter = (filterParams: FilterParams) => {
    setFilteredInfo(filterParams);
  };

  return {
    filteredInfo,
    onFilter,
  };
};

const getInitialSort = (defaultSort?: SortParams): Partial<SortParams> => {
  const searchParams = new URLSearchParams(window.location.search);
  const value = searchParams.get('sort');

  if (value) {
    const [field, order] = value.split(sortParamsSeparator);
    return { field, order: order as SORT_ORDER_ENUM };
  }

  if (defaultSort) {
    return defaultSort;
  }

  return {};
};

const getInitialFilter = (defaultFilter?: FilterParams): Partial<FilterParams> => {
  const searchParams = new URLSearchParams(window.location.search);
  const valuesString = searchParams.getAll('filter')?.[0];
  const valuesArr = valuesString ? JSON.parse(valuesString) : null;
  let result: Record<string, unknown[]> = {};

  if (valuesArr) {
    valuesArr.forEach((filterQuery: string) => {
      const [filterField, filterValuesStr] = filterQuery.split(filterParamsSeparator);
      const filterValues = filterValuesStr.split(',');

      if (filterValues.length > 0) {
        result = { ...result, [filterField]: filterValues };
      }
    });
    return result;
  }

  if (defaultFilter) {
    return defaultFilter;
  }

  return {};
};
