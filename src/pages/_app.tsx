import React from "react";
import { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { client } from "../apollo";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
};

export default App;
