import React, { ReactNode, useMemo } from 'react';
import { StyledButtonView } from '../styled';
import { Editor, useCurrentEditor } from '@tiptap/react';
import {
  DeleteColumnIcon,
  DeleteRowIcon,
  DeleteTableIcon,
  InsertColumnAfterIcon,
  InsertColumnBeforeIcon,
  InsertRowAfterIcon,
  InsertRowBeforeIcon,
  MergeCellIcon,
  SplitCellIcon,
  TableIcon,
  ToggleHeaderCellIcon,
  ToggleHeaderIcon,
} from '@/components/Icons';
import { Tooltip } from 'antd';
import { Popover } from '@/components/Commons/Popover';
import SelectTableSizePopup, {
  CellPosition,
} from '../popups/SelectTableSizePopup/SelectTableSizePopup';

export type TablePlugins =
  | 'addColumnBefore'
  | 'addColumnAfter'
  | 'deleteColumn'
  | 'addRowBefore'
  | 'addRowAfter'
  | 'deleteRow'
  | 'deleteTable'
  | 'mergeCells'
  | 'splitCell'
  | 'toggleHeaderColumn'
  | 'toggleHeaderRow'
  | 'toggleHeaderCell';

interface TablePluginFactoryProps {
  plugin: TablePlugins;
  inView?: boolean;
}

const PluginWrapper = ({ children }: { children: (args: { editor: any }) => ReactNode }) => {
  const { editor } = useCurrentEditor();
  if (!editor) return null;

  if (!children) return null;

  return children({ editor });
};

export const TablePluginFactory = ({ plugin, inView }: TablePluginFactoryProps) => {
  const tableConfigs = useMemo(() => {
    return {
      addColumnBefore: {
        methodName: 'addColumnBefore',
        icon: <InsertColumnBeforeIcon />,
        tooltip: 'Add column before',
      },
      addColumnAfter: {
        methodName: 'addColumnAfter',
        icon: <InsertColumnAfterIcon />,
        tooltip: 'Add column after',
      },
      deleteColumn: {
        methodName: 'deleteColumn',
        icon: <DeleteColumnIcon />,
        tooltip: 'Delete column',
      },
      addRowBefore: {
        methodName: 'addRowBefore',
        icon: <InsertRowBeforeIcon />,
        tooltip: 'Add row before',
      },
      addRowAfter: {
        methodName: 'addRowAfter',
        icon: <InsertRowAfterIcon />,
        tooltip: 'Add row after',
      },
      deleteRow: {
        methodName: 'deleteRow',
        icon: <DeleteRowIcon />,
        tooltip: 'Delete row',
      },
      deleteTable: {
        methodName: 'deleteTable',
        icon: <DeleteTableIcon />,
        tooltip: 'Delete table',
      },
      mergeCells: {
        methodName: 'mergeCells',
        icon: <MergeCellIcon />,
        tooltip: 'Merge cells',
      },
      splitCell: {
        methodName: 'splitCell',
        icon: <SplitCellIcon />,
        tooltip: 'Split cell',
      },
      toggleHeaderRow: {
        methodName: 'toggleHeaderRow',
        icon: <ToggleHeaderIcon />,
        tooltip: 'Toggle header row',
      },
      toggleHeaderColumn: {
        methodName: 'toggleHeaderColumn',
        icon: (
          <div className='rotate-90'>
            <ToggleHeaderIcon />
          </div>
        ),
        tooltip: 'Toggle header column',
      },
      toggleHeaderCell: {
        methodName: 'toggleHeaderCell',
        icon: <ToggleHeaderCellIcon />,
        tooltip: 'Toggle header cell',
      },
    };
  }, []);

  const config = tableConfigs[plugin];

  return (
    <PluginWrapper>
      {({ editor }) => (
        <Tooltip
          title={config.tooltip}
          zIndex={9999}
          {...(!inView ? { open: false } : {})}
        >
          <StyledButtonView
            onClick={() => editor.chain().focus()[config.methodName]?.().run()}
            disabled={!editor.can()[config.methodName]()}
          >
            {config.icon}
          </StyledButtonView>
        </Tooltip>
      )}
    </PluginWrapper>
  );
};

export const InsertDefaultTablePlugin = () => {
  const [sizePopupOpen, setSizePopupOpen] = React.useState(false);

  const handleCellClick =
    (editor: Editor) =>
    ({ x, y }: CellPosition) => {
      editor.chain().focus().insertTable({ rows: x, cols: y, withHeaderRow: true }).run();
      setSizePopupOpen(false);
    };

  return (
    <PluginWrapper>
      {({ editor }) => (
        <Popover
          open={sizePopupOpen}
          onOpenChange={setSizePopupOpen}
          destroyTooltipOnHide
          trigger={'click'}
          content={<SelectTableSizePopup onCellClick={handleCellClick(editor)} />}
        >
          <StyledButtonView>
            <TableIcon />
          </StyledButtonView>
        </Popover>
      )}
    </PluginWrapper>
  );
};
