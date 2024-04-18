import React from 'react';
import { StyledButtonView } from '../styled';
import { OverflowMenu } from '@/components/Commons/OverflowMenu';
import { useCurrentEditor } from '@tiptap/react';
import { BlankFileIcon, EyeIcon, PrintIcon } from '@/components/Icons';

const FileMenu = () => {
  const { editor } = useCurrentEditor();
  if (!editor) return null;

  return (
    <OverflowMenu
      trigger={['click']}
      menu={{
        items: [
          {
            label: 'New document',
            icon: <BlankFileIcon />,
            key: 'new-document',
            onClick: () => editor.commands.clearContent(),
          },
          {
            type: 'divider',
          },
          {
            label: 'Preview',
            icon: <EyeIcon />,
            key: 'preview-document',
            disabled: true,
          },
          {
            type: 'divider',
          },
          {
            label: 'Print',
            icon: <PrintIcon />,
            key: 'print-document',
            disabled: true,
          },
        ],
      }}
    >
      <StyledButtonView>File</StyledButtonView>
    </OverflowMenu>
  );
};

export default FileMenu;
