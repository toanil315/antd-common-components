import { UPLOADER_ENUM } from '@/components/Commons/FileUploader/FileUploader';
import Form from '@/components/Form';
import { StyledImagePropsForm } from './styled';

const UploadImageForm = () => {
  return (
    <StyledImagePropsForm>
      <Form.FileUploader
        label='Source image'
        required
        name='src'
        componentType={UPLOADER_ENUM.BROWSE_AREA}
      />
      <Form.Input
        name='alt'
        label='Alternate'
      />
    </StyledImagePropsForm>
  );
};

export default UploadImageForm;
