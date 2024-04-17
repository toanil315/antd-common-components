import Form from '@/components/Form';
import React from 'react';
import { StyledImagePropsForm } from './styled';

const EnterSrcImageForm = () => {
  return (
    <StyledImagePropsForm>
      <Form.Input
        name='src'
        label='Source image'
      />
      <Form.Input
        name='alt'
        label='Alternate'
      />
    </StyledImagePropsForm>
  );
};

export default EnterSrcImageForm;
