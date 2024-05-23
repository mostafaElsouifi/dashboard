import { sleep } from '../../services/utils'
import { User } from './../../pages/users/types'
import { usersCollection } from '../../includes/firebase'

const userDoc = await usersCollection.get()
const data = userDoc.docs.map((doc) => ({ id: doc.id, ...doc.data() }))

export const users = data as User[]

export type Pagination = {
  page: number
  perPage: number
  total: number
}

export type Sorting = {
  sortBy: keyof User | undefined
  sortingOrder: 'asc' | 'desc' | null
}

export type Filters = {
  isActive: boolean
  search: string
}

export const getUsers = async (filters: Partial<Filters & Pagination & Sorting>) => {
  await sleep(1000)
  const { search } = filters
  let filteredUsers = users

  if (search) {
    filteredUsers = filteredUsers.filter((user) => user.name.toLowerCase().includes(search.toLowerCase()))
  }

  filteredUsers = filteredUsers.map((user) => ({ ...user }))

  const { page = 1, perPage = 10 } = filters || {}
  return {
    data: filteredUsers.slice((page - 1) * perPage, page * perPage),
    pagination: {
      page,
      perPage,
      total: filteredUsers.length,
    },
  }
}
