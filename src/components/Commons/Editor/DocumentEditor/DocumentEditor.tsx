import { Color } from '@tiptap/extension-color';
import ListItem from '@tiptap/extension-list-item';
import TextStyle, { TextStyleOptions } from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import Image from '@tiptap/extension-image';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import Youtube from '@tiptap/extension-youtube';
import FontFamily from '@tiptap/extension-font-family';
import FontSize from 'tiptap-extension-font-size';
import Highlight from '@tiptap/extension-highlight';
import Superscript from '@tiptap/extension-superscript';
import Subscript from '@tiptap/extension-subscript';
import { EditorProvider } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { StyledDocumentEditor } from './styled';
import MenuBar from './MenuBar';
import BubbleMenu from '@tiptap/extension-bubble-menu';
import TableBubbleMenu from './bubble-menus/TableBubbleMenu';
import EditorContentManager from './EditorContentManager';
import Placeholder from '@tiptap/extension-placeholder';
import AutoJoiner from 'tiptap-extension-auto-joiner';
import GlobalDragHandle from 'tiptap-extension-global-drag-handle';

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name, 'textStyle'] }),
  TextStyle.configure({ types: [ListItem.name] } as Partial<TextStyleOptions>),
  TextAlign.configure({
    types: ['heading', 'paragraph', 'ordered-list', 'bullet-list'],
  }),
  Underline,
  Link.configure({
    autolink: true,
  }),
  Image,
  Table.configure({
    resizable: true,
  }),
  TableRow,
  TableHeader,
  TableCell,
  Youtube,
  FontFamily.configure({
    types: ['textStyle'],
  }),
  FontSize.configure({
    types: ['textStyle'],
  }),
  Highlight.configure({
    multicolor: true,
  }),
  Superscript,
  Subscript,
  BubbleMenu,
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
  }),
  Placeholder.configure({
    placeholder: 'Write something...',
    includeChildren: true,
  }),
  AutoJoiner,
  GlobalDragHandle,
];

interface Props {
  value?: string;
  onChange?: (value: string) => void;
}

export default ({ value, onChange }: Props) => {
  return (
    <StyledDocumentEditor>
      <EditorProvider
        content={value}
        slotBefore={<MenuBar />}
        extensions={extensions}
        onUpdate={({ editor }) => onChange && onChange(editor.getHTML())}
      >
        <TableBubbleMenu />
        <EditorContentManager value={value} />
      </EditorProvider>
    </StyledDocumentEditor>
  );
};
