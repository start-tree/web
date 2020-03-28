import {
  Box,
  Button,
  FormControl,
  makeStyles,
  TextField,
  Typography,
  Select,
  MenuItem,
} from '@material-ui/core'
import { useRouter } from 'next/router'
import React from 'react'
import { useFieldArray, useForm, Controller, DeepPartial } from 'react-hook-form'
import { useCategoriesQuery, ProjectInput } from '../../app'
import { omit } from 'lodash'

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
  categoriesIds: string[]
  vacantions?: { id?: string; title: string; description: string }[]
}

type Props = {
  onSubmit: (data: ProjectInput) => Promise<any>
  initialValues?: DeepPartial<ProjectFormData>
  submitLabel?: string
}

export const ProjectForm = ({ onSubmit, initialValues, submitLabel }: Props) => {
  const router = useRouter()

  const { register, control, handleSubmit, getValues } = useForm({ defaultValues: initialValues })
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
          const data = omit(values, ['categoriesIds', 'vacantions'])
          await onSubmit({
            ...data,
            categoriesIds: values.categoriesIds.map((id) => Number(id)),
            vacantions: values.vacantions?.map((vacantion) => ({
              ...vacantion,
              id: vacantion.id ? Number(vacantion.id) : undefined,
            })),
          })
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
              defaultValue={getValues().categoriesIds ?? []}
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
