import Link from "next/link";
import React from "react";
import { useProjectsQuery } from "../apollo/generated";

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

export default Index;
