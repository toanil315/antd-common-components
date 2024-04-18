import React, { ReactNode, useMemo } from 'react';
import { StyledButtonView } from '../styled';
import { useCurrentEditor } from '@tiptap/react';
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
}

interface InsertTablePluginProps {
  rows?: number;
  cols?: number;
  withHeaderRow?: boolean;
}

const PluginWrapper = ({ children }: { children: (args: { editor: any }) => ReactNode }) => {
  const { editor } = useCurrentEditor();
  if (!editor) return null;

  if (!children) return null;

  return children({ editor });
};

export const TablePluginFactory = ({ plugin }: TablePluginFactoryProps) => {
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

export const InsertDefaultTablePlugin = ({ rows, cols, withHeaderRow }: InsertTablePluginProps) => {
  return (
    <PluginWrapper>
      {({ editor }) => (
        <StyledButtonView
          onClick={() =>
            editor
              .chain()
              .focus()
              .insertTable({ rows, cols, withHeaderRow: Boolean(withHeaderRow) })
              .run()
          }
        >
          <TableIcon />
        </StyledButtonView>
      )}
    </PluginWrapper>
  );
};
