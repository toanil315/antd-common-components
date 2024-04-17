import { Modal } from '@/components/Commons/Modal';
import { useModal } from '@/hooks';
import { useCurrentEditor } from '@tiptap/react';
import { FormProvider, useForm } from 'react-hook-form';
import { Button } from '@/components/Commons/Button';
import { Tabs, TabsProps } from 'antd';
import EnterSrcImageForm from './EnterSrcImageForm';
import UploadImageForm from './UploadImageForm';
import { useEffect } from 'react';

interface ImageProps {
  src: string;
  alt: string;
}

interface Props {
  modal: ReturnType<typeof useModal>;
}

const ImageModal = ({ modal }: Props) => {
  const { editor } = useCurrentEditor();
  if (!editor) return null;

  const form = useForm({
    defaultValues: {
      src: '',
      alt: '',
    },
  });

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'General',
      children: <EnterSrcImageForm />,
    },
    {
      key: '2',
      label: 'Upload',
      children: <UploadImageForm />,
    },
  ];

  useEffect(() => {
    form.reset({});
  }, [modal.isOpen]);

  const onSetImage = (values: ImageProps) => {
    if (!editor) return;

    const { src, alt } = values;

    if (!src) modal.hide();

    if (src) {
      editor.chain().focus().setImage({ src, alt }).run();
      modal.hide();
    }
  };

  return (
    <Modal
      modal={modal}
      title='Insert Image'
      footer={null}
    >
      <FormProvider {...form}>
        <Tabs items={items} />
        <div className='mt-3 flex flex-row gap-3 justify-end'>
          <Button
            _type='secondary'
            onClick={modal.hide}
          >
            Cancel
          </Button>
          <Button onClick={form.handleSubmit(onSetImage)}>Submit</Button>
        </div>
      </FormProvider>
    </Modal>
  );
};

export default ImageModal;
