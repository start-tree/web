import { Box, Button, FormControl, makeStyles, TextField, Typography } from '@material-ui/core'
import { useRouter } from 'next/router'
import React from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { ProjectQuery } from '../../app'

const useStyles = makeStyles((theme) => ({
  title: {
    marginBottom: theme.spacing(4),
  },
  formControl: {
    marginBottom: theme.spacing(4),
  },
  subDataTitle: {
    marginBottom: theme.spacing(1),
  },
  vacantions: {
    marginBottom: theme.spacing(3),
  },
  removeButton: {
    marginTop: theme.spacing(-2),
  },
  submitButton: {
    marginTop: theme.spacing(4),
  },
}))

type Props = {
  onSubmit: (data: object) => Promise<any>
  initialValues?: ProjectQuery['project']
  submitLabel?: string
}

export const ProjectForm = ({ onSubmit, initialValues, submitLabel }: Props) => {
  const router = useRouter()
  const { register, control, handleSubmit } = useForm({ defaultValues: initialValues })
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'vacantions',
    keyName: '_id',
  })

  const classes = useStyles()

  return (
    <Box>
      <Typography variant="h5" className={classes.title}>
        Project Form
      </Typography>
      <form
        onSubmit={handleSubmit(async (values) => {
          await onSubmit(values)
          router.push('/user/projects')
        })}
      >
        {initialValues?.id && (
          <TextField name="id" inputRef={register} style={{ display: 'none' }} />
        )}
        <FormControl fullWidth className={classes.formControl}>
          <TextField name="title" label="Title" variant="outlined" inputRef={register} />
        </FormControl>
        <FormControl fullWidth className={classes.formControl}>
          <TextField
            name="description"
            label="Description"
            rowsMax={7}
            multiline
            variant="outlined"
            inputRef={register}
          />
        </FormControl>
        <Box>
          {fields.length > 0 && (
            <Typography className={classes.subDataTitle}>Vacantions</Typography>
          )}
          {fields.map((item, i) => (
            <Box key={item._id} className={classes.vacantions}>
              {item.id && (
                <TextField
                  name={`vacantions[${i}].id`}
                  inputRef={register}
                  style={{ display: 'none' }}
                />
              )}
              <FormControl fullWidth className={classes.formControl}>
                <TextField
                  name={`vacantions[${i}].title`}
                  label="Title"
                  variant="outlined"
                  inputRef={register}
                />
              </FormControl>
              <FormControl fullWidth className={classes.formControl}>
                <TextField
                  name={`vacantions[${i}].description`}
                  label="Description"
                  rowsMax={7}
                  variant="outlined"
                  multiline
                  inputRef={register}
                />
              </FormControl>
              <FormControl fullWidth className={classes.removeButton}>
                <Typography align="right">
                  <Button onClick={() => remove(i)}>Remove</Button>
                </Typography>
              </FormControl>
            </Box>
          ))}
        </Box>
        <Typography>
          <Button variant="contained" color="primary" onClick={() => append({})}>
            Add varantion
          </Button>
        </Typography>
        <FormControl className={classes.submitButton}>
          <Typography>
            <Button type="submit" variant="contained" color="primary">
              {submitLabel ?? 'Create'}
            </Button>
          </Typography>
        </FormControl>
      </form>
    </Box>
  )
}
