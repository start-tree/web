import React from "react";
import { gql, useQuery, useApolloClient } from "@apollo/client";
import { useRouter } from "next/router";

const query = gql`
  query Project($id: String!) {
    project(id: $id) {
      id
      title
      description
    }
  }
`;

const Project = () => {
  const router = useRouter();

  const { data, loading, refetch } = useQuery(query, {
    variables: {
      id: router.query.id
    },
    notifyOnNetworkStatusChange: true
  });

  if (loading) {
    return "Loading";
  }

  return (
    <div>
      <h1>{data && data.project.title}</h1>
      <div>{data && data.project.description}</div>
      <button onClick={() => refetch()}>refetch</button>
    </div>
  );
};

export default Project;
