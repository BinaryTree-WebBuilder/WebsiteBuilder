import { create } from 'zustand';
import { getPersonalInfo } from '@/app/builder/sections/personalinfo/action';


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
  data: PersonalInfo | null;
  loading: boolean;
  error: string | null;
  fetchInfo: () => Promise<void>;
  setInfo: (info: PersonalInfo) => void;
  clear: () => void;
}

export const usePersonalInfoStore = create<PersonalInfoStore>((set) => ({
  data: null,
  loading: false,
  error: null,

  fetchInfo: async () => {
    set({ loading: true, error: null });
    try {
      const data = await getPersonalInfo();
      set({ data, loading: false });
    } catch (error: any) {
      set({ error: error.message ?? 'Error fetching info', loading: false });
    }
  },

  setInfo: (info) => set({ data: info }),

  clear: () => set({ data: null }),
}));