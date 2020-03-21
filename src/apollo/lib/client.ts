import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  ApolloLink
} from "@apollo/client";
import fetch from "isomorphic-unfetch";
import { Cookies } from "react-cookie";

const authLink = new ApolloLink((operation, forward) => {
  const cookies = new Cookies();
  const token = cookies.get("token");

  const headers: any = { ...operation.getContext()?.headers };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  operation.setContext({ headers });

  return forward(operation);
});

const httpLink = createHttpLink({
  uri: "http://localhost:3100/graphql",
  fetch
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache().restore(
    typeof window !== "undefined" ? (window as any).__APOLLO_STATE__ : undefined
  )
});
