import { useQuery } from '@tanstack/react-query'
import { getPersonalInfo } from '@/app/builder/actions/personalinfo'

export const usePersonalInfo = () => {
  return useQuery({
    queryKey: ['personalInfo'],
    queryFn: getPersonalInfo,
    staleTime: 1000 * 60 * 10, // cache for 10 mins
  })
}