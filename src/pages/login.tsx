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
import { LoginInput, useLoginMutation } from '../app/gql/generated'

const useStyles = makeStyles((theme) => ({
  submitButton: {
    marginTop: theme.spacing(4),
  },
  header: {
    marginTop: theme.spacing(4),
  },
  link: {
    cursor: 'pointer',
  },
  meta: {
    marginTop: theme.spacing(2),
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
    <Container maxWidth="sm">
      <header className={classes.header}>
        <Typography variant="h3">Login</Typography>
        <Typography paragraph>Login to have full access.</Typography>
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
