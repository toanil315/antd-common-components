import React from 'react';
import { StyledButtonView } from '../styled';
import { useModal } from '@/hooks';
import ImageModal from '../modals/ImageModal/ImageModal';
import { ImageIcon } from '@/components/Icons';

const ImagePlugin = () => {
  const imageModal = useModal();

  return (
    <>
      <StyledButtonView onClick={imageModal.show}>
        <ImageIcon />
      </StyledButtonView>
      <ImageModal modal={imageModal} />
    </>
  );
};

export default ImagePlugin;
