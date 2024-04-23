import { useState } from 'react';

interface UsePaginationParams {
  page: number;
  limit: number;
}

const getInitialPageAndLimit = (field: 'page' | 'limit', fallbackValue: number) => {
  const searchParams = new URLSearchParams(window.location.search);
  const value = searchParams.get(field);
  return value ? Number(value) : fallbackValue;
};

export const usePagination = ({ page: defaultPage, limit: defaultLimit }: UsePaginationParams) => {
  const [page, setPage] = useState(getInitialPageAndLimit('page', defaultPage));
  const [limit, setLimit] = useState(getInitialPageAndLimit('limit', defaultLimit));

  const onPageChange = (page: number, limit: number) => {
    setPage(page);
    setLimit(limit);
  };

  return {
    currentPage: Number(page) || 1,
    limit,
    onPageChange,
  };
};
