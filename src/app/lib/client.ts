import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client'
import fetch from 'isomorphic-unfetch'
import { Cookies } from 'react-cookie'

declare global {
  interface Window {
    __APOLLO_STATE__: NormalizedCacheObject
  }
}

const authLink = new ApolloLink((operation, forward) => {
  const cookies = new Cookies()
  const token = cookies.get('token')

  const headers: { Authorization?: string } = {}

  const context = operation.getContext()

  if (context.token) {
    headers.Authorization = `Bearer ${context.token}`
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  operation.setContext({ headers })

  return forward(operation)
})

const httpLink = createHttpLink({
  uri: 'http://localhost:3100/graphql',
  fetch,
})

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache().restore(
    typeof window !== 'undefined' ? window.__APOLLO_STATE__ : undefined
  ),
  ssrMode: typeof window === 'undefined',
})
