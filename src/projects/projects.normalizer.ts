import { omit } from 'lodash'
import { CreateProjectInput, UpdateProjectInput, ProjectQuery } from '../app'
import { ProjectFormData } from './components/project-form'

export const serializeProjectToFormData = (data: ProjectQuery['project']): ProjectFormData => {
  return {
    ...omit(data, ['id', '__typename', 'categories']),
    categoriesIds: data.categories.map((category) => category.id),
    vacantions: data.vacantions?.map((vacantion) => omit(vacantion, ['__typename'])),
  }
}

// TODO: try make type correction with yup
export const deserializeFormDataToProject = (
  data: ProjectFormData
): CreateProjectInput | UpdateProjectInput => {
  return {
    title: data.title,
    description: data.description,
    categoriesIds: data.categoriesIds.map((id) => Number(id)),
    vacantions: data.vacantions?.map((vacantion) => ({
      id: vacantion.id ? Number(vacantion.id) : undefined,
      title: vacantion.title,
      description: vacantion.description,
    })),
  }
}
