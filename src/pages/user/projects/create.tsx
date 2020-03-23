import { Typography } from '@material-ui/core'
import React from 'react'
import { CreateProjectInput, useCreateProjectMutation } from '../../../app/gql/generated'
import { ProjectForm } from '../../../projects/components/project-form'
import UserLayout from '../../../user/layouts/user-layout'

const Create = () => {
  const [createProjectMutation] = useCreateProjectMutation()

  return (
    <UserLayout>
      <Typography variant="h6">Projects</Typography>
      <ProjectForm
        onSubmit={(values: CreateProjectInput) =>
          createProjectMutation({ variables: { input: values } })
        }
      />
    </UserLayout>
  )
}

export default Create
