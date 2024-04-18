import React from 'react';
import { StyledButtonView } from '../styled';
import { useModal } from '@/hooks';
import ImageModal from '../modals/ImageModal/ImageModal';
import { ImageIcon } from '@/components/Icons';

interface Props {
  label?: string;
}

const ImagePlugin = ({ label }: Props) => {
  const imageModal = useModal();

  return (
    <>
      <StyledButtonView onClick={imageModal.show}>
        <ImageIcon /> {label}
      </StyledButtonView>
      <ImageModal modal={imageModal} />
    </>
  );
};

export default ImagePlugin;
