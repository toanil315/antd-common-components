import {
  BoldIcon,
  ItalicIcon,
  StrikeIcon,
  SuperscriptIcon,
  UnderlineIcon,
} from '@/components/Icons';
import React, { useMemo } from 'react';
import { StyledButtonView } from '../styled';
import { useCurrentEditor } from '@tiptap/react';

export type TextStyle = 'bold' | 'italic' | 'underline' | 'strike' | 'superscript' | 'subscript';

interface Props {
  label?: string;
  style: TextStyle;
  className?: string;
}

const TextStylePlugin = ({ style, label, className }: Props) => {
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
      superscript: {
        methodName: 'toggleSuperscript',
        icon: <SuperscriptIcon />,
      },
      subscript: {
        methodName: 'toggleSubscript',
        icon: <SuperscriptIcon />,
      },
    }),
    [],
  );

  const config = styleConfigs[style];

  return (
    <StyledButtonView
      onClick={(e) => {
        e.stopPropagation();
        editor.chain().focus()[config.methodName as 'toggleBold']?.().run();
      }}
      disabled={!editor.can().chain().focus()[config.methodName as 'toggleBold']?.().run()}
      isActive={editor.isActive(style)}
      className={className}
    >
      {config.icon} {label}
    </StyledButtonView>
  );
};

export default TextStylePlugin;
