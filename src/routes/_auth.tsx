import { Outlet, createFileRoute } from '@tanstack/react-router';
import React from 'react';
export const Route = createFileRoute('/_auth')({
  component: AuthLayout,
});

function AuthLayout() {
  return (
    <div className='p-6 bg-blue-200 rounded-md h-screen w-screen'>
      Auth Layout
      <Outlet />
    </div>
  );
}
