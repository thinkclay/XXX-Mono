import { Disability, Ethnicity, Gender, Language, Religion, Housing } from '@common/models/demographic'

export const ethnicityOptions: { label: string; value: Ethnicity }[] = [
  { label: 'Black', value: 'black' },
  { label: 'White', value: 'white' },
  { label: 'Asian', value: 'asian' },
  { label: 'Indian', value: 'indian' },
  { label: 'Hispanic', value: 'hispanic' },
  { label: 'Indigenous', value: 'indigenous' },
  { label: 'Multiracial', value: 'multi' },
]

export const genderOptions: { label: string; value: Gender }[] = [
  { label: 'Non-binary', value: 'multi' },
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
  { label: 'Transgender', value: 'transgender' },
]

export const languageOptions: { label: string; value: Language }[] = [
  { label: 'English', value: 'english' },
  { label: 'Spanish', value: 'spanish' },
  { label: 'Mandarin', value: 'mandarin' },
]

export const religionOptions: { label: string; value: Religion }[] = [
  { label: 'Hindu', value: 'hindu' },
  { label: 'Buddhist', value: 'buddhist' },
  { label: 'Christian', value: 'christian' },
  { label: 'Jewish', value: 'jewish' },
  { label: 'Muslim', value: 'muslim' },
]

export const disabilityOptions: { label: string; value: Disability }[] = [
  { label: 'Mental', value: 'intellectual' },
  { label: 'Physical', value: 'physical' },
  { label: 'Emotional', value: 'emotional' },
  { label: 'Developmental', value: 'developmental' },
]

export const housingOptions: { label: string; value: Housing }[] = [
  { label: 'Lives with two parents', value: 'two' },
  { label: 'Lives with one parent', value: 'one' },
  { label: 'Non-parental caregivers', value: 'alternative' },
  { label: 'Transient housing', value: 'transient' },
  { label: 'Low socioeconomic status', value: 'low' },
  { label: 'Medium socioeconomic status', value: 'med' },
  { label: 'High socioeconomic status', value: 'high' },
]
