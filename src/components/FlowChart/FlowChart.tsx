import FlowChartProvider from './FlowChartProvider';
import FlowChartArea from './components/FlowChartArea';
import FloatingDropdown from './components/FloatingDropdown';
import Shapes from './components/Shapes';
import NodeSetting from './components/NodeSettings';

const defaultData = `
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
`;

const FlowChart = () => {
  return (
    <FlowChartProvider data={defaultData}>
      <div className='flex flex-row flex-nowrap items-center'>
        <Shapes />
        <FlowChartArea />
        <NodeSetting />
        <FloatingDropdown />
      </div>
    </FlowChartProvider>
  );
};

export default FlowChart;
