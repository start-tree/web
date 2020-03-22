import React from 'react'
import { useProjectQuery } from '../../app/gql/generated'
import { useRouter } from 'next/router'
import { Container, Typography, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(12),
  },
  title: {
    marginBottom: theme.spacing(3),
  },
}))

const Project = () => {
  const {
    query: { id },
  } = useRouter()
  const { data, loading } = useProjectQuery({ variables: { id: Number(id) } })
  const classes = useStyles()

  if (!data && loading) {
    return <div>Loadin...</div>
  }

  return (
    <Container maxWidth="md" className={classes.container}>
      <Typography variant="h5" className={classes.title}>
        {data.project.title}
      </Typography>
      <Typography>{data.project.description}</Typography>
    </Container>
  )
}

export default Project
