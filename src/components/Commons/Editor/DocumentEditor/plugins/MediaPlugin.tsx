import { useModal } from '@/hooks';
import React from 'react';
import { StyledButtonView } from '../styled';
import { MediaIcon } from '@/components/Icons';
import MediaModal from '../modals/MediaModal/MediaModal';

const MediaPlugin = () => {
  const mediaModal = useModal();

  return (
    <>
      <StyledButtonView onClick={mediaModal.show}>
        <MediaIcon />
      </StyledButtonView>
      <MediaModal modal={mediaModal} />
    </>
  );
};

export default MediaPlugin;
