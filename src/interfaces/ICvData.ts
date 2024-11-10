import type { Contact } from './IContact '
import type { Education } from './IEducation'
import type { Experience } from './IExperince'

export interface CVData {
  name: string
  profile: string
  contact: Contact
  experience: Experience[]
  education: Education
  certifications: string[]
  skills: string[]
}
