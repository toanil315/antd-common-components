import { useCurrentEditor } from '@tiptap/react';
import React from 'react';
import { StyledButtonView } from '../styled';
import { ColorPicker } from 'antd';

interface Props {
  label?: string;
}

const TextColorPlugin = ({ label }: Props) => {
  const { editor } = useCurrentEditor();

  if (!editor) return null;

  return (
    <StyledButtonView>
      {label}
      <ColorPicker
        onChange={(value) => editor.chain().focus().setColor(value.toRgbString()).run()}
        value={editor.getAttributes('textStyle').color || 'black'}
      />
    </StyledButtonView>
  );
};

export default TextColorPlugin;
