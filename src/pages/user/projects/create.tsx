import React from 'react'
import { CreateProjectInput, useCreateProjectMutation } from '../../../app/gql/generated'
import { ProjectForm } from '../../../projects/components/project-form'
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
