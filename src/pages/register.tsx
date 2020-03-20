import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";

const registerMutation = gql`
  mutation Register($input: RegisterInput!) {
    register(input: $input) {
      token
      user {
        id
        email
      }
    }
  }
`;

const Register = () => {
  const [regiser, data] = useMutation(registerMutation);
  const [form, setForm] = useState({});

  console.log(data);

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();

          regiser({ variables: { input: form } });
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
