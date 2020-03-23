import { gql } from '@apollo/client'

export const projectsQuery = gql`
  query Projects($ownerId: Int) {
    projects(ownerId: $ownerId) {
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
