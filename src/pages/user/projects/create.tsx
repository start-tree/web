import { Box, Button, FormControl, TextField, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { CreateProjectInput, useCreateProjectMutation } from '../../../app/gql/generated'
import UserLayout from '../../../user/layouts/user-layout'

const Create = () => {
  const { register, control, handleSubmit } = useForm<CreateProjectInput>()
  const { fields, append, prepend, remove } = useFieldArray({
    control,
    name: 'vacantions',
  })
  const [createProjectMutation] = useCreateProjectMutation()

  return (
    <UserLayout>
      <Typography variant="h6">Projects</Typography>
      <Box>
        <Typography>Create Project</Typography>
        <form
          onSubmit={handleSubmit(async (values) => {
            const data = await createProjectMutation({ variables: { input: values } })
            console.log(data)
          })}
        >
          <FormControl fullWidth>
            <TextField name="title" label="Title" inputRef={register} />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              name="description"
              label="Description"
              rowsMax={7}
              multiline
              inputRef={register}
            />
          </FormControl>
          {fields.map((item, i) => (
            <div key={item.id}>
              <FormControl fullWidth>
                <TextField name={`vacantions[${i}].title`} label="Title" inputRef={register} />
              </FormControl>
              <FormControl fullWidth>
                <TextField
                  name={`vacantions[${i}].description`}
                  label="Description"
                  rowsMax={7}
                  multiline
                  inputRef={register}
                />
              </FormControl>
              <span onClick={() => remove(i)}>remove</span>
            </div>
          ))}
          <Typography>
            <Button variant="contained" color="primary" onClick={() => append({})}>
              Add varantion
            </Button>
          </Typography>
          <FormControl>
            <Typography>
              <Button type="submit" variant="contained" color="primary">
                Create
              </Button>
            </Typography>
          </FormControl>
        </form>
      </Box>
    </UserLayout>
  )
}

export default Create
