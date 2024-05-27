import { TOUR_QUERY_CONFIGS } from '@/hooks/useTour';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/tours/')({
  loader: ({ context }) => context.queryClient.ensureQueryData(TOUR_QUERY_CONFIGS.list),
});
