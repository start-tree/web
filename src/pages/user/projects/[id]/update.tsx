import { useRouter } from 'next/router'
import React from 'react'
import {
  ProjectsDocument,
  ProjectsQueryVariables,
  useMeQuery,
  useProjectQuery,
  useUpdateProjectMutation,
  ProjectQuery,
} from '../../../../app'
import { ProjectForm, ProjectFormData } from '../../../../projects'
import { UserProjectsLayout } from '../../../../users'

const serializeProjectToForm = (data: ProjectQuery['project']): ProjectFormData => {
  return {
    title: data.title,
    description: data.description,
    categoriesIds: data.categories.map((category) => category.id),
    vacantions: data.vacantions?.map((vacantion) => ({
      id: vacantion.id,
      title: vacantion.title,
      description: vacantion.description,
    })),
  }
}

const Update = () => {
  const router = useRouter()
  const id = Number(router.query.id)
  const { data: meData } = useMeQuery()
  const { data } = useProjectQuery({ variables: { id } })
  const [updateProjectMutation] = useUpdateProjectMutation()

  if (!data) {
    return null
  }

  return (
    <UserProjectsLayout>
      <ProjectForm
        initialValues={serializeProjectToForm(data.project)}
        onSubmit={async (values) => {
          updateProjectMutation({
            variables: {
              input: {
                id,
                ...values,
              },
            },
            refetchQueries: [
              {
                query: ProjectsDocument,
                variables: { ownerId: meData && Number(meData.me.id) } as ProjectsQueryVariables,
              },
            ],
          })
        }}
        submitLabel="Update"
      />
    </UserProjectsLayout>
  )
}

export default Update
