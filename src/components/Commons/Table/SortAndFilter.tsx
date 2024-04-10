import React, { useEffect, useMemo } from 'react';
import { StyledSortAndFilterWrapper } from './styled';
import { ColumnGroupType, ColumnType } from 'antd/es/table';
import { useTable } from '@/hooks';
import { OverflowMenu } from '../OverflowMenu';
import { SORT_ORDER_ENUM } from '@/constants';
import { ArrowDownIcon, ArrowUpIcon, FilterIcon, SortIcon } from '@/components/Icons';
import { FormProvider, useForm } from 'react-hook-form';
import Form from '@/components/Form';
import { DefaultOptionType } from 'antd/es/select';
import { EnumUtils } from '@/utils';
import { Button } from '../Button';

interface Props {
  columns?: (ColumnGroupType<any> | ColumnType<any>)[];
  tableInstance: ReturnType<typeof useTable>;
}

const SortAndFilter = ({ columns, tableInstance }: Props) => {
  return (
    <StyledSortAndFilterWrapper>
      <SortConfig
        columns={columns}
        tableInstance={tableInstance}
      />
      <FilterConfig
        columns={columns}
        tableInstance={tableInstance}
      />
    </StyledSortAndFilterWrapper>
  );
};

const SortConfig = ({ columns, tableInstance }: Props) => {
  const sortForm = useForm({
    defaultValues: {
      sortBy: tableInstance.sort.sortedInfo.field,
      sortOrder: tableInstance.sort.sortedInfo.order,
    },
  });

  const onSortSubmit = (value: { sortBy?: string; sortOrder?: SORT_ORDER_ENUM }) => {
    if (value.sortBy && value.sortOrder) {
      tableInstance.onChange(
        null as any,
        null as any,
        { field: value.sortBy, order: value.sortOrder },
        null as any,
      );
    }
  };

  const sortOptions = useMemo(() => {
    return columns
      ?.filter((column) => column.sorter)
      ?.map((column) => ({ value: (column as any).dataIndex, label: column.title }));
  }, [columns]);

  const renderSortIcon = () => {
    switch (tableInstance.sort.sortedInfo.order) {
      case SORT_ORDER_ENUM.ASC:
        return <ArrowUpIcon />;

      case SORT_ORDER_ENUM.DESC:
        return <ArrowDownIcon />;

      default:
        return <SortIcon />;
    }
  };

  const renderSortField = () => {
    return sortOptions?.find((option) => option.value === tableInstance.sort.sortedInfo.field)
      ?.label;
  };

  return (
    <FormProvider {...sortForm}>
      <OverflowMenu
        trigger={['click']}
        destroyPopupOnHide
        menu={{
          style: { width: '300px' },
          items: [
            {
              key: 'sortBy',
              label: (
                <Form.Select
                  name='sortBy'
                  options={sortOptions as any}
                  label='Sort By'
                />
              ),
              disabled: true,
            },
            {
              key: 'sortOrder',
              label: (
                <Form.Select
                  name='sortOrder'
                  options={EnumUtils.stringEnumToArray(SORT_ORDER_ENUM) as DefaultOptionType[]}
                  label='Sort Direction'
                />
              ),
              disabled: true,
            },
            {
              key: 'submit',
              label: (
                <Button
                  onClick={sortForm.handleSubmit(onSortSubmit)}
                  style={{ width: '100%' }}
                >
                  Sort
                </Button>
              ),
            },
          ],
        }}
      >
        <span className='sort'>
          {renderSortIcon()} {renderSortField() as string}
        </span>
      </OverflowMenu>
    </FormProvider>
  );
};

const FilterConfig = ({ columns, tableInstance }: Props) => {
  const filterForm = useForm();

  const onFilterSubmit = (value: Record<string, (number | string)[]>) => {
    const validFilter = Object.keys(value).reduce((acc, key) => {
      if (value[key] && value[key].length > 0) {
        acc[key] = value[key].filter((item) => Boolean(item));
      }
      return acc;
    }, {} as Record<string, (number | string)[]>);
    tableInstance.onChange(null as any, validFilter, null as any, null as any);
  };

  const filterFields = useMemo(() => {
    if (!columns) return [];

    return columns
      ?.filter((column) => column.filters)
      ?.map((column) => ({
        value: (column as any).dataIndex,
        label: column.title,
        options: column.filters || [],
      }));
  }, [columns]);

  useEffect(() => {
    if (Object.keys(tableInstance.filter.filteredInfo).length) {
      filterForm.reset(tableInstance.filter.filteredInfo);
    } else {
      filterForm.reset(
        filterFields.reduce((acc, field) => {
          acc[field.value] = [];
          return acc;
        }, {} as Record<string, (number | string)[]>),
      );
    }
  }, [tableInstance.filter.filteredInfo, filterFields]);

  return (
    <FormProvider {...filterForm}>
      <OverflowMenu
        trigger={['click']}
        destroyPopupOnHide
        menu={{
          style: { width: '300px' },
          items: [
            ...filterFields.map((field) => ({
              key: field.value,
              label: (
                <Form.Select
                  name={field.value}
                  label={field.label as string}
                  placeholder={`Select ${field.label}`}
                  mode='multiple'
                  options={
                    field.options?.map((filterOption) => ({
                      label: filterOption.text,
                      value: filterOption.value,
                    })) as DefaultOptionType[]
                  }
                />
              ),
              disabled: true,
            })),
            {
              key: 'submit',
              label: (
                <Button
                  onClick={filterForm.handleSubmit(onFilterSubmit)}
                  style={{ width: '100%' }}
                >
                  Filter
                </Button>
              ),
            },
          ],
        }}
      >
        <span className='sort'>
          <FilterIcon
            width={17}
            height={17}
          />
        </span>
      </OverflowMenu>
    </FormProvider>
  );
};

export default SortAndFilter;
