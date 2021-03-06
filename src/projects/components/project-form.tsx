import {
  Box,
  Button,
  FormControl,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@material-ui/core'
import { useRouter } from 'next/router'
import React from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { useCategoriesQuery } from '../../app'

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

export class ProjectFormData {
  title: string
  description: string
  categoriesIds: number[]
  vacantions?: { id?: number; title: string; description: string }[]
}

const projectSchema = yup.object().shape<ProjectFormData>({
  title: yup.string().required(),
  description: yup.string().required(),
  categoriesIds: yup.array().of(yup.number().required()).required(),
  vacantions: yup
    .array()
    .of(
      yup.object().shape({
        id: yup.number(),
        title: yup.string().required(),
        description: yup.string().required(),
      })
    )
    .default([]),
})

type Props = {
  onSubmit: (data: ProjectFormData) => Promise<any>
  initialValues?: ProjectFormData
  submitLabel?: string
}

export const ProjectForm = ({ onSubmit, initialValues, submitLabel }: Props) => {
  const router = useRouter()

  const { register, control, handleSubmit, getValues } = useForm<ProjectFormData>({
    defaultValues: initialValues,
    validationSchema: projectSchema,
  })
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'vacantions',
    keyName: '_id',
  })

  const { data: categoriesData } = useCategoriesQuery()

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
          <FormControl fullWidth className={classes.formControl}>
            <Controller
              name="categoriesIds"
              control={control}
              defaultValue={
                getValues().categoriesIds
                  ? getValues().categoriesIds.map((id) => id.toString())
                  : []
              }
              as={
                <Select
                  label="Categories"
                  placeholder="Pick categories"
                  variant="outlined"
                  multiple
                >
                  {categoriesData?.categories &&
                    categoriesData.categories.map((c) => (
                      <MenuItem key={c.id} value={c.id}>
                        {c.name}
                      </MenuItem>
                    ))}
                </Select>
              }
            />
          </FormControl>
        </Box>
        <Box>
          {fields.length > 0 && (
            <Typography className={classes.subDataTitle}>Vacantions</Typography>
          )}
          {fields.map((item, i) => (
            <Box key={item._id} className={classes.vacantions}>
              {item.id && (
                <TextField
                  type="number"
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
