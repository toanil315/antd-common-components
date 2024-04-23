import { StyledTable } from './styled';
import { TableProps } from 'antd';
import { useDimension, useTable } from '@/hooks';
import { useMemo } from 'react';
import TableSortIcon from './TableSortIcon';
import { DataEmpty, FilterIcon } from '@/components';
import theme from '@/styles/theme';
import { Pagination } from '../Pagination';
import SortAndFilter from './SortAndFilter';
import TableResponsive from './TableResponsive';

interface Props extends TableProps {
  tableInstance: ReturnType<typeof useTable>;
  totalElements: number;
}

const Table = ({ tableInstance, totalElements, ...restProps }: Props) => {
  const { pagination, filter, sort } = tableInstance;
  const {
    dimensions: [isXs],
  } = useDimension();

  const handleChange: TableProps['onChange'] = (paginationValue, filterValue, sortValue) => {
    tableInstance.onChange(paginationValue, filterValue, sortValue, restProps.dataSource as any);
  };

  const customColumns = useMemo(() => {
    if (!restProps.columns) return;
    const newColumn = [...restProps.columns];
    const sortBy = sort.sortedInfo?.field;
    const sortDirection = sort.sortedInfo?.order;
    if (sortBy && sortDirection) {
      const columnIndex = newColumn.findIndex((c) => (c as any).dataIndex === sortBy);
      if (columnIndex !== -1) {
        newColumn[columnIndex].defaultSortOrder = sortDirection;
      }
    }
    newColumn.forEach((item: any) => {
      const filteredValues = filter.filteredInfo[item.dataIndex];
      const isItemFiltered = Array.isArray(filteredValues) && filteredValues?.length > 0;
      item.filteredValue = filteredValues;
      item.sortIcon = ({ sortOrder }: { sortOrder: string | null }) => (
        <TableSortIcon sortOrder={sortOrder} />
      );
      item.filterIcon = (filtered: boolean) => {
        if (filtered || isItemFiltered) {
          return <FilterIcon fill={theme.colors.primary_6} />;
        } else return <FilterIcon />;
      };
    });
    return newColumn;
  }, [restProps.columns, JSON.stringify(sort.sortedInfo), JSON.stringify(filter.filteredInfo)]);

  const locale = useMemo(() => {
    return {
      emptyText: <DataEmpty />,
    };
  }, []);

  const renderTableBaseOnDimension = () => {
    if (isXs) {
      return (
        <>
          <SortAndFilter
            columns={customColumns}
            tableInstance={tableInstance}
          />
          <TableResponsive
            columns={customColumns}
            {...restProps}
          />
        </>
      );
    }

    return (
      <StyledTable
        onChange={handleChange}
        columns={customColumns}
        locale={locale}
        pagination={{
          pageSize: pagination.limit,
        }}
        {...restProps}
      />
    );
  };

  return (
    <div>
      {renderTableBaseOnDimension()}
      <Pagination
        {...restProps.pagination}
        current={pagination.currentPage}
        pageSize={pagination.limit}
        total={totalElements}
        onTableChange={tableInstance.onChange as any}
      />
    </div>
  );
};

export default Table;
