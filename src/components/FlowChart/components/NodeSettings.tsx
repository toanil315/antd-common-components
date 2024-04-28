import { useFlowChartContext } from '../FlowChartProvider';
import { Input, Select } from '@/components/Commons';
import { MermaidNode, MermaidShape } from '@/hooks/useMermaid';

const NodeSetting = () => {
  const {
    mermaidData: { selectedNode },
    actions: { setNodeProps },
  } = useFlowChartContext();
  const handleContentChange = (value: string | number | undefined) => {
    const newNode = { ...selectedNode, text: value } as MermaidNode;
    setNodeProps(newNode);
  };

  const handleShapeChange = (shape: MermaidShape) => {
    const newNode = { ...selectedNode, shape } as MermaidNode;
    setNodeProps(newNode);
  };

  return (
    <div className='w-[300px] h-screen overflow-y-auto px-4 py-6 border-r border-solid border-gray-200  bg-white flex flex-col gap-6'>
      <h3 className='text-center mb-2'>Node Settings</h3>
      <Input
        label='Node Id'
        value={selectedNode?.id}
        readOnly
      />
      <Input
        label='Content'
        value={selectedNode?.text}
        onChange={handleContentChange as any}
      />
      <Select
        label='Shape'
        options={[
          { label: 'Rectangle', value: 'rect' },
          { label: 'Circle', value: 'circle' },
          { label: 'Diamond', value: 'diamond' },
        ]}
        value={selectedNode?.shape}
        name='shape'
        onChange={handleShapeChange as any}
      />
    </div>
  );
};

export default NodeSetting;
