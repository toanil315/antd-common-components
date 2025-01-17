import { useCurrentEditor } from '@tiptap/react';
import { Select } from '@/components/Commons/Select';

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

const HeadingPlugin = () => {
  const { editor } = useCurrentEditor();
  if (!editor) return null;

  const options = [
    ...Array(6)
      .fill(0)
      .map((_, index) => ({ value: index + 1, label: `Heading ${index + 1}` })),
    {
      value: 0,
      label: 'Paragraph',
    },
  ];

  return (
    <Select
      selectSize='small'
      options={options}
      name='heading'
      onChange={(value) =>
        editor
          .chain()
          .focus()
          .unsetFontSize()
          .toggleHeading({ level: Number(value) as HeadingLevel })
          .run()
      }
      value={editor.getAttributes('heading').level ?? 0}
    />
  );
};

export default HeadingPlugin;
