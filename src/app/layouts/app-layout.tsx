import { useApolloClient } from '@apollo/client'
import { Container, Link, makeStyles, Typography } from '@material-ui/core'
import { useRouter } from 'next/router'
import React from 'react'
import { useCookies } from 'react-cookie'
import { NextLink } from '../components/next-link'
import { useMeQuery } from '../gql/generated'

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

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const [{ token }, , removeCookie] = useCookies(['token'])
  const { data } = useMeQuery({ skip: !token })
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
            <NextLink as="/user" href="/user">
              <Link className={classes.navLink}>{data.me.name}</Link>
            </NextLink>
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
