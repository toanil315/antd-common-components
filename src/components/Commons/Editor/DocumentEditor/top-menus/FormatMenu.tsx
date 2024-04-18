import React from 'react';
import { StyledButtonView } from '../styled';
import { OverflowMenu } from '@/components/Commons/OverflowMenu';
import { useCurrentEditor } from '@tiptap/react';
import TextStylePlugin, { TextStyle } from '../plugins/TextStylePlugin';
import TextColorPlugin from '../plugins/TextColorPlugin';
import BgColorPlugin from '../plugins/BgColorPlugin';

const FormatMenu = () => {
  const { editor } = useCurrentEditor();
  if (!editor) return null;

  return (
    <OverflowMenu
      trigger={['click']}
      menu={{
        items: [
          ...['bold', 'italic', 'underline', 'strike', 'superscript', 'subscript'].map((style) => ({
            label: (
              <TextStylePlugin
                key={style}
                className='block w-full'
                style={style as TextStyle}
                label={style.charAt(0).toUpperCase() + style.slice(1)}
              />
            ),
            key: `format-${style}`,
          })),
          {
            type: 'divider',
          },
          {
            label: <TextColorPlugin label='Text color' />,
            key: 'format-text-color',
            disabled: true,
          },
          {
            label: <BgColorPlugin label='Background color' />,
            key: 'format-bg-color',
            disabled: true,
          },
        ],
        onClick: (e) => e.domEvent.currentTarget.querySelector('button')?.click(),
      }}
    >
      <StyledButtonView>Format</StyledButtonView>
    </OverflowMenu>
  );
};

export default FormatMenu;
