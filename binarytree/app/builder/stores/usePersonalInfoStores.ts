import { create } from 'zustand';
import { getPersonalInfo } from '@/app/builder/actions/personalinfo'


interface PersonalInfo {
  full_name: string;
  email: string;
  phone: string;
  location: string;
  linkedin_url: string;
  github_url: string;
  bio: string;
  show_phone: boolean;
  show_location: boolean;
  profile_image_url?: string;
}

interface PersonalInfoStore {
  entries: PersonalInfo | null;
  loading: boolean;
  error: string | null;
  fetchInfo: () => Promise<void>;
  setInfo: (info: PersonalInfo) => void;
  clear: () => void;
}

export const usePersonalInfoStore = create<PersonalInfoStore>((set,get) => ({
  entries: null,
  loading: false,
  error: null,

  fetchInfo: async () => {
    if (get().loading) return
    set({ loading: true, error: null });
    try {
      const entries = await getPersonalInfo();
      set({ entries, loading: false });
    } catch (error: any) {
      set({ error: error.message ?? 'Error fetching info', loading: false });
    }
  },

  setInfo: (info) => set({ entries: info }),

  clear: () => set({ entries: null }),
}));