import { gql } from '@apollo/client'

export const createProjectMutation = gql`
  mutation CreateProject($input: ProjectInput!) {
    createProject(input: $input) {
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
