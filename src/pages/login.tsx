import { Button, FormControl, makeStyles, TextField } from '@material-ui/core'
import { useRouter } from 'next/router'
import React from 'react'
import { useCookies } from 'react-cookie'
import { useForm } from 'react-hook-form'
import { LoginInput, useLoginMutation } from '../apollo/generated'

const useStyles = makeStyles((theme) => ({
  submitButton: {
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
    <div>
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
            Register
          </Button>
        </FormControl>
      </form>
    </div>
  )
}

export default Login
