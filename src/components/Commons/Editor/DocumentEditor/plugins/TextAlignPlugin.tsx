import React, { useMemo } from 'react';
import { StyledButtonView } from '../styled';
import { useCurrentEditor } from '@tiptap/react';
import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
} from '@/components/Icons';

export type TextAlignment = 'left' | 'center' | 'right' | 'justify';

const TextAlignPlugin = ({ align }: { align: TextAlignment }) => {
  const { editor } = useCurrentEditor();
  if (!editor) return null;

  const alignConfigs = useMemo(
    () => ({
      left: {
        icon: <AlignLeftIcon />,
      },
      center: {
        icon: <AlignCenterIcon />,
      },
      right: {
        icon: <AlignRightIcon />,
      },
      justify: {
        icon: <AlignJustifyIcon />,
      },
    }),
    [],
  );

  const config = alignConfigs[align];

  return (
    <StyledButtonView
      onClick={() => editor.chain().focus().setTextAlign(align).run()}
      isActive={editor.isActive({ textAlign: align })}
      className='block w-full'
    >
      {config.icon} Align {align}
    </StyledButtonView>
  );
};

export default TextAlignPlugin;
