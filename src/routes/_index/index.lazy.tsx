import { Table } from '@/components';
import { DEFAULT_LIMIT, SORT_ORDER_ENUM } from '@/constants';
import { useTable } from '@/hooks';
import { createLazyFileRoute } from '@tanstack/react-router';
import { TableColumnsType } from 'antd';

export const Route = createLazyFileRoute('/_index/')({
  component: Index,
});

const dataSource = [
  {
    id: '1',
    key: '1',
    name: 'Mike',
    age: 32,
    address: '10 Downing Street',
  },
  {
    id: '2',
    key: '2',
    name: 'John',
    age: 42,
    address: '10 Downing Street',
  },
];

const columns: TableColumnsType = [
  {
    title: 'Name',
    dataIndex: 'name',
    filters: [
      {
        text: 'Joe',
        value: 'Joe',
      },
      {
        text: 'Jim',
        value: 'Jim',
      },
      {
        text: 'Submenu',
        value: 'Submenu',
      },
    ],
    sorter: true,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    sorter: true,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    filters: [
      {
        text: 'London',
        value: 'London',
      },
      {
        text: 'New York',
        value: 'New York',
      },
    ],
  },
];

function Index() {
  const tableInstance = useTable({
    pagination: {
      page: 1,
      limit: DEFAULT_LIMIT,
    },
    sort: {
      field: 'name',
      order: SORT_ORDER_ENUM.ASC,
    },
  });

  return (
    <div className='p-2'>
      <div style={{ width: 500 }}>
        <Table
          tableInstance={tableInstance}
          dataSource={dataSource}
          columns={columns}
          totalElements={dataSource.length || 0}
        />
      </div>
    </div>
  );
}
