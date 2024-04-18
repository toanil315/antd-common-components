import React from 'react';
import { StyledButtonView } from '../styled';
import { OverflowMenu } from '@/components/Commons/OverflowMenu';
import { useCurrentEditor } from '@tiptap/react';
import { RedoIcon, SelectAllIcon, UndoIcon } from '@/components/Icons';

const EditMenu = () => {
  const { editor } = useCurrentEditor();
  if (!editor) return null;

  return (
    <OverflowMenu
      trigger={['click']}
      menu={{
        items: [
          {
            label: 'Undo',
            icon: <UndoIcon />,
            key: 'undo-document',
            disabled: !editor.can().chain().focus().undo().run(),
            onClick: () => editor.chain().focus().undo().run(),
          },
          {
            label: 'Redo',
            icon: <RedoIcon />,
            key: 'redo-document',
            disabled: !editor.can().chain().focus().redo().run(),
            onClick: () => editor.chain().focus().redo().run(),
          },
          {
            type: 'divider',
          },
          {
            label: 'Select All',
            icon: <SelectAllIcon />,
            key: 'select-all-document',
            onClick: () => editor.chain().focus().selectAll().run(),
          },
        ],
      }}
    >
      <StyledButtonView>Edit</StyledButtonView>
    </OverflowMenu>
  );
};

export default EditMenu;
