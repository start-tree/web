import { omit } from 'lodash'
import { ProjectQuery } from '../app'
import { ProjectFormData } from './components/project-form'

export const serializeProjectToFormData = (data: ProjectQuery['project']): ProjectFormData => {
  return {
    ...omit(data, ['id', '__typename', 'categories', 'owner']),
    categoriesIds: data.categories.map((category) => Number(category.id)),
    vacantions: data.vacantions?.map((vacantion) => ({
      id: vacantion.id ? Number(vacantion.id) : undefined,
      ...omit(vacantion, ['__typename', 'id']),
    })),
  }
}
