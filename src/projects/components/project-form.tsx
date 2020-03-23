import { Box, Button, FormControl, TextField, Typography } from '@material-ui/core'
import React from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { Project, Vacantion } from '../../app/gql/generated'

type Props = {
  onSubmit: (data: object) => Promise<any>
  initialValues?: Omit<Project, '__typename'> & { vacantions: Omit<Vacantion, '__typename'>[] }
}

export const ProjectForm = ({ onSubmit, initialValues }: Props) => {
  const { register, control, handleSubmit } = useForm({ defaultValues: initialValues })
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'vacantions',
    keyName: '_id',
  })

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField name="id" inputRef={register} style={{ display: 'none' }} />
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
          <div key={item._id}>
            <TextField
              name={`vacantions[${i}].id`}
              inputRef={register}
              style={{ display: 'none' }}
            />
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
  )
}
