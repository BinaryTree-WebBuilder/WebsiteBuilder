import { create } from 'zustand'
import { getProjectEntries } from '@/app/builder/actions/project'

export interface ProjectEntry {
  id: string
  title: string
  description: string
  technologies: string[]
  github_repo_url?: string
  website_url?: string
  video_url?: string
  image_url?: string
  user_id?: string
}

interface ProjectState {
  entries: ProjectEntry[]
  loading: boolean
  fetchProject: () => Promise<void>
  setEntries: (entries: ProjectEntry[]) => void
  getProjectById: (id: string) => ProjectEntry | undefined
  reset: () => void
}

export const useProjectStore = create<ProjectState>((set, get) => ({
  entries: [],
  loading: false,

  fetchProject: async () => {
    if (get().loading) return
    const { success, entries } = await getProjectEntries()
    if (success) {
      // Filter out entries with undefined id and cast id to string
      const filteredEntries = entries
        .filter((entry): entry is ProjectEntry & { id: string } => typeof entry.id === 'string')
      set({ entries: filteredEntries, loading: true })
    }
  },

  setEntries: (entries) => set({ entries }),

  getProjectById: (id) => {
    const { entries } = get()
    return entries.find((project) => project.id === id)
  },

  reset: () => set({ entries: [], loading: false }),
}))
