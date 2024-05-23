import { sleep } from '../../services/utils'
import { User } from './../../pages/users/types'
import { usersCollection } from '../../includes/firebase'

let users: User[] = []

async function fetchData(): Promise<void> {
  try {
    const userDoc = await usersCollection.get()
    users = userDoc.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as User[]
  } catch (error) {
    console.error('Error fetching users:', error)
  }
}

fetchData() // Trigger the data fetching when the module is imported

export { users }

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
