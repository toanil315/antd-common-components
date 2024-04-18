import React from 'react';
import { StyledButtonView } from '../styled';
import { OverflowMenu } from '@/components/Commons/OverflowMenu';
import { useCurrentEditor } from '@tiptap/react';
import ImagePlugin from '../plugins/ImagePlugin';
import LinkPlugin from '../plugins/LinkPlugin';
import MediaPlugin from '../plugins/MediaPlugin';
import HorizontalPlugin from '../plugins/HorizontalLinePlugin';

const InsertMenu = () => {
  const { editor } = useCurrentEditor();
  if (!editor) return null;

  return (
    <OverflowMenu
      trigger={['click']}
      menu={{
        items: [
          {
            label: <ImagePlugin label='Image' />,
            key: 'insert-image',
          },
          {
            label: <LinkPlugin label='Link' />,
            key: 'insert-link',
          },
          {
            label: <MediaPlugin label='Media' />,
            key: 'insert-media',
          },
          {
            type: 'divider',
          },
          {
            label: <HorizontalPlugin label='Horizontal line' />,
            key: 'insert-horizontal-line',
          },
        ],
        onClick: (e) => e.domEvent.currentTarget.querySelector('button')?.click(),
      }}
    >
      <StyledButtonView>Insert</StyledButtonView>
    </OverflowMenu>
  );
};

export default InsertMenu;
