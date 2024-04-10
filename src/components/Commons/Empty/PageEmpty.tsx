import { EmptyIcon } from '@/components/Icons';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { StyledPageEmpty } from './styled';
import { ROUTES } from '@/constants';

const PageEmpty = () => {
  const { t } = useTranslation();

  return (
    <StyledPageEmpty>
      <div className='icon'>
        <EmptyIcon />
      </div>
      <div className='content'>
        <h3>404</h3>
        <p>{t('notFound.title')}</p>
        <span>{t('notFound.desc')}</span>
        <Link to={ROUTES.HOME}>{t('commons.backToHome')}</Link>
      </div>
    </StyledPageEmpty>
  );
};

export default PageEmpty;
