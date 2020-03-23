import { Card, CardContent, Link, makeStyles, Typography } from '@material-ui/core'
import NextLink from 'next/link'
import React from 'react'
import { useDeleteProjectMutation, useMeQuery, useProjectsQuery } from '../../../app/gql/generated'
import { UserProjectsLayout } from '../../../users'
import { projectsQuery } from '../../../projects/gql/projects.gql'

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
              <span onClick={() => deleteMutation({ variables: { id: Number(p.id) } })}>
                delete
              </span>
            </CardContent>
          </Card>
        ))}
    </UserProjectsLayout>
  )
}

export default UserProjects
