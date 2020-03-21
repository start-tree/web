import Link from "next/link";
import React from "react";
import { useProjectsQuery, ProjectsDocument } from "../apollo/generated";
import { GetServerSideProps } from "next";
import { client } from "../apollo";

const Index = () => {
  const { data, loading } = useProjectsQuery();

  if (!data && loading) {
    return "Loading";
  }

  return (
    <div>
      <h1>Hello</h1>
      {data &&
        data.projects.map(p => (
          <div key={p.id}>
            <Link as={`/projects/${p.id}`} href={`/projects/[id]`}>
              <a>{p.title}</a>
            </Link>
          </div>
        ))}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  await client.query({ query: ProjectsDocument });
  return { props: {} };
};

export default Index;
