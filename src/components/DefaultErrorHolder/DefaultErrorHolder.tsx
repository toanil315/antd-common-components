import { RESPONSE_STATUS_ENUM } from '@/constants';
import React from 'react';

interface Props {
  error: any;
}

const DefaultErrorHolder = ({ error }: Props) => {
  switch ((error as any)?.status) {
    case RESPONSE_STATUS_ENUM.NOT_FOUND: {
      return (
        <div className=' max-w-md my-0 mx-auto'>
          <img
            src='https://res.cloudinary.com/toanil315/image/upload/v1709740084/404_Error_Page_not_Found_with_people_connecting_a_plug-bro_uo2fxa.png'
            alt='error'
          />
        </div>
      );
    }

    case RESPONSE_STATUS_ENUM.INTERNAL_SERVER_ERROR: {
      return (
        <div className=' max-w-md my-0 mx-auto'>
          <img
            src='https://res.cloudinary.com/toanil315/image/upload/v1709740084/404_Error_Page_not_Found_with_people_connecting_a_plug-bro_uo2fxa.png'
            alt='error'
          />
        </div>
      );
    }

    default: {
      // Another front end side errors
      return (
        <div className=' max-w-md my-0 mx-auto'>
          <img
            src='https://res.cloudinary.com/toanil315/image/upload/v1709740084/404_Error_Page_not_Found_with_people_connecting_a_plug-bro_uo2fxa.png'
            alt='error'
          />
        </div>
      );
    }
  }
};

export default DefaultErrorHolder;
