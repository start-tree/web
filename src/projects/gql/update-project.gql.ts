import { gql } from '@apollo/client'

export const updateProjectMutation = gql`
  mutation UpdateProject($input: UpdateProjectInput!) {
    updateProject(input: $input) {
      id
      title
      description
      ownerId
      owner {
        id
        name
        email
      }
      vacantions {
        id
        title
        description
        projectId
      }
    }
  }
`
