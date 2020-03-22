import { ApolloProvider } from '@apollo/client'
import { getDataFromTree } from '@apollo/react-ssr'
import App, { AppContext, AppInitialProps, AppProps } from 'next/app'
import React, { useEffect } from 'react'
import { Cookies, CookiesProvider } from 'react-cookie'
import { client } from '../app'
import { MeDocument } from '../app/gql/generated'
import { AppLayout } from '../app/elements/layouts'

type InitAppProps = {
  rawCookiesFromServer?: string
}

const MyApp = ({ Component, pageProps, rawCookiesFromServer }: AppProps & InitAppProps) => {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    const apolloState = document.querySelector('#apollo-state')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
    if (apolloState) {
      apolloState.parentElement.removeChild(apolloState)
    }
  }, [])

  return (
    <CookiesProvider cookies={new Cookies(rawCookiesFromServer)}>
      <ApolloProvider client={client}>
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </ApolloProvider>
    </CookiesProvider>
  )
}

MyApp.getInitialProps = async (appContext: AppContext): Promise<AppInitialProps & InitAppProps> => {
  const appProps = await App.getInitialProps(appContext)

  let rawCookiesFromServer: string | undefined

  if (!process.browser) {
    rawCookiesFromServer = appContext.ctx.req.headers['cookie']

    if (rawCookiesFromServer) {
      const token = new Cookies(rawCookiesFromServer).get('token')

      if (token) {
        await client.query({ query: MeDocument, context: { token } })
      }
    }

    await getDataFromTree(<appContext.AppTree {...appProps} />)
  }

  return { ...appProps, rawCookiesFromServer }
}

export default MyApp
