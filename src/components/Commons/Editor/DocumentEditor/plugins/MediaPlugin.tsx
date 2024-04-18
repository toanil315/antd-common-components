import { useModal } from '@/hooks';
import React from 'react';
import { StyledButtonView } from '../styled';
import { MediaIcon } from '@/components/Icons';
import MediaModal from '../modals/MediaModal/MediaModal';

interface Props {
  label?: string;
}

const MediaPlugin = ({ label }: Props) => {
  const mediaModal = useModal();

  return (
    <>
      <StyledButtonView onClick={mediaModal.show}>
        <MediaIcon /> {label}
      </StyledButtonView>
      <MediaModal modal={mediaModal} />
    </>
  );
};

export default MediaPlugin;
