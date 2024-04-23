import { Link, createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/_index/posts/')({
  component: Posts,
});

function Posts() {
  return (
    <div className='p-2'>
      Hello from Posts!
      <Link
        to={'/posts/$postId'}
        params={{ postId: 1 }}
      >
        Post 1
      </Link>
    </div>
  );
}
