import React from 'react'
import {
  ProjectsDocument,
  ProjectsQueryVariables,
  useCreateProjectMutation,
  useMeQuery,
} from '../../../app'
import { ProjectForm } from '../../../projects'
import { UserLayout } from '../../../users'

const Create = () => {
  const { data } = useMeQuery()
  const [createProjectMutation] = useCreateProjectMutation()

  return (
    <UserLayout>
      <ProjectForm
        onSubmit={(values) =>
          createProjectMutation({
            variables: { input: values },
            refetchQueries: [
              {
                query: ProjectsDocument,
                variables: { ownerId: data && Number(data.me.id) } as ProjectsQueryVariables,
              },
            ],
          })
        }
      />
    </UserLayout>
  )
}

export default Create
