import React from 'react';
import { useFlowChartContext } from '../FlowChartProvider';
import { OverflowMenu } from '@/components/Commons';
import { MenuProps } from 'antd';

const FloatingDropdown = () => {
  const {
    mermaidData: { floatingPoint, selectedNodeId },
    actions: { setFloatingPoint, setSelectedNodeId, startCreateEdge, deleteNode },
  } = useFlowChartContext();

  const menuItems: MenuProps['items'] = [
    {
      key: 'link-to',
      label: 'Link To',
      onClick: startCreateEdge,
    },
    {
      key: 'delete-node',
      label: 'Delete Node',
      onClick: () => selectedNodeId && deleteNode(selectedNodeId),
    },
  ];

  if (floatingPoint) {
    return (
      <OverflowMenu
        arrow={false}
        trigger={['click']}
        menu={{
          items: menuItems,
        }}
        open={true}
        onOpenChange={(open) => {
          if (!open) {
            setFloatingPoint(null);
            setSelectedNodeId(null);
          }
        }}
      >
        <div
          className={`w-[1px] h-[1px] bg-transparent fixed z-50`}
          style={{
            top: floatingPoint.y,
            left: floatingPoint.x,
          }}
        />
      </OverflowMenu>
    );
  }

  return null;
};

export default FloatingDropdown;
