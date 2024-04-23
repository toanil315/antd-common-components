import { useMemo } from 'react';
import { useNavigate, useSearch, useParams } from '@tanstack/react-router';

export function useRouter() {
  const navigate = useNavigate();
  const params = useParams({ strict: false });
  const search = useSearch({ strict: false });

  return useMemo(() => {
    return {
      navigate,
      pathname: location.pathname,
      query: {
        ...search,
        ...params,
      },
      location,
      history,
    };
  }, [navigate, params, location]);
}
