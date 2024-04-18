import { BubbleMenu, useCurrentEditor } from '@tiptap/react';
import React from 'react';
import { MenuBarSeparator, StyledTableBubbleMenu } from '../styled';
import { TablePluginFactory, TablePlugins } from '../plugins/TablePlugins';

const TableBubbleMenu = () => {
  const { editor } = useCurrentEditor();
  if (!editor) return null;

  return (
    <BubbleMenu
      editor={editor}
      shouldShow={() => editor.isActive('table')}
      tippyOptions={{
        placement: 'bottom-end',
      }}
    >
      <StyledTableBubbleMenu>
        {...[
          'deleteTable',
          'divider',
          // cell
          'mergeCells',
          'splitCell',
          'toggleHeaderCell',
          'divider',
          // row
          'addRowBefore',
          'addRowAfter',
          'deleteRow',
          'toggleHeaderRow',
          'divider',
          // column
          'addColumnBefore',
          'addColumnAfter',
          'deleteColumn',
          'toggleHeaderColumn',
        ].map((tablePlugin, index) =>
          tablePlugin !== 'divider' ? (
            <TablePluginFactory
              key={tablePlugin}
              plugin={tablePlugin as TablePlugins}
            />
          ) : (
            <MenuBarSeparator key={`divider-${index}`} />
          ),
        )}
      </StyledTableBubbleMenu>
    </BubbleMenu>
  );
};

export default TableBubbleMenu;
