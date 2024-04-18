import { useCurrentEditor } from '@tiptap/react';
import React from 'react';
import { StyledButtonView } from '../styled';
import { ColorPicker } from 'antd';

interface Props {
  label?: string;
}

const BgColorPlugin = ({ label }: Props) => {
  const { editor } = useCurrentEditor();

  if (!editor) return null;

  return (
    <StyledButtonView>
      {label}
      <ColorPicker
        onChange={(value) =>
          editor.chain().focus().toggleHighlight({ color: value.toRgbString() }).run()
        }
        value={editor.getAttributes('highlight').color || '#f7fafc'}
      />
    </StyledButtonView>
  );
};

export default BgColorPlugin;
