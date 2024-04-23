import { Outlet, createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/_index/posts/$id')({
  component: PostDetail,
});

function PostDetail() {
  return <Outlet />;
}
