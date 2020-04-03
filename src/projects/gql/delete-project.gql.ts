import { gql } from '@apollo/client'

export const deleteProjectMutation = gql`
  mutation DeleteProject($id: Int!) {
    deleteProject(id: $id) {
      affected
    }
  }
`
