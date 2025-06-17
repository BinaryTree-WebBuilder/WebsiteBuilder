// stores/useEducationStore.ts
import { create } from 'zustand'
import { getEducationEntries } from '@/app/builder/sections/education/action'

type EducationEntry = any // Replace with real type if you have one

interface EducationState {
  entries: EducationEntry[]
  loaded: boolean
  fetchEducation: () => Promise<void>
  setEntries: (entries: EducationEntry[]) => void
  reset: () => void
}

export const useEducationStore = create<EducationState>((set) => ({
  entries: [],
  loaded: false,
  fetchEducation: async () => {
    const { success, entries } = await getEducationEntries()
    if (success) set({ entries, loaded: true })
  },
  setEntries: (entries) => set({ entries }),
  reset: () => set({ entries: [], loaded: false }),
}))
