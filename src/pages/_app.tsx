import React from "react";
import { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { CookiesProvider } from "react-cookie";
import { client } from "../apollo";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <CookiesProvider>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </CookiesProvider>
  );
};

export default App;
