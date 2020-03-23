import React from 'react'
import { useRouter } from 'next/router'
import { useProjectQuery } from '../../../../app/gql/generated'

const UserProject = () => {
  const router = useRouter()
  const { data } = useProjectQuery({ variables: { id: Number(router.query.id) } })
  if (!data) {
    return null
  }

  return <div>{data.project.title}</div>
}

export default UserProject
