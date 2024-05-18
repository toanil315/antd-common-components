import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export const useTour = () => {
  return useQuery({
    queryKey: ['tour'],
    queryFn: () => axios.get('http://localhost:3000/tours/1715921934496'),
  });
};
export const useSaveTour = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => axios.put('http://localhost:3000/tours', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tour'] });
    },
  });
};
