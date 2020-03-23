import { useRouter } from 'next/router'
import React from 'react'
import {
  ProjectDocument,
  ProjectsQueryVariables,
  UpdateProjectInput,
  useMeQuery,
  useProjectQuery,
  useUpdateProjectMutation,
} from '../../../../app'
import { ProjectForm } from '../../../../projects'
import { UserProjectsLayout } from '../../../../users'

const Update = () => {
  const router = useRouter()
  const { data: meData } = useMeQuery()
  const { data } = useProjectQuery({ variables: { id: Number(router.query.id) } })
  const [updateProjectMutation] = useUpdateProjectMutation()

  if (!data) {
    return null
  }

  return (
    <UserProjectsLayout>
      <ProjectForm
        initialValues={data.project}
        onSubmit={(values: UpdateProjectInput) =>
          updateProjectMutation({
            variables: { input: values },
            refetchQueries: [
              {
                query: ProjectDocument,
                variables: { ownerId: meData && Number(meData.me.id) } as ProjectsQueryVariables,
              },
            ],
          })
        }
        submitLabel="Update"
      />
    </UserProjectsLayout>
  )
}

export default Update
