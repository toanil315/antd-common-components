import { BulletListIcon, OrderedListIcon } from '@/components/Icons';
import { useCurrentEditor } from '@tiptap/react';
import React, { useMemo } from 'react';
import { StyledButtonView } from '../styled';

export type ListType = 'ordered' | 'bullet';

const ListPlugin = ({ type }: { type: ListType }) => {
  const { editor } = useCurrentEditor();
  if (!editor) return null;

  const listConfigs = useMemo(
    () => ({
      ordered: {
        icon: <OrderedListIcon />,
        methodName: 'toggleOrderedList',
      },
      bullet: {
        icon: <BulletListIcon />,
        methodName: 'toggleBulletList',
      },
    }),
    [],
  );

  const config = listConfigs[type];

  return (
    <StyledButtonView
      onClick={() => editor.chain().focus()[config.methodName as 'toggleBulletList']?.().run()}
      isActive={editor.isActive(`${type}List`)}
      className='pointer-events-none block w-full'
    >
      {config.icon} {type === 'ordered' ? 'Ordered' : 'Bullet'} List
    </StyledButtonView>
  );
};

export default ListPlugin;
