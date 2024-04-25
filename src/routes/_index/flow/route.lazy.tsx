import { FlowChart } from '@/components';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/_index/flow')({
  component: Flow,
});

function Flow() {
  return <FlowChart />;
}
