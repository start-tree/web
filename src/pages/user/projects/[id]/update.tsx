import { useRouter } from 'next/router'
import React from 'react'
import { UpdateProjectInput, useProjectQuery, useUpdateProjectMutation } from '../../../../app'
import { ProjectForm } from '../../../../projects'
import { UserProjectsLayout } from '../../../../users'

const Update = () => {
  const router = useRouter()
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
          updateProjectMutation({ variables: { input: values } })
        }
      />
    </UserProjectsLayout>
  )
}

export default Update
