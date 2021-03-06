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
import { LoginInput, useLoginMutation } from '../app'

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

const Login = () => {
  const classes = useStyles()
  const router = useRouter()
  const [, setCookie] = useCookies(['token'])
  const [loginMutations] = useLoginMutation({
    onCompleted: (data) => {
      setCookie('token', data.login.token)
      router.push('/')
    },
  })
  const { register, handleSubmit } = useForm<LoginInput>()

  return (
    <Container maxWidth="sm" className={classes.container}>
      <header className={classes.header}>
        <Typography variant="h3" className={classes.title}>
          Login
        </Typography>
        <Typography>Login to have full access.</Typography>
      </header>
      <form
        autoComplete="off"
        onSubmit={handleSubmit((values) => {
          loginMutations({ variables: { input: values } })
        })}
      >
        <FormControl fullWidth>
          <TextField name="email" label="Email" inputRef={register} />
        </FormControl>
        <FormControl fullWidth>
          <TextField type="password" name="password" label="Password" inputRef={register} />
        </FormControl>
        <FormControl className={classes.submitButton}>
          <Button type="submit" variant="contained" color="primary">
            Login
          </Button>
        </FormControl>
      </form>
      <Typography className={classes.meta} align="center">
        Dont have account?{' '}
        <NextLink as="/register" href="/register">
          <Link className={classes.link}>Register</Link>
        </NextLink>
      </Typography>
    </Container>
  )
}

export default Login
