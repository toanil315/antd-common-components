import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/_auth/login')({
  component: Login,
});

function Login() {
  return <div className='p-2'>Login</div>;
}
