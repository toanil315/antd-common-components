import React from 'react';
import { StyledDataEmpty } from './styled';
import { EmptyIcon } from '@/components/Icons';
import { useTranslation } from 'react-i18next';

const DataEmpty = () => {
  const { t } = useTranslation();

  return (
    <StyledDataEmpty>
      <div className='icon'>
        <EmptyIcon />
      </div>
      <h4>{t('notFound.dataNotAvailable')}</h4>
      <p>{t('notFound.tryAgain')}</p>
    </StyledDataEmpty>
  );
};

export default DataEmpty;
