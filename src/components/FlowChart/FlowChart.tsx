import { useMermaid } from '@/hooks/useMermaid';
import { OverflowMenu } from '../Commons';
import { MenuProps } from 'antd';

const FlowChart = () => {
  const {
    mermaidData: { data, floatingPoint, selectedNodeId },
    refs: { mermaidRef },
    actions: { addShape, startCreateEdge, deleteNode, setFloatingPoint, setSelectedNodeId },
  } = useMermaid({
    defaultData: `
    graph LR;
    A --> B;
    C --> A;
    A --> C;
    %%A[Text]%%;
    A[Text];
    %%B{Text}%%;
    B{Text};
    %%C((Text))%%;
    C((Text));
    click A callback;
  `,
  });

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

  return (
    <div>
      <div className='flex flex-row items-center gap-x-3'>
        <button onClick={() => addShape('rect')}>Add rect</button>
        <button onClick={() => addShape('diamond')}>Add diamond</button>
        <button onClick={() => addShape('circle')}>Add Circle</button>
      </div>
      <div className='relative'>
        <div
          ref={mermaidRef}
          className='mermaid'
        >
          {data}
        </div>
      </div>

      {floatingPoint && (
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
            className={`w-[1px] h-[1px] bg-transparent fixed z-50 top-[${floatingPoint.y}px] left-[${floatingPoint.x}px]`}
          />
        </OverflowMenu>
      )}
    </div>
  );
};

export default FlowChart;
