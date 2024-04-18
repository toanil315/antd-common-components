import React from 'react';
import { StyledButtonView } from '../styled';
import { OverflowMenu } from '@/components/Commons/OverflowMenu';
import { useCurrentEditor } from '@tiptap/react';
import { EyeIcon } from '@/components/Icons';

const ViewMenu = () => {
  const { editor } = useCurrentEditor();
  if (!editor) return null;

  return (
    <OverflowMenu
      trigger={['click']}
      menu={{
        items: [
          {
            label: 'Preview',
            icon: <EyeIcon />,
            key: 'preview-document',
            disabled: true,
          },
        ],
      }}
    >
      <StyledButtonView>View</StyledButtonView>
    </OverflowMenu>
  );
};

export default ViewMenu;
