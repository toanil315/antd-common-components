import { ColumnGroupType, ColumnType, TableProps } from 'antd/es/table';
import React from 'react';
import { StyledList, StyledTableRecordCard } from './styled';

interface Props extends TableProps {
  columns?: (ColumnGroupType<any> | ColumnType<any>)[];
}

const TableResponsive = ({ columns, dataSource }: Props) => {
  return (
    <StyledList>
      {dataSource?.map((record, index) => {
        return (
          <StyledTableRecordCard key={record.id}>
            {columns?.map((column) => {
              return (
                <div
                  className='row'
                  key={`${(column as any).dataIndex}-${record.id}`}
                >
                  <span className='label'>{column.title as string}</span>
                  <span className='value'>
                    {column.render?.(record[(column as any).dataIndex], record, index) ||
                      record[(column as any).dataIndex]}
                  </span>
                </div>
              );
            })}
          </StyledTableRecordCard>
        );
      })}
    </StyledList>
  );
};

export default TableResponsive;
