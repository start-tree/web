import {
  Button,
  Container,
  FormControl,
  Link,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { useCookies } from 'react-cookie'
import { useForm } from 'react-hook-form'
import { RegisterInput, useRegisterMutation } from '../app/gql/generated'

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(12),
  },
  header: {
    marginBottom: theme.spacing(3),
  },
  title: {
    marginBottom: theme.spacing(1),
  },
  link: {
    cursor: 'pointer',
  },
  submitButton: {
    marginTop: theme.spacing(4),
  },
  meta: {
    marginTop: theme.spacing(4),
  },
}))

const Register = () => {
  const classes = useStyles()
  const router = useRouter()
  const [, setCookie] = useCookies(['token'])
  const [registerMutations] = useRegisterMutation({
    onCompleted: (data) => {
      setCookie('token', data.register.token)
      router.push('/')
    },
  })
  const { register, handleSubmit } = useForm<RegisterInput>()

  return (
    <Container maxWidth="sm" className={classes.container}>
      <header className={classes.header}>
        <Typography variant="h3" className={classes.title}>
          Registration
        </Typography>
        <Typography paragraph>Give us some info about you.</Typography>
      </header>
      <form
        autoComplete="off"
        onSubmit={handleSubmit((values) => {
          console.log(values)

          registerMutations({ variables: { input: values } })
        })}
      >
        <FormControl fullWidth>
          <TextField name="name" label="Name" inputRef={register} />
        </FormControl>
        <FormControl fullWidth>
          <TextField name="email" label="Email" inputRef={register} />
        </FormControl>
        <FormControl fullWidth>
          <TextField type="password" name="password" label="Password" inputRef={register} />
        </FormControl>
        <FormControl className={classes.submitButton}>
          <Typography>
            <Button type="submit" variant="contained" color="primary">
              Create accout
            </Button>
          </Typography>
        </FormControl>
      </form>
      <Typography className={classes.meta} align="center">
        Already have account?{' '}
        <NextLink as="/login" href="/login">
          <Link className={classes.link}>Login</Link>
        </NextLink>
      </Typography>
    </Container>
  )
}

export default Register
