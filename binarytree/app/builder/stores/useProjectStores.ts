// stores/useProjectStore.ts
import { create } from 'zustand'
import { getProjectEntries } from '@/app/builder/sections/project/action'

type ProjectEntry = any // Replace with real type if you have one

interface ProjectState {
  entries: ProjectEntry[]
  loaded: boolean
  fetchProject: () => Promise<void>
  setEntries: (entries: ProjectEntry[]) => void
  reset: () => void
}

export const useProjectStore = create<ProjectState>((set) => ({
  entries: [],
  loaded: false,
  fetchProject: async () => {
    const { success, entries } = await getProjectEntries()
    if (success) set({ entries, loaded: true })
  },
  setEntries: (entries) => set({ entries }),
  reset: () => set({ entries: [], loaded: false }),
}))