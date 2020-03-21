import { useRouter } from "next/router";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { RegisterInput, useRegisterMutation } from "../apollo/generated";

const Register = () => {
  const router = useRouter();
  const [, setCookie] = useCookies(["token"]);
  const [register] = useRegisterMutation({
    onCompleted: data => {
      setCookie("token", data.register.token);
      router.push("/");
    }
  });
  const [form, setForm] = useState<RegisterInput>({
    name: "",
    email: "",
    password: ""
  });

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          register({ variables: { input: form } });
        }}
      >
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            onChange={e => {
              setForm({
                ...form,
                [e.currentTarget.name]: e.currentTarget.value
              });
            }}
          />
        </div>
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
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
