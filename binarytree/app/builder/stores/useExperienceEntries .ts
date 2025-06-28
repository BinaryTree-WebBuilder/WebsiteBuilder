import { useQuery } from '@tanstack/react-query'
import { getExperienceEntries, getExperienceById, ExperienceEntry } from '@/app/builder/actions/experience'


export const useExperienceEntries = () => {
  return useQuery({
    queryKey: ['experienceEntries'],
    queryFn: getExperienceEntries,
    staleTime: 1000 * 60 * 5, // cache for 5 minutes
    select: (data) => data.entries,
    enabled: true,
  })
}

export function useExperienceById(id: string) {
  return useQuery<ExperienceEntry>({
    queryKey: ['projects', id],
    queryFn: () => getExperienceById(id).then(res => {
      if (!res.success) throw new Error('Experience not found')
      return res.entries as ExperienceEntry
    }),
    enabled: !!id,
  })
}
