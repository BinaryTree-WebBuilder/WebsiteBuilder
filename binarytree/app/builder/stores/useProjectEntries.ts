// hooks/useProjects.ts

import { useQuery } from '@tanstack/react-query'
import { getProjectEntries, getProjectById, ProjectEntry } from '@/app/builder/actions/project'

export function useProjects() {
  return useQuery({
    queryKey: ['projectEntries'],
    queryFn: getProjectEntries,
    staleTime: 1000 * 60 * 5, // cache for 5 minutes
    select: (data) => data.entries,
    enabled: true,
  })
}

export function useProjectById(id: string) {
  return useQuery<ProjectEntry>({
    queryKey: ['projects', id],
    queryFn: () => getProjectById(id).then(res => {
      if (!res.success) throw new Error('Project not found')
      return res.entries as ProjectEntry
    }),
    enabled: !!id,
  })
}