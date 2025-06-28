import { useQuery } from '@tanstack/react-query'
import { EducationEntry, getEducationById, getEducationEntries } from '@/app/builder/actions/education'

export const useEducationEntries = () => {
  return useQuery({
    queryKey: ['educationEntries'],
    queryFn: getEducationEntries,
    staleTime: 1000 * 60 * 5, // cache for 5 minutes
    select: (data) => data.entries,
    enabled: true,
  })
}


export function useEducationById(id: string) {
  return useQuery<EducationEntry>({
    queryKey: ['projects', id],
    queryFn: () => getEducationById(id).then(res => {
      if (!res.success) throw new Error('Project not found')
      return res.entries as EducationEntry
    }),
    enabled: !!id,
  })
}
