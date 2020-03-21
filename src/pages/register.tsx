import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { useRegisterMutation, RegisterInput } from "../apollo/generated";

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
  const [register] = useRegisterMutation({
    onCompleted: data => {
      console.log(data);
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
