import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export const TOUR_QUERY_CONFIGS = {
  list: {
    queryKey: ['tour', 'list'],
    queryFn: () => axios.get('http://localhost:5500/tours'),
  },
  detail: (id: string) => ({
    queryKey: ['tour', 'detail', id],
    queryFn: () => axios.get(`http://localhost:5500/tours/${id}`),
  }),
};

export const useTours = () => {
  return useQuery(TOUR_QUERY_CONFIGS.list);
};

export const useTour = (id: string) => {
  return useQuery(TOUR_QUERY_CONFIGS.detail(id));
};

export const useCreateTour = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => axios.post('http://localhost:5500/tours', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tour'] });
    },
  });
};

export const useSaveTour = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => axios.put('http://localhost:5500/tours', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tour'] });
    },
  });
};
