import React from 'react';
import { StyledButtonView } from '../styled';
import { HorizontalLineIcon } from '@/components/Icons';
import { useCurrentEditor } from '@tiptap/react';

interface Props {
  label?: string;
}

const HorizontalPlugin = ({ label }: Props) => {
  const { editor } = useCurrentEditor();
  if (!editor) return null;

  return (
    <StyledButtonView
      onClick={() => editor.chain().focus().setHorizontalRule().run()}
      className='block w-full'
    >
      <HorizontalLineIcon /> {label}
    </StyledButtonView>
  );
};

export default HorizontalPlugin;
