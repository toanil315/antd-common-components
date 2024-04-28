import { CircleIcon, DiamondIcon, RectIcon } from '@/components/Icons';
import React from 'react';
import { useFlowChartContext } from '../FlowChartProvider';
import { MermaidShape } from '@/hooks/useMermaid';

const shapes = [
  {
    type: 'rect',
    icon: <RectIcon />,
  },
  {
    type: 'diamond',
    icon: <DiamondIcon />,
  },
  {
    type: 'circle',
    icon: <CircleIcon />,
  },
];

const Shapes = () => {
  const {
    actions: { addShape },
  } = useFlowChartContext();

  return (
    <div className=' w-max px-2 py-4 rounded-lg bg-gray-50 z-50 flex flex-col gap-7'>
      {shapes.map((shape) => (
        <div
          key={shape.type}
          onClick={() => addShape(shape.type as MermaidShape)}
          className={`w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer hover:bg-gray-300`}
        >
          {shape.icon}
        </div>
      ))}
    </div>
  );
};

export default Shapes;
