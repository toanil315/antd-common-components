import FlowChartProvider from './FlowChartProvider';
import FlowChartArea from './components/FlowChartArea';
import FloatingDropdown from './components/FloatingDropdown';
import Shapes from './components/Shapes';
import NodeSetting from './components/NodeSettings';

const defaultData = `
graph LR;
node-123 -- text --> node-124;
node-125 --> node-123;
node-123 --> node-125;
%%node-123[Text]%%;
node-123[Text];
%%node-124{Text}%%;
node-124{Text};
%%node-125((Text))%%;
node-125((Text));
click node-123 callback;
click node-124 callback;
click node-125 callback;
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
