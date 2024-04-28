import { useMermaid } from '@/hooks/useMermaid';
import { createContext, useContext } from 'react';

const FlowChartContext = createContext<ReturnType<typeof useMermaid> | null>(null);

export const useFlowChartContext = () => {
  const context = useContext(FlowChartContext);
  if (!context) {
    throw new Error('useFlowChartContext must be used within a FlowChartProvider');
  }
  return context;
};

interface Props {
  children: React.ReactNode;
  data: string;
}

const FlowChartProvider = ({ data, children }: Props) => {
  const flowChartData = useMermaid({ defaultData: data });
  return <FlowChartContext.Provider value={flowChartData}>{children}</FlowChartContext.Provider>;
};

export default FlowChartProvider;
