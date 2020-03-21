import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { RegisterInput, useRegisterMutation } from "../apollo/generated";
import { TextField, Button, FormControl, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  submitButton: {
    marginTop: theme.spacing(2)
  }
}));

const Register = () => {
  const classes = useStyles();
  const router = useRouter();
  const [, setCookie] = useCookies(["token"]);
  const [registerMutations] = useRegisterMutation({
    onCompleted: data => {
      setCookie("token", data.register.token);
      router.push("/");
    }
  });
  const { register, handleSubmit } = useForm<RegisterInput>();

  return (
    <div>
      <form
        autoComplete="off"
        onSubmit={handleSubmit(values => {
          console.log(values);

          registerMutations({ variables: { input: values } });
        })}
      >
        <FormControl fullWidth>
          <TextField name="name" label="Name" inputRef={register} />
        </FormControl>
        <FormControl fullWidth>
          <TextField name="email" label="Email" inputRef={register} />
        </FormControl>
        <FormControl fullWidth>
          <TextField
            type="password"
            name="password"
            label="Password"
            inputRef={register}
          />
        </FormControl>
        <FormControl className={classes.submitButton}>
          <Button type="submit" variant="contained" color="primary">
            Register
          </Button>
        </FormControl>
      </form>
    </div>
  );
};

export default Register;
