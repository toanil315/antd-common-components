import { useModal } from '@/hooks';
import React from 'react';
import { Variable } from '../plugins/Variables.plugin';
import { Editor } from '@tinymce/tinymce-react';
import { FormProvider, useForm } from 'react-hook-form';
import Form from '@/components/Form';
import { Modal } from '@/components/Commons/Modal';
import { Button } from '@/components/Commons/Button';

interface Props {
  editor?: Editor['editor'] | null;
  modal: ReturnType<typeof useModal>;
  variable: Variable;
}

const defaultData = {
  name: {
    content: 'Enosta',
    type: 'span',
    tag: 'span',
  },
  employeeList: {
    content: ['Nguyen', 'Minh', 'Long', 'Phat'],
    type: 'list',
    tag: 'ul',
  },
};

export const genList = (items: string[]) => {
  let result = '';
  if (Array.isArray(items)) {
    items.forEach((item) => {
      result += `<li>${item}</li>`;
    });
  }
  return result;
};

const genHtmlString = (variable: Variable) => {
  const data = defaultData[variable];
  let body = '';
  switch (data.type) {
    case 'span': {
      body = data.content as string;
      break;
    }

    case 'list': {
      body = genList(data.content as string[]);
      break;
    }
  }

  return `<${data.tag} class="mceNonEditable">
        ${body}
    </${data.tag}>`;
};

const InsertVariableModal = ({ editor, modal, variable }: Props) => {
  const form = useForm({
    defaultValues: {
      variable,
      previewData: genHtmlString(variable),
      isLock: false,
    },
  });

  const onSubmit = (values: any) => {
    if (values.isLock) {
      const htmlString = values.previewData.replace('mceNonEditable', '');
      editor?.insertContent(htmlString);
    } else {
      editor?.insertContent(
        `<span class="mceNonEditable" data-variable="${values.variable}">&nbsp;</span>`,
      );
    }
    modal.hide();
  };

  return (
    <Modal
      modal={modal}
      title='Insert Variable'
      footer={null}
    >
      <FormProvider {...form}>
        <form
          className='flex flex-col gap-3'
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div
            className='w-full h-36 p-6 rounded-md bg-white border border-solid border-gray-200'
            dangerouslySetInnerHTML={{
              __html: form.watch('previewData'),
            }}
          />
          <Form.CheckBox
            name='isLock'
            checkboxSize='medium'
          >
            Content will not be changed when data is modified
          </Form.CheckBox>
          <div className='flex flex-row flex-nowrap gap-4 justify-end mt-4'>
            <Button
              _type='secondary'
              onClick={modal.hide}
            >
              Cancel
            </Button>
            <Button>Save</Button>
          </div>
        </form>
      </FormProvider>
    </Modal>
  );
};

export default InsertVariableModal;
