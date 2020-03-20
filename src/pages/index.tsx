import React from "react";
import { gql, useQuery } from "@apollo/client";
import Link from "next/link";

const projectsQuery = gql`
  query Project {
    projects {
      id
      title
      description
    }
  }
`;

const Index = () => {
  const { loading, data } = useQuery(projectsQuery);

  if (loading) {
    return "Loading";
  }

  return (
    <div>
      <h1>Hello</h1>
      {data &&
        data.projects.map(p => (
          <div key={p.id}>
            <Link as={`/projects/${p.id}`} href={`/projects/[id]`}>
              {p.title}
            </Link>
          </div>
        ))}
    </div>
  );
};

export default Index;
