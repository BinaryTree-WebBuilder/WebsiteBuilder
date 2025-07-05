import { usePersonalInfo } from '../stores/usePersonalInfoEntries'
import { useEducationEntries } from '../stores/useEducationEntries'
import { useExperienceEntries } from '../stores/useExperienceEntries '
import { useProjects } from '../stores/useProjectEntries'
import { useSkills } from '../stores/useSkillsEntries'

export function useBuilderDataWithQuery() {
  const personalInfoQuery = usePersonalInfo()
  const educationQuery = useEducationEntries()
  const experienceQuery = useExperienceEntries()
  const projectsQuery = useProjects()
  const skillsQuery = useSkills()


  return {
    personalInfo: personalInfoQuery.data,
    projects: projectsQuery.data,
    experience: experienceQuery.data,
    education: educationQuery.data,
    skills: skillsQuery.data,
    isLoading:
      personalInfoQuery.isLoading ||
      projectsQuery.isLoading ||
      experienceQuery.isLoading ||
      educationQuery.isLoading || 
      skillsQuery.isLoading,
  }
}