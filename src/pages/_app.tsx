import { ApolloProvider, useApolloClient } from '@apollo/client'
import { getDataFromTree } from '@apollo/react-ssr'
import { Container, Link, makeStyles, Typography } from '@material-ui/core'
import App, { AppContext, AppProps } from 'next/app'
import NextLink from 'next/link'
import React, { useEffect } from 'react'
import { CookiesProvider, useCookies } from 'react-cookie'
import { client } from '../app'
import { useMeQuery } from '../app/gql/generated'
import { useRouter } from 'next/router'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  navLink: {
    marginRight: theme.spacing(2),
    cursor: 'pointer',
  },
}))

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const [{ token }, , removeCookie] = useCookies(['token'])
  const { data } = useMeQuery({
    skip: !token,
  })
  const classes = useStyles()

  const router = useRouter()
  const client = useApolloClient()
  const logout = () => {
    removeCookie('token')
    client.resetStore()
    router.push('/')
  }

  return (
    <Container>
      <Typography variant="h6" className={classes.title}>
        <NextLink as="/" href="/">
          <Link className={classes.navLink}>Home</Link>
        </NextLink>
        {data && data.me ? (
          <>
            <Link onClick={() => logout()} className={classes.navLink}>
              Logout
            </Link>
            <Link className={classes.navLink}>{data.me.name}</Link>
          </>
        ) : (
          <>
            <NextLink as="/login" href="/login">
              <Link className={classes.navLink}>Login</Link>
            </NextLink>
            <NextLink as="/register" href="/register">
              <Link className={classes.navLink}>Registration</Link>
            </NextLink>
          </>
        )}
      </Typography>
      {children}
    </Container>
  )
}

const MyApp = ({ Component, pageProps }: AppProps) => {
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
    <CookiesProvider>
      <ApolloProvider client={client}>
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </ApolloProvider>
    </CookiesProvider>
  )
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext)

  if (!process.browser) {
    await getDataFromTree(<appContext.AppTree {...appProps} />)
  }

  return { ...appProps }
}

export default MyApp
