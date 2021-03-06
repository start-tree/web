import { gql } from '@apollo/client'

export const projectQuery = gql`
  query Project($id: Int!) {
    project(id: $id) {
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
