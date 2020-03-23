import React from 'react'
import { CreateProjectInput, useCreateProjectMutation } from '../../../app'
import { ProjectForm } from '../../../projects'
import { UserProjectsLayout } from '../../../users'

const Create = () => {
  const [createProjectMutation] = useCreateProjectMutation()

  return (
    <UserProjectsLayout>
      <ProjectForm
        onSubmit={(values: CreateProjectInput) =>
          createProjectMutation({ variables: { input: values } })
        }
      />
    </UserProjectsLayout>
  )
}

export default Create
