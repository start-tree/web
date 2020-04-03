import { useRouter } from 'next/router'
import React from 'react'
import {
  ProjectsDocument,
  ProjectsQueryVariables,
  useMeQuery,
  useProjectQuery,
  useUpdateProjectMutation,
} from '../../../../app'
import {
  deserializeFormDataToProject,
  ProjectForm,
  serializeProjectToFormData,
} from '../../../../projects'
import { UserProjectsLayout } from '../../../../users'

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
        initialValues={serializeProjectToFormData(data.project)}
        onSubmit={async (values) => {
          console.log(values)

          updateProjectMutation({
            variables: {
              input: {
                id,
                ...deserializeFormDataToProject(values),
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
