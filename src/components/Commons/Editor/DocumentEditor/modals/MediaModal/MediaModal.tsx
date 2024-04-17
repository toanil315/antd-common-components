import { Button } from '@/components/Commons/Button';
import { Modal } from '@/components/Commons/Modal';
import Form from '@/components/Form';
import { useModal } from '@/hooks';
import { useCurrentEditor } from '@tiptap/react';
import { Col, Row } from 'antd';
import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

interface MediaProps {
  url: string;
  width: number;
  height: number;
}

interface Props {
  modal: ReturnType<typeof useModal>;
}

const defaultMediaProps = {
  url: '',
  width: 640,
  height: 480,
};

const MediaModal = ({ modal }: Props) => {
  const { editor } = useCurrentEditor();
  if (!editor) return null;

  const form = useForm({
    defaultValues: defaultMediaProps,
  });

  useEffect(() => {
    if (modal.isOpen) {
      form.reset(defaultMediaProps);
    }
  }, [modal.isOpen]);

  const onSetMedia = ({ url, width, height }: MediaProps) => {
    if (!editor) return;

    if (!url) {
      modal.hide();
    }

    if (url) {
      editor.commands.setYoutubeVideo({
        src: url,
        width,
        height,
      });
      modal.hide();
    }
  };

  return (
    <Modal
      modal={modal}
      title='Insert Media'
      footer={null}
    >
      <FormProvider {...form}>
        <Row gutter={[12, 12]}>
          <Col span={24}>
            <Form.Input
              name='url'
              label='Url'
            />
          </Col>
          <Col span={12}>
            <Form.Input
              name='width'
              label='Width'
              type='number'
            />
          </Col>
          <Col span={12}>
            <Form.Input
              name='height'
              label='height'
              type='number'
            />
          </Col>
          <Col span={24}>
            <div className='flex flex-row flex-nowrap justify-end gap-3'>
              <Button
                _type='secondary'
                onClick={modal.hide}
              >
                Cancel
              </Button>
              <Button onClick={form.handleSubmit(onSetMedia)}>Submit</Button>
            </div>
          </Col>
        </Row>
      </FormProvider>
    </Modal>
  );
};

export default MediaModal;
