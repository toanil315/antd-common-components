import { Outlet, createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/_index/posts')({
  component: Posts,
});

function Posts() {
  return <Outlet />;
}
