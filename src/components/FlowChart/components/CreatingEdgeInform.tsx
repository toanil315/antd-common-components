import React from 'react';
import { useFlowChartContext } from '../FlowChartProvider';
import { Button } from '@/components/Commons';

const CreatingEdgeInform = () => {
  const {
    mermaidData: { isConnecting, pendingEdge },
    actions: { cancelCreateEdge },
  } = useFlowChartContext();
  const isCreatingEdge = isConnecting && pendingEdge;

  return (
    isCreatingEdge && (
      <>
        <div className='absolute left-1/2 -translate-x-1/2 top-24 flex flex-col items-center gap-2 text-center p-6 rounded-md bg-white shadow-md z-50'>
          <h3 className='mb-0'>Creating Edge...</h3>
          <span>Click the node you want connect to</span>
          <Button
            _type='danger_primary'
            onClick={cancelCreateEdge}
            className='mt-2'
          >
            Cancel
          </Button>
        </div>
        <div
          onClick={cancelCreateEdge}
          className='fixed bg-gray-900 opacity-50 top-0 left-0 w-screen h-screen'
        />
      </>
    )
  );
};

export default CreatingEdgeInform;
