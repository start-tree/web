import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";

const loginMutation = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      token
      user {
        id
        email
      }
    }
  }
`;

const Login = () => {
  const [login, data] = useMutation(loginMutation);
  const [form, setForm] = useState({});

  console.log(data);

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
