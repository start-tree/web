import { gql } from '@apollo/client'

export const deleteProjectMutation = gql`
  mutation DeleteProject($id: Float!) {
    deleteProject(id: $id) {
      affected
    }
  }
`
