import { Link, Outlet, createFileRoute } from '@tanstack/react-router';
import React from 'react';
export const Route = createFileRoute('/_index')({
  component: RootLayout,
});

function RootLayout() {
  return (
    <div className='p-6 bg-slate-200 rounded-md h-screen w-screen'>
      <div className='p-2 flex gap-2'>
        <Link
          to='/'
          className='[&.active]:font-bold'
        >
          Home
        </Link>{' '}
        <Link
          to='/about'
          className='[&.active]:font-bold'
        >
          About
        </Link>{' '}
        <Link
          to='/posts'
          className='[&.active]:font-bold'
        >
          Posts
        </Link>
      </div>
      <hr />
      <Outlet />
    </div>
  );
}
