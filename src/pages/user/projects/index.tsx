import {
  Card,
  CardContent,
  Link,
  makeStyles,
  Typography,
  Button,
  CardActions,
} from '@material-ui/core'
import NextLink from 'next/link'
import React from 'react'
import { useDeleteProjectMutation, useMeQuery, useProjectsQuery } from '../../../app'
import { projectsQuery } from '../../../projects'
import { UserProjectsLayout } from '../../../users'

const useStyles = makeStyles((theme) => ({
  card: {
    marginBottom: theme.spacing(4),
  },
  link: {
    cursor: 'pointer',
    textDecoration: 'none !important',
  },
}))

const UserProjects = () => {
  const { data: meData } = useMeQuery()

  const { data: projectsData } = useProjectsQuery({
    variables: { ownerId: meData && Number(meData.me.id) },
    skip: !meData,
  })
  const classes = useStyles()

  const [deleteMutation] = useDeleteProjectMutation({
    refetchQueries: [
      { query: projectsQuery, variables: { ownerId: meData && Number(meData.me.id) } },
    ],
  })

  return (
    <UserProjectsLayout>
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
            </CardContent>
            <CardActions>
              <Button
                onClick={() => deleteMutation({ variables: { id: Number(p.id) } })}
                color="secondary"
              >
                Delete
              </Button>
              <NextLink as={`/user/projects/${p.id}/update`} href={`/user/projects/[id]/update`}>
                <Button color="primary">
                  <Link className={classes.link}>Update</Link>
                </Button>
              </NextLink>
            </CardActions>
          </Card>
        ))}
    </UserProjectsLayout>
  )
}

export default UserProjects
