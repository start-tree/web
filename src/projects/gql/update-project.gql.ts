import { gql } from '@apollo/client'

export const updateProjectMutation = gql`
  mutation UpdateProject($input: ProjectInput!) {
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
      categories {
        id
        name
      }
    }
  }
`
