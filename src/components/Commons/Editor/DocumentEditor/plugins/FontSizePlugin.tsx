import { Input } from '@/components/Commons/Input';
import { useCurrentEditor } from '@tiptap/react';
import React, { useEffect, useRef, useState } from 'react';

const BASE_FONT_SIZE = 16;
const HEADING_FONT_SIZES = [32, 24, 18.72, 16, 13.28, 10.72];

const FontSizePlugin = () => {
  const { editor } = useCurrentEditor();
  if (!editor) return null;

  const [fontSize, setFontSize] = useState(BASE_FONT_SIZE);
  const debounceRef = React.useRef<NodeJS.Timeout | null>(null);
  const isFontSizeInputTriggeredRef = useRef(false);
  const isHeadingSelected = editor.isActive('heading');
  const headingLevel = editor.getAttributes('heading').level;

  useEffect(() => {
    const defaultFontSize = String(BASE_FONT_SIZE);
    setFontSize(
      Number((editor.getAttributes('textStyle').fontSize ?? defaultFontSize).replace('px', '')),
    );
  }, [editor.state.selection]);

  useEffect(() => {
    const isHeadingSelected = editor.isActive('heading');
    if (fontSize && !isHeadingSelected && isFontSizeInputTriggeredRef.current) {
      handleSizeChange(fontSize);
    }
  }, [fontSize, editor.state.selection]);

  const handleSizeChange = (value: string | number | undefined) => {
    if (isHeadingSelected && debounceRef.current) {
      clearTimeout(debounceRef.current);
      return;
    }

    if (value) {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        editor.chain().focus().setFontSize(`${value}px`).run();
        isFontSizeInputTriggeredRef.current = false;
      }, 500);
    }
  };

  return (
    <Input
      type='number'
      inputSize={'small'}
      value={isHeadingSelected ? HEADING_FONT_SIZES[headingLevel - 1] : fontSize}
      onChange={(value) => {
        setFontSize(Number(value));
        isFontSizeInputTriggeredRef.current = true;
      }}
      suffix='px'
      suffixPosition='right'
      readOnly={isHeadingSelected}
    />
  );
};

export default FontSizePlugin;
