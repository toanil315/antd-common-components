import React from 'react';
import { StyledButtonView } from '../styled';
import { useCurrentEditor } from '@tiptap/react';

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

const HeadingPlugin = ({ level }: { level: HeadingLevel }) => {
  const { editor } = useCurrentEditor();
  if (!editor) return null;

  return (
    <StyledButtonView
      onClick={() => editor.chain().focus().unsetFontSize().toggleHeading({ level }).run()}
      isActive={editor.isActive('heading', { level })}
    >
      H{level}
    </StyledButtonView>
  );
};

export default HeadingPlugin;
