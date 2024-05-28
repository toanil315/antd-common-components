import { useCreateTour, useTours } from '@/hooks/useTour';
import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import TourImage from '@/assets/tour.png';
import { Button, Modal, MoreIcon, OverflowMenu } from '@/components';
import { useModal } from '@/hooks';
import { FormProvider, useForm } from 'react-hook-form';
import Form from '@/components/Form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { openNotification } from '@/contexts/NotificationContext';

export const Route = createLazyFileRoute('/tours/')({
  component: TourList,
});

interface BaseTour {
  name: string;
  description: string;
  steps?: object[];
  url: string;
  nextTourId?: string;
  forRole: string;
}

interface Tour extends BaseTour {
  id: string;
}

const ROLE_OPTIONS = [
  {
    label: 'Site Worker (Wages)',
    value: 'SITE_WORKER',
  },
  {
    label: 'Supervisor',
    value: 'SUPERVISOR',
  },
  {
    label: 'Project Engineer',
    value: 'PROJECT_ENGINEER',
  },
  {
    label: 'Sub-contractor',
    value: 'SUB_CONTRACTOR',
  },
  {
    label: 'Finance Manager',
    value: 'FINANCE_MANAGER',
  },
  {
    label: 'Office Worker',
    value: 'OFFICE_WORKER',
  },
];

function TourList() {
  const { data } = useTours();
  const navigate = useNavigate();
  const modal = useModal();

  return (
    <div className='flex flex-col gap-10 max-w-5xl mx-auto p-4'>
      <div className='flex flex-row items-center justify-between'>
        <h1>Tours</h1>
        <Button onClick={modal.show}>Add Tour</Button>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6'>
        {data?.data.map((tour: Tour) => {
          return (
            <div
              key={tour.id}
              className='py-4 rounded-md shadow-lg flex flex-col gap-4'
            >
              <div className='flex flex-row items-center justify-between px-4'>
                <img
                  src={TourImage}
                  alt='Tour'
                  className='rounded-tr-xl rounded-br-xl'
                />
                <OverflowMenu
                  menu={{
                    items: [
                      {
                        key: 'edit',
                        label: 'Edit',
                        onClick: () => {
                          navigate({ to: `/tours/${tour.id}` });
                        },
                      },
                    ],
                  }}
                  placement='bottomRight'
                  trigger={['click']}
                  className='p-4'
                >
                  <div>
                    <MoreIcon />
                  </div>
                </OverflowMenu>
              </div>
              <div className='px-4 flex flex-col gap-6'>
                <div className='flex flex-col gap-1'>
                  <p className='text-xl font-semibold'>{tour.name}</p>
                  <p className='text-xs'>
                    Edit <span className='font-bold'>2 hours ago</span>
                  </p>
                </div>
                <div className='flex flex-row justify-between items-center'>
                  <p className='text-sm'>
                    role: <span className='font-semibold'>{tour.forRole}</span>
                  </p>
                  <a
                    href={tour.url}
                    className='text-sm no-underline font-medium text-blue-500'
                  >
                    Website Url
                  </a>
                </div>
                <div className='px-4 py-2 rounded-md bg-gray-200 text-sm font-light text-center'>
                  <span className='font-semibold'>{tour.steps?.length}</span> steps
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <Modal
        modal={modal}
        footer={null}
        destroyOnClose
        title='Add Tour'
      >
        <TourModal modal={modal} />
      </Modal>
    </div>
  );
}

function TourModal({ modal }: { modal: ReturnType<typeof useModal> }) {
  const form = useForm<BaseTour>({
    defaultValues: {
      name: '',
      description: '',
      forRole: undefined,
      url: '',
      steps: [],
    },
    resolver: yupResolver(
      yup.object().shape({
        name: yup.string().required('this field is required'),
        description: yup.string().required('this field is required'),
        forRole: yup.string().required('this field is required'),
        url: yup.string().required('this field is required'),
      }),
    ),
  });
  const { mutateAsync, isPending } = useCreateTour();

  const onSubmit = async (data: BaseTour) => {
    try {
      await mutateAsync(data);
      openNotification({
        type: 'success',
        message: 'Tour added successfully',
        description: 'Tour has been added successfully',
      });
      modal.hide();
    } catch (error) {
      openNotification({
        type: 'error',
        message: 'Failed to add tour',
        description: 'Please try again later',
      });
    }
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col gap-4'
      >
        <Form.Input
          name='name'
          label='Name'
          placeholder='Enter tour name'
          required
        />
        <Form.Input
          name='description'
          label='Description'
          placeholder='Enter tour description'
          required
          type='textarea'
        />
        <Form.Select
          label='Role'
          name='forRole'
          options={ROLE_OPTIONS}
          required
          placeholder='Select role'
        />
        <Form.Input
          name='url'
          label='Website Url'
          placeholder='Enter website url'
          required
        />
        <Button loading={isPending}>Submit</Button>
      </form>
    </FormProvider>
  );
}
