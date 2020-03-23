import { useRouter } from 'next/router'
import React from 'react'
import { useProjectQuery } from '../../../../app'
import { UserProjectsLayout } from '../../../../users'

const UserProject = () => {
  const router = useRouter()
  const { data } = useProjectQuery({ variables: { id: Number(router.query.id) } })

  if (!data) {
    return null
  }

  return <UserProjectsLayout>{data.project.title}</UserProjectsLayout>
}

export default UserProject
