import { FlowChart } from '@/components';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/flow')({
  component: Flow,
});

function Flow() {
  return <FlowChart />;
}
