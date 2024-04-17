import React from 'react';
import { StyledButtonView } from '../styled';
import { useCurrentEditor } from '@tiptap/react';
import { useModal } from '@/hooks';
import { LinkIcon } from '@/components/Icons';
import LinkModal from '../modals/LinkModal/LinkModal';

const LinkPlugin = () => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  const linkModal = useModal();
  const handleSetLink = () => {
    const { state } = editor;
    const { selection, doc } = state;
    const selectionText = doc.textBetween(selection.from, selection.to);
    if (selectionText) linkModal.show();
  };

  return (
    <>
      <StyledButtonView
        onClick={handleSetLink}
        isActive={editor.isActive('link')}
      >
        <LinkIcon />
      </StyledButtonView>
      <LinkModal modal={linkModal} />
    </>
  );
};

export default LinkPlugin;
