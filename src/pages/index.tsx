import { Card, CardContent, Container, Link, makeStyles, Typography } from '@material-ui/core'
import NextLink from 'next/link'
import React from 'react'
import { useProjectsQuery } from '../app/gql/generated'

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4),
  },
  title: {
    marginBottom: theme.spacing(3),
  },
  card: {
    marginBottom: theme.spacing(4),
  },
  link: {
    cursor: 'pointer',
  },
}))

const Index = () => {
  const { data, loading } = useProjectsQuery()
  const classes = useStyles()

  if (!data && loading) {
    return 'Loading'
  }

  return (
    <Container maxWidth="md" className={classes.container}>
      <Typography variant="h3" className={classes.title}>
        Teams
      </Typography>
      {data &&
        data.projects.map((p) => (
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
    </Container>
  )
}

export default Index
