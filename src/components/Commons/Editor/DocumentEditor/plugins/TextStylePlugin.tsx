import { BoldIcon, ItalicIcon, StrikeIcon, UnderlineIcon } from '@/components/Icons';
import React, { useMemo } from 'react';
import { StyledButtonView } from '../styled';
import { useCurrentEditor } from '@tiptap/react';

export type TextStyle = 'bold' | 'italic' | 'underline' | 'strike';

const TextStylePlugin = ({ style }: { style: TextStyle }) => {
  const { editor } = useCurrentEditor();
  if (!editor) return null;

  const styleConfigs = useMemo(
    () => ({
      bold: {
        methodName: 'toggleBold',
        icon: <BoldIcon />,
      },
      italic: {
        methodName: 'toggleItalic',
        icon: <ItalicIcon />,
      },
      underline: {
        methodName: 'toggleUnderline',
        icon: <UnderlineIcon />,
      },
      strike: {
        methodName: 'toggleStrike',
        icon: <StrikeIcon />,
      },
    }),
    [],
  );

  const config = styleConfigs[style];

  return (
    <StyledButtonView
      onClick={() => editor.chain().focus()[config.methodName as 'toggleBold']?.().run()}
      disabled={!editor.can().chain().focus()[config.methodName as 'toggleBold']?.().run()}
      isActive={editor.isActive(style)}
    >
      {config.icon}
    </StyledButtonView>
  );
};

export default TextStylePlugin;
