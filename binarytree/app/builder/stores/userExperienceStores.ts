// stores/useEducationStore.ts
import { create } from 'zustand'
import { getExperienceEntries } from '@/app/builder/actions/experience'

type ExperienceEntry = any // Replace with real type if you have one

interface ExperienceState {
  entries: ExperienceEntry[]
  loaded: boolean
  fetchExperience: () => Promise<void>
  setEntries: (entries: ExperienceEntry[]) => void
  reset: () => void
}

export const useExperienceStore = create<ExperienceState>((set) => ({
  entries: [],
  loaded: false,
  fetchExperience: async () => {
    const { success, entries } = await getExperienceEntries()
    if (success) set({ entries, loaded: true })
  },
  setEntries: (entries) => set({ entries }),
  reset: () => set({ entries: [], loaded: false }),
}))
