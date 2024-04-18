import { Button } from '@/components/Commons/Button';
import { Modal } from '@/components/Commons/Modal';
import Form from '@/components/Form';
import { useModal } from '@/hooks';
import { useCurrentEditor } from '@tiptap/react';
import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { StyledLinkPropsForm } from './styled';

interface LinkProps {
  url: string;
  target: string;
}

interface Props {
  modal: ReturnType<typeof useModal>;
}

const LinkModal = ({ modal }: Props) => {
  const form = useForm({
    defaultValues: {
      url: '',
      target: '_blank',
    },
  });
  const { editor } = useCurrentEditor();

  useEffect(() => {
    if (editor) {
      const previousUrl = editor.getAttributes('link').href;
      const previousTarget = editor.getAttributes('link').target;

      if (previousUrl && previousTarget) {
        form.reset({
          url: previousUrl,
          target: previousTarget,
        });
      }
    }
  }, [editor]);

  const onSetLink = (values: LinkProps) => {
    if (!editor) return;

    if (!values.url) {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      modal.hide();
    }

    if (values.target && values.url) {
      editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: values.url, target: values.target })
        .run();
      modal.hide();
    }
  };

  return (
    <Modal
      modal={modal}
      title='Insert/Edit Link'
      footer={null}
    >
      <FormProvider {...form}>
        <StyledLinkPropsForm onSubmit={form.handleSubmit(onSetLink)}>
          <Form.Input
            name='url'
            label='Url'
          />
          <Form.Select
            label='Target'
            name='target'
            options={[
              { label: 'New window', value: '_blank' },
              { label: 'Current window', value: '_self' },
            ]}
          />
          <div className='user-controls'>
            <Button
              _type='secondary'
              onClick={modal.hide}
            >
              Cancel
            </Button>
            <Button>Submit</Button>
          </div>
        </StyledLinkPropsForm>
      </FormProvider>
    </Modal>
  );
};

export default LinkModal;
