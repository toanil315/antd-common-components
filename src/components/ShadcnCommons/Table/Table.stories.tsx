import type { Meta, StoryObj } from '@storybook/react';
import Table from './Table';

import { ColumnDef } from '@tanstack/react-table';

import { Badge } from '@/components/shadcn/ui/badge';
import { Checkbox } from '@/components/shadcn/ui/checkbox';

import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from '@radix-ui/react-icons';
import ColumnHeader from './Header';
import { reactRouterParameters, withRouter } from 'storybook-addon-remix-react-router';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Table> = {
  title: 'Shadcn Components/Table',
  component: Table,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
    docs: {
      description: {
        component: 'Table component, nothing new here.',
      },
    },
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Table>;

export const Primary: Story = {
  decorators: [withRouter],
  parameters: {
    reactRouter: reactRouterParameters({}),
  },
  render: () => {
    interface Task {
      id: string;
      title: string;
      status: string;
      label: string;
      priority: string;
    }

    const labels = [
      {
        value: 'bug',
        label: 'Bug',
      },
      {
        value: 'feature',
        label: 'Feature',
      },
      {
        value: 'documentation',
        label: 'Documentation',
      },
    ];

    const statuses = [
      {
        value: 'backlog',
        label: 'Backlog',
        icon: QuestionMarkCircledIcon,
      },
      {
        value: 'todo',
        label: 'Todo',
        icon: CircleIcon,
      },
      {
        value: 'in progress',
        label: 'In Progress',
        icon: StopwatchIcon,
      },
      {
        value: 'done',
        label: 'Done',
        icon: CheckCircledIcon,
      },
      {
        value: 'canceled',
        label: 'Canceled',
        icon: CrossCircledIcon,
      },
    ];

    const priorities = [
      {
        label: 'Low',
        value: 'low',
        icon: ArrowDownIcon,
      },
      {
        label: 'Medium',
        value: 'medium',
        icon: ArrowRightIcon,
      },
      {
        label: 'High',
        value: 'high',
        icon: ArrowUpIcon,
      },
    ];

    const tasks = [
      {
        id: 'TASK-8782',
        title: "You can't compress the program without quantifying the open-source SSD pixel!",
        status: 'in progress',
        label: 'documentation',
        priority: 'medium',
      },
      {
        id: 'TASK-7878',
        title: 'Try to calculate the EXE feed, maybe it will index the multi-byte pixel!',
        status: 'backlog',
        label: 'documentation',
        priority: 'medium',
      },
      {
        id: 'TASK-7839',
        title: 'We need to bypass the neural TCP card!',
        status: 'todo',
        label: 'bug',
        priority: 'high',
      },
      {
        id: 'TASK-5562',
        title:
          'The SAS interface is down, bypass the open-source pixel so we can back up the PNG bandwidth!',
        status: 'backlog',
        label: 'feature',
        priority: 'medium',
      },
      {
        id: 'TASK-8686',
        title: "I'll parse the wireless SSL protocol, that should driver the API panel!",
        status: 'canceled',
        label: 'feature',
        priority: 'medium',
      },
      {
        id: 'TASK-1280',
        title: 'Use the digital TLS panel, then you can transmit the haptic system!',
        status: 'done',
        label: 'bug',
        priority: 'high',
      },
    ];

    const columns: ColumnDef<Task>[] = [
      {
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label='Select all'
            className='translate-y-[2px]'
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label='Select row'
            className='translate-y-[2px]'
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: 'id',
        header: ({ column }) => (
          <ColumnHeader
            column={column}
            title='Task'
          />
        ),
        cell: ({ row }) => <div className='w-[80px]'>{row.getValue('id')}</div>,
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: 'title',
        header: ({ column }) => (
          <ColumnHeader
            column={column}
            title='Title'
          />
        ),
        cell: ({ row }) => {
          const label = labels.find((label) => label.value === row.original.label);

          return (
            <div className='flex space-x-2'>
              {label && <Badge variant='outline'>{label.label}</Badge>}
              <span className='max-w-[500px] truncate font-medium'>{row.getValue('title')}</span>
            </div>
          );
        },
        enableColumnFilter: false,
        enableSorting: true,
      },
      {
        accessorKey: 'status',
        header: ({ column }) => (
          <ColumnHeader
            column={column}
            title='Status'
            options={statuses}
          />
        ),
        cell: ({ row }) => {
          const status = statuses.find((status) => status.value === row.getValue('status'));

          if (!status) {
            return null;
          }

          return (
            <div className='flex w-[100px] items-center'>
              {status.icon && <status.icon className='mr-2 h-4 w-4 text-muted-foreground' />}
              <span>{status.label}</span>
            </div>
          );
        },
        enableColumnFilter: true,
        enableSorting: true,
      },
      {
        accessorKey: 'priority',
        header: ({ column }) => (
          <ColumnHeader
            column={column}
            title='Priority'
            options={priorities}
          />
        ),
        cell: ({ row }) => {
          const priority = priorities.find(
            (priority) => priority.value === row.getValue('priority'),
          );

          if (!priority) {
            return null;
          }

          return (
            <div className='flex items-center'>
              {priority.icon && <priority.icon className='mr-2 h-4 w-4 text-muted-foreground' />}
              <span>{priority.label}</span>
            </div>
          );
        },
        enableColumnFilter: true,
        enableSorting: true,
      },
    ];

    return (
      <div className='p-6 h-screen flex justify-center'>
        <Table
          data={tasks}
          columns={columns}
          totalPageCount={10}
        />
      </div>
    );
  },
};
