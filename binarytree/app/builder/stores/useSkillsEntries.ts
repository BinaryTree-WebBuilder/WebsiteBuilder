import { useQuery } from '@tanstack/react-query'
import { getSkillsEntries } from '@/app/builder/actions/skills'


export const useSkills = () => {
  return useQuery({
    queryKey: ['skillEntries'],
    queryFn: getSkillsEntries,
    staleTime: 1000 * 60 * 5, // cache for 5 minutes
    select: (data) => data.entries,
    enabled: true,
  })
}

// export function useExperienceById(id: string) {
//   return useQuery<ExperienceEntry>({
//     queryKey: ['projects', id],
//     queryFn: () => getExperienceById(id).then(res => {
//       if (!res.success) throw new Error('Experience not found')
//       return res.entries as ExperienceEntry
//     }),
//     enabled: !!id,
//   })
// }
