import { useCurrentEditor } from '@tiptap/react';
import { useEffect } from 'react';

interface Props {
  value?: string;
}

const EditorContentManager = ({ value }: Props) => {
  const { editor } = useCurrentEditor();

  useEffect(() => {
    if (editor && value && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [editor, value]);

  console.log('editor', editor?.getJSON());

  return null;
};

export default EditorContentManager;
