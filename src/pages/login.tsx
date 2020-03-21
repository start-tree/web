import { useRouter } from "next/router";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { LoginInput, useLoginMutation } from "../apollo/generated";

const Login = () => {
  const router = useRouter();
  const [, setCookie] = useCookies(["token"]);
  const [login] = useLoginMutation({
    onCompleted: data => {
      setCookie("token", data.login.token);
      router.push("/");
    }
  });
  const [form, setForm] = useState<LoginInput>({ email: "", password: "" });

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();

          login({ variables: { input: form } });
        }}
      >
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            name="email"
            onChange={e => {
              setForm({
                ...form,
                [e.currentTarget.name]: e.currentTarget.value
              });
            }}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            onChange={e => {
              setForm({
                ...form,
                [e.currentTarget.name]: e.currentTarget.value
              });
            }}
          />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
