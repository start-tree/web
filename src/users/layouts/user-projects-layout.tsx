import { Box, Link, makeStyles, Typography, Button } from '@material-ui/core'
import React, { ReactNode } from 'react'
import { NextLink } from '../../app'
import { UserLayout } from './user-layout'

const useStyles = makeStyles((theme) => ({
  title: {
    marginBottom: theme.spacing(2),
  },
  link: {
    cursor: 'pointer',
    textDecoration: 'none !important',
  },
  header: {
    marginBottom: theme.spacing(3),
  },
}))

type Props = {
  children?: ReactNode
}

export const UserProjectsLayout = ({ children }: Props) => {
  const classes = useStyles()

  return (
    <UserLayout>
      <Typography variant="h6" className={classes.title}>
        Projects
      </Typography>
      <Box component="header" className={classes.header}>
        <NextLink as="/user/projects/create" href="/user/projects/create">
          <Button variant="outlined" color="primary">
            <Link className={classes.link}>Create project</Link>
          </Button>
        </NextLink>
      </Box>
      {children}
    </UserLayout>
  )
}
