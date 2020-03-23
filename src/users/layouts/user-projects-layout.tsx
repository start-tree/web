import { Box, Link, makeStyles, Typography } from '@material-ui/core'
import NextLink from 'next/link'
import React, { ReactNode } from 'react'
import { UserLayout } from './user-layout'

const useStyles = makeStyles(() => ({
  link: {
    cursor: 'pointer',
  },
}))

type Props = {
  children?: ReactNode
}

export const UserProjectsLayout = ({ children }: Props) => {
  const classes = useStyles()

  return (
    <UserLayout>
      <Typography variant="h6">Projects</Typography>
      <Box component="header">
        <NextLink as="/user/projects/create" href="/user/projects/create">
          <Link className={classes.link}>Create</Link>
        </NextLink>
      </Box>
      {children}
    </UserLayout>
  )
}
