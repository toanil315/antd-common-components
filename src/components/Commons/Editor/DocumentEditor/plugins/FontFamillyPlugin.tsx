import { Select } from '@/components/Commons/Select';
import { useCurrentEditor } from '@tiptap/react';
import { Tooltip } from 'antd';
import React from 'react';

const FontFamillyPlugin = () => {
  const { editor } = useCurrentEditor();
  if (!editor) return null;

  return (
    <Select
      selectSize='small'
      name='font_familly'
      value={editor.getAttributes('textStyle').fontFamily ?? 'Inter'}
      onChange={(value) => editor.chain().focus().setFontFamily(value).run()}
      options={[
        'Inter',
        'Arial',
        'Georgia',
        'Lucida Console',
        'Tahoma',
        'Times New Roman',
        'Trebuchet MS',
        'Verdana',
        'Impact',
        'Comic Sans MS',
        'Helvetica',
      ].map((fontFamily) => ({
        label: (
          <Tooltip
            title={fontFamily}
            placement='left'
          >
            {fontFamily}
          </Tooltip>
        ),
        value: fontFamily,
      }))}
    />
  );
};

export default FontFamillyPlugin;
