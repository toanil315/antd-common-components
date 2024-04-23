import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/_index/posts/$id/edit')({
  component: EditPost,
});

function EditPost() {
  const { id } = Route.useParams();
  return <div>Edit Post {id}</div>;
}
