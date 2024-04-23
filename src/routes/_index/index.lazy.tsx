import { MceEditor } from '@/components';
import { createLazyFileRoute } from '@tanstack/react-router';
import { useState } from 'react';

export const Route = createLazyFileRoute('/_index/')({
  component: Index,
});

function Index() {
  const [value, setValue] = useState('');

  console.log(value);

  return (
    <div className='p-2'>
      <div className='w-[600px] mx-auto'>
        <MceEditor
          hasVariables
          value={value}
          onChange={setValue}
        />
      </div>
    </div>
  );
}
