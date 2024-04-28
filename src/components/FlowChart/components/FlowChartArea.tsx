import React from 'react';
import { useFlowChartContext } from '../FlowChartProvider';
import CreatingEdgeInform from './CreatingEdgeInform';

const FlowChartArea = () => {
  const {
    mermaidData: { data },
    refs: { mermaidRef },
  } = useFlowChartContext();

  return (
    <div className='relative h-screen ml-2 flex-grow bg-gray-50 flex justify-center items-center'>
      <div
        ref={mermaidRef}
        className='mermaid relative z-50'
      >
        {data}
      </div>
      <CreatingEdgeInform />
    </div>
  );
};

export default FlowChartArea;
