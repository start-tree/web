import { Typography } from '@material-ui/core'
import React from 'react'
import { omit } from 'lodash'
import { ProjectForm } from '../../../../projects/components/project-form'
import UserLayout from '../../../../user/layouts/user-layout'
import {
  UpdateProjectInput,
  useUpdateProjectMutation,
  useProjectQuery,
} from '../../../../app/gql/generated'
import { useRouter } from 'next/router'

const Update = () => {
  const router = useRouter()
  const { data } = useProjectQuery({ variables: { id: Number(router.query.id) } })
  const [updateProjectMutation] = useUpdateProjectMutation()

  if (!data) {
    return null
  }

  return (
    <UserLayout>
      <Typography variant="h6">Projects</Typography>
      <ProjectForm
        initialValues={
          {
            ...omit(data.project, ['__typename', 'ownerId', 'owner']),
            vacantions: data.project.vacantions.map((v) => omit(v, ['__typename'])),
          } as any
        }
        onSubmit={(values: UpdateProjectInput) =>
          updateProjectMutation({ variables: { input: values } })
        }
      />
    </UserLayout>
  )
}

export default Update
