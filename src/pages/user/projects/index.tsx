import { Card, CardContent, Link, makeStyles, Typography } from '@material-ui/core'
import NextLink from 'next/link'
import React from 'react'
import { useMeQuery, useProjectsQuery } from '../../../app/gql/generated'
import UserLayout from '../../../user/layouts/user-layout'

const useStyles = makeStyles((theme) => ({
  card: {
    marginBottom: theme.spacing(4),
  },
  link: {
    cursor: 'pointer',
  },
}))

const UserProjects = () => {
  const { data: meData } = useMeQuery()

  const { data: projectsData } = useProjectsQuery({
    variables: { ownerId: meData && Number(meData.me.id) },
    skip: !meData,
  })
  const classes = useStyles()

  return (
    <UserLayout>
      <Typography variant="h6">Projects</Typography>
      {projectsData &&
        projectsData.projects.map((p) => (
          <Card key={p.id} className={classes.card}>
            <CardContent>
              <Typography variant="h6">
                <NextLink as={`/projects/${p.id}`} href={`/projects/[id]`}>
                  <Link className={classes.link}>{p.title}</Link>
                </NextLink>
              </Typography>
              <Typography>{p.description}</Typography>
            </CardContent>
          </Card>
        ))}
    </UserLayout>
  )
}

export default UserProjects
