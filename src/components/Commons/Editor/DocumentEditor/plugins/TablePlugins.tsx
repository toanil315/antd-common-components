import React from 'react';
import { StyledButtonView } from '../styled';
import { useCurrentEditor } from '@tiptap/react';
import { TableIcon } from '@/components/Icons';

export const InsertDefaultTablePlugin = () => {
  const { editor } = useCurrentEditor();
  if (!editor) return null;

  return (
    <StyledButtonView
      onClick={() =>
        editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
      }
    >
      <TableIcon />
    </StyledButtonView>
  );
};
