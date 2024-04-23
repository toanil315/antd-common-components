import { Link, createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/_index/posts/$id/')({
  component: PostDetail,
});

function PostDetail() {
  const { id } = Route.useParams();
  return <Link to='/posts/$id/edit'>Post {id}</Link>;
}
