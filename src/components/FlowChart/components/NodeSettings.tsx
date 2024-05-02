import { useFlowChartContext } from '../FlowChartProvider';
import { Input, Select } from '@/components/Commons';
import Label from '@/components/Commons/Input/Label';
import { MermaidNode, MermaidShape } from '@/hooks/useMermaid';
import { ColorPicker } from 'antd';
import { Color } from 'antd/es/color-picker';

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

  const handleColorsChange = (key: string) => (value: Color) => {
    const newNode = {
      ...selectedNode,
      styles: {
        ...selectedNode?.styles,
        [key]: value.toHexString(),
      },
    } as MermaidNode;
    setNodeProps(newNode);
  };

  const handleBorderWidthChange = (value = 0) => {
    console.log('handleBorderWidthChange -> value', value);
    const newNode = {
      ...selectedNode,
      styles: {
        ...selectedNode?.styles,
        'stroke-width': value,
      },
    } as MermaidNode;
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
      <hr />
      <h3 className='text-center mb-2'>Node Settings</h3>
      <div className='flex flex-row items-center justify-between'>
        <Label label='Text Color:' />
        <ColorPicker
          key={selectedNode?.styles?.stroke}
          value={selectedNode?.styles?.color}
          showText
          onChange={handleColorsChange('color')}
        />
      </div>
      <div className='flex flex-row items-center justify-between'>
        <Label label='Background Color:' />
        <ColorPicker
          key={selectedNode?.styles?.stroke}
          value={selectedNode?.styles?.fill}
          showText
          onChange={handleColorsChange('fill')}
        />
      </div>
      <div className='flex flex-row items-center justify-between'>
        <Label label='Border Color:' />
        <ColorPicker
          key={selectedNode?.styles?.stroke}
          value={selectedNode?.styles?.stroke}
          showText
          onChange={handleColorsChange('stroke')}
        />
      </div>
      <Input
        label='Border Width:'
        type='number'
        value={selectedNode?.styles?.['stroke-width']}
        onChange={handleBorderWidthChange as any}
      />
    </div>
  );
};

export default NodeSetting;
