import { gql } from '@apollo/client'

export const categoriesQuery = gql`
  query Categories {
    categories {
      id
      name
    }
  }
`
