import { Box, Button, Container, Link, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import { NextLink, useMeQuery } from '../../app'

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(12),
  },
  title: {
    marginBottom: theme.spacing(3),
  },
  link: {
    cursor: 'pointer',
    textDecoration: 'none !important',
  },
  content: {
    marginTop: theme.spacing(4),
  },
}))

type Props = {
  children?: React.ReactNode
}

export const UserLayout = ({ children }: Props) => {
  const { data } = useMeQuery()
  const classes = useStyles()

  return (
    <Container maxWidth="md" className={classes.container}>
      <Box component="header" className={classes.title}>
        <Typography variant="h5">Hey, {data && data.me.name}</Typography>
      </Box>
      <Box component="header">
        <NextLink as="/user" href="/user">
          <Button>
            <Link className={classes.link}>Home</Link>
          </Button>
        </NextLink>
        <NextLink as="/user/projects" href="/user/projects">
          <Button>
            <Link className={classes.link}>Projects</Link>
          </Button>
        </NextLink>
      </Box>
      <Box className={classes.content}>{children}</Box>
    </Container>
  )
}
