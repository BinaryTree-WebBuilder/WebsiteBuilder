// app/builder/utils/getBuilderStoreData.ts
import { useEffect } from 'react'

import { usePersonalInfoStore } from '../stores/usePersonalInfoStores'
import { useProjectStore } from '../stores/useProjectStores'
import { useEducationStore } from '../stores/userEducationStores'
import { useExperienceStore } from '../stores/userExperienceStores'

export function useBuilderStoreDataWithFetch() {
  const { entries: personalInfo, fetchInfo } = usePersonalInfoStore()
  const { entries: projects, fetchProject } = useProjectStore()
  const { entries: experience, fetchExperience } = useExperienceStore()
  const { entries: education, fetchEducation } = useEducationStore()

  useEffect(() => {
    if (!personalInfo) fetchInfo()
    if (!projects.length) fetchProject()
    if (!experience.length) fetchExperience()
    if (!education.length) fetchEducation()
  }, [personalInfo, projects.length, fetchInfo, fetchProject, fetchExperience, fetchEducation])

  return { personalInfo, projects, experience, education }
}