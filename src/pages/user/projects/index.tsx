import { Card, CardContent, Link, makeStyles, Typography, Box } from '@material-ui/core'
import NextLink from 'next/link'
import React from 'react'
import { useMeQuery, useProjectsQuery, useDeleteProjectMutation } from '../../../app/gql/generated'
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

  const [deleteProjectMutation] = useDeleteProjectMutation()

  return (
    <UserLayout>
      <Typography variant="h6">Projects</Typography>
      <Box component="header">
        <NextLink as="/user/projects/create" href="/user/projects/create">
          <Link className={classes.link}>Create</Link>
        </NextLink>
      </Box>
      {projectsData &&
        projectsData.projects.map((p) => (
          <Card key={p.id} className={classes.card}>
            <CardContent>
              <Typography variant="h6">
                <NextLink as={`/user/projects/${p.id}`} href={`/user/projects/[id]`}>
                  <Link className={classes.link}>{p.title}</Link>
                </NextLink>
              </Typography>
              <Typography>{p.description}</Typography>
              <span onClick={() => deleteProjectMutation({ variables: { id: Number(p.id) } })}>
                delete
              </span>
            </CardContent>
          </Card>
        ))}
    </UserLayout>
  )
}

export default UserProjects
